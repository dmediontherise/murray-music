// MURRAY'S THEORY v9.5 (Polyphony Fix)

const MAX_POLYPHONY = 8;

const State = {
    active: new Set(),
    targetNotes: [],
    targetMidis: new Set(),
    mode: "FREE",
    topic: null,
    idx: 0,
    audioCtx: null,
    oscs: new Map(),
    isChord: true,
    targetSeq: [],
    seqProgress: 0,
    targetChain: null,
    chainIdx: 0,
    // Track physical keys separately to prevent ghosting logic errors
    heldKeys: new Set(),
    isLatched: false,
    pointerNotes: new Set(),
    keyboardNotes: new Set()
};

// --- AUDIO ENGINE ---
function initAudio() {
    if (!State.audioCtx) {
        State.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        
        // Dynamics Compressor for Polyphony
        State.compressor = State.audioCtx.createDynamicsCompressor();
        State.compressor.threshold.value = -20;
        State.compressor.knee.value = 30;
        State.compressor.ratio.value = 12;
        State.compressor.attack.value = 0.003;
        State.compressor.release.value = 0.25;
        State.compressor.connect(State.audioCtx.destination);

        State.audioCtx.resume();
    }
}

function playNote(m) {
    initAudio();
    if (State.oscs.has(m)) return;
    
    const osc = State.audioCtx.createOscillator();
    const gain = State.audioCtx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.value = window.Theory.getFreq(m);
    
    const t = State.audioCtx.currentTime;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.3, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.1, t + 0.5);
    
    osc.connect(gain);
    gain.connect(State.compressor); // Connect to compressor
    osc.start();
    
    State.oscs.set(m, {osc, gain});
}

function stopNote(m) {
    if (!State.oscs.has(m)) return;
    const {osc, gain} = State.oscs.get(m);
    const t = State.audioCtx.currentTime;
    
    gain.gain.cancelScheduledValues(t);
    gain.gain.linearRampToValueAtTime(0, t + 0.05);
    osc.stop(t + 0.05);
    setTimeout(() => { osc.disconnect(); gain.disconnect(); }, 100);
    State.oscs.delete(m);
}

// --- LOGIC ---
function triggerCapTell() {
    const bar = document.getElementById('analysis-bar');
    if (bar) {
        bar.classList.add('capped');
        setTimeout(() => {
            bar.classList.remove('capped');
        }, 500);
    }
}

function noteOn(m) {
    // Only trigger if note isn't already active (Logic gate)
    if (State.active.has(m)) return;
    if (State.active.size >= MAX_POLYPHONY) {
        triggerCapTell();
        return;
    }
    
    State.active.add(m);
    playNote(m);
    updateUI();
    checkDrill(m);
}

function noteOff(m) {
    // Only trigger if note IS active
    if (!State.active.has(m)) return;
    
    State.active.delete(m);
    State.pointerNotes.delete(m);
    State.keyboardNotes.delete(m);
    stopNote(m);
    updateUI();
}

function updateUI() {
    requestAnimationFrame(() => {
        // Keys
        document.querySelectorAll('.key').forEach(k => {
            const m = parseInt(k.dataset.midi);
            if (State.active.has(m)) k.classList.add('active');
            else k.classList.remove('active');
        });

        // Analysis
        const activeMidis = Array.from(State.active).sort((a,b)=>a-b);
        const names = activeMidis.map(m => window.Theory.getNoteName(m));
        
        const bar = document.getElementById('analysis-bar');
        if (names.length > 0) {
            const analysis = window.Theory.analyze(names);
            bar.classList.add('visible');
            if (analysis.label) {
                bar.innerHTML = `<span style="color:#fff; font-weight:bold;">${analysis.label}</span> <span style="opacity:0.6; font-size:0.8em">(${analysis.intervals.join(' ')})</span>`;
            } else {
                bar.innerText = analysis.root === '-' ? names.join(' ') : `${analysis.root} Root • ${analysis.intervals.join(' ')}`;
            }
        } else {
            bar.classList.remove('visible');
        }

        if (State.mode === "FREE") {
            document.getElementById('staff-display').innerHTML = window.Renderer.render(names);
        }
    });
}

function checkDrill(lastMidi) {
    if (State.mode === "FREE") return;
    
    if (State.isChord) {
        // Strict Set Equality
        const match = State.targetMidis.size === State.active.size && 
                      [...State.targetMidis].every(x => State.active.has(x));
        
        if (match) {
            if (State.targetChain) {
                State.chainIdx++;
                // Update Dots
                const dots = document.querySelectorAll('.seq-dot');
                if(dots[State.chainIdx-1]) dots[State.chainIdx-1].classList.add('done');
                
                if (State.chainIdx >= State.targetChain.length) {
                    completeDrill();
                } else {
                    // Load next chord
                    const nextNotes = State.targetChain[State.chainIdx];
                    State.targetMidis = new Set(nextNotes.map(n => window.Theory.getMidi(n)));
                    document.getElementById('staff-display').innerHTML = window.Renderer.render(nextNotes);
                }
            } else {
                completeDrill();
            }
        }
    } else {
        // Sequence Logic
        if (lastMidi === State.targetSeq[State.seqProgress]) {
            State.seqProgress++;
            const dots = document.querySelectorAll('.seq-dot');
            if(dots[State.seqProgress-1]) dots[State.seqProgress-1].classList.add('done');
            
            if (State.seqProgress >= State.targetSeq.length) completeDrill();
        }
    }
}

function completeDrill() {
    const card = document.getElementById('drill-card');
    card.classList.add('success');
    document.getElementById('next-btn').style.display = 'inline-block';
    document.getElementById('hint-btn').style.display = 'none';
    document.querySelectorAll('.hint').forEach(k => k.classList.remove('hint'));
}

// --- MENU & CONTROLLER ---
function initController() {
    document.getElementById('sidebar').addEventListener('click', (e) => {
        const item = e.target.closest('.menu-item');
        if (!item) return;
        
        const topic = item.dataset.topic;
        const mode = item.dataset.mode;
        
        document.querySelectorAll('.menu-item').forEach(el => el.classList.remove('active'));
        item.classList.add('active');
        
        if (mode === 'FREE') setMode('FREE');
        else if (topic) setTopic(topic);
        
        if (window.innerWidth <= 768) toggleMenu(false);
    });

    const bg = document.getElementById('bg-list');
    const ad = document.getElementById('adv-list');
    
    if (window.Curriculum) {
        window.Curriculum.BEGINNER.forEach(t => {
            const div = document.createElement('div');
            div.className = 'menu-item';
            div.innerText = t;
            div.dataset.topic = t;
            bg.appendChild(div);
        });
        window.Curriculum.ADVANCED.forEach(t => {
            const div = document.createElement('div');
            div.className = 'menu-item';
            div.innerText = t;
            div.dataset.topic = t;
            ad.appendChild(div);
        });
    }

    // Scroll Buttons
    const pWrap = document.getElementById('piano-wrap');
    document.getElementById('scroll-left').addEventListener('click', () => {
        pWrap.scrollBy({ left: -200, behavior: 'smooth' });
    });
    document.getElementById('scroll-right').addEventListener('click', () => {
        pWrap.scrollBy({ left: 200, behavior: 'smooth' });
    });
}

function setMode(mode) {
    State.mode = mode;
    resetUI();
    document.getElementById('drill-title').innerText = "Free Play";
    document.getElementById('drill-desc').innerText = "Explore harmony freely.";
    document.getElementById('context-box').style.display = 'none';
    document.getElementById('sequence-tracker').innerHTML = '';
}

function setTopic(topic) {
    State.mode = "DRILL";
    State.topic = topic;
    State.idx = 0;
    resetUI();
    document.querySelectorAll('.menu-item').forEach(el => {
        el.classList.toggle('active', el.innerText === topic);
    });
    showTopicIntro(topic);
}

function showTopicIntro(topic) {
    resetUI();
    const desc = (window.Curriculum.DESCRIPTIONS && window.Curriculum.DESCRIPTIONS[topic]) 
                 ? window.Curriculum.DESCRIPTIONS[topic] 
                 : (window.Curriculum.DESCRIPTIONS ? window.Curriculum.DESCRIPTIONS['default'] : "Ready to start?");
    
    document.getElementById('drill-title').innerText = topic;
    
    const descEl = document.getElementById('drill-desc');
    descEl.innerHTML = desc;
    descEl.style.color = '#333'; // Make text darker for readability
    descEl.style.fontSize = '1rem';
    descEl.style.textAlign = 'left';
    descEl.style.lineHeight = '1.6';
    
    document.getElementById('staff-display').innerHTML = '';
    document.getElementById('context-box').style.display = 'none';
    document.getElementById('sequence-tracker').innerHTML = '';

    // Handle Start Button
    let startBtn = document.getElementById('start-topic-btn');
    const btnContainer = document.getElementById('next-btn').parentElement;
    
    if(!startBtn) {
        startBtn = document.createElement('button');
        startBtn.id = 'start-topic-btn';
        startBtn.className = 'btn btn-pri';
        startBtn.style.display = 'none';
        btnContainer.appendChild(startBtn);
    }
    
    startBtn.innerText = "Start Exercises";
    startBtn.style.display = 'inline-block';
    startBtn.onclick = () => {
        startBtn.style.display = 'none';
        loadChallenge();
    };
}

window.nextDrill = () => {
    State.idx++;
    loadChallenge();
};

function loadChallenge() {
    resetUI();
    
    // Reset Description Styles
    const descEl = document.getElementById('drill-desc');
    descEl.style.color = ''; 
    descEl.style.fontSize = '';
    descEl.style.textAlign = '';
    descEl.style.lineHeight = '';

    const challenges = window.Curriculum.CHALLENGES[State.topic];
    
    if (!challenges || State.idx >= challenges.length) {
        document.getElementById('drill-title').innerText = "Section Complete!";
        document.getElementById('drill-desc').innerText = "Great job! Ready for the next topic?";
        document.getElementById('staff-display').innerHTML = '<div style="font-size:3rem; margin:20px;">🎉</div>';
        document.getElementById('context-box').style.display = 'none';
        document.getElementById('sequence-tracker').innerHTML = '';
        
        const allTopics = [...window.Curriculum.BEGINNER, ...window.Curriculum.ADVANCED];
        const currentIdx = allTopics.indexOf(State.topic);
        const nextTopic = allTopics[currentIdx + 1];
        
        const nextBtn = document.getElementById('next-btn');
        if (nextTopic) {
            nextBtn.innerText = "Start " + nextTopic;
            nextBtn.onclick = () => setTopic(nextTopic);
            nextBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'none';
            document.getElementById('drill-desc').innerText = "You have completed the entire course!";
        }
        return;
    }

    const nextBtn = document.getElementById('next-btn');
    nextBtn.innerText = "Next Challenge →";
    nextBtn.onclick = window.nextDrill;

    const data = challenges[State.idx];
    document.getElementById('drill-title').innerText = data.instruction;
    document.getElementById('drill-desc').innerText = "Match the notes on the staff.";
    
    const notes = Array.isArray(data.notes) ? data.notes : [data.notes];
    const midis = notes.map(n => window.Theory.getMidi(n));
    
    State.targetNotes = notes;
    State.targetMidis = new Set(midis);
    
    State.targetChain = null;
    State.chainIdx = 0;

    if (data.type === 'chord-sequence') {
        State.targetChain = data.sequence;
        State.isChord = true;
        
        // Setup First Chord
        const firstNotes = data.sequence[0];
        const chainMidis = firstNotes.map(n => window.Theory.getMidi(n));
        State.targetMidis = new Set(chainMidis);
        
        // Setup Dots
        const track = document.getElementById('sequence-tracker');
        track.innerHTML = data.sequence.map(() => '<div class="seq-dot"></div>').join('');
        
        document.getElementById('staff-display').innerHTML = window.Renderer.render(firstNotes, true);
    } else {
        // Treat Intervals as Sequences for Layout & Input (Melodic)
        const isSeq = (data.type === 'sequence' || data.type === 'interval');
        State.isChord = !isSeq;
        
        if (!State.isChord) {
            toggleLatch(false);
            State.targetSeq = midis;
            State.seqProgress = 0;
            const track = document.getElementById('sequence-tracker');
            track.innerHTML = midis.map(() => '<div class="seq-dot"></div>').join('');
            // Render as Sequence (false)
            document.getElementById('staff-display').innerHTML = window.Renderer.render(notes, false);
        } else {
            document.getElementById('sequence-tracker').innerHTML = '';
            // Render as Chord (true)
            document.getElementById('staff-display').innerHTML = window.Renderer.render(notes, true);
        }
    }
    
    if (data.context) {
        document.getElementById('context-box').style.display = 'flex';
        document.getElementById('context-text').innerText = data.context;
    }
    
    document.getElementById('hint-btn').style.display = 'inline-block';
}

function resetUI() {
    const card = document.getElementById('drill-card');
    card.className = 'card';
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('hint-btn').style.display = 'none';
    document.querySelectorAll('.hint').forEach(k => k.classList.remove('hint'));
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('visible');
    // Clear Active notes if stuck? No, user might be holding them.
}

window.showHint = () => {
    State.targetMidis.forEach(m => {
        const el = document.querySelector(`.key[data-midi="${m}"]`);
        if (el) el.classList.add('hint');
    });
};

function toggleMenu(forceState) {
    const sb = document.getElementById('sidebar');
    const ov = document.getElementById('overlay');
    const isOpen = sb.classList.contains('open');
    const newState = forceState !== undefined ? forceState : !isOpen;
    
    if (newState) {
        sb.classList.add('open');
        ov.classList.add('visible');
    } else {
        sb.classList.remove('open');
        ov.classList.remove('visible');
    }
}
window.toggleMenu = toggleMenu; 

// --- INIT ---
const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const keyMap = {'z':48,'s':49,'x':50,'d':51,'c':52,'v':53,'g':54,'b':55,'h':56,'n':57,'j':58,'m':59,',':60,'q':60,'2':61,'w':62,'3':63,'e':64,'r':65,'5':66,'t':67,'6':68,'y':69,'7':70,'u':71,'i':72,'9':73,'o':74,'p':76};

// Pitch class offset table (fraction of white key width from the crack between white keys).
// Standard acoustic piano geometry: C# & F# lean slightly left, D# & A# lean slightly right, G# is centered.
const BLACK_KEY_OFFSETS = {
    1: -0.07,  // C#
    3:  0.07,  // D#
    6: -0.08,  // F#
    8:  0.00,  // G#
    10: 0.08   // A#
};

// Number of white keys in an octave before the crack for each black key pitch class
const WHITE_KEYS_BEFORE_CRACK = {
    1: 1,  // C# sits after C (1st white key in octave)
    3: 2,  // D# sits after D (2nd white key in octave)
    6: 4,  // F# sits after F (4th white key in octave)
    8: 5,  // G# sits after G (5th white key in octave)
    10: 6  // A# sits after A (6th white key in octave)
};

function buildPiano() {
    const container = document.getElementById('piano-keys');
    if (!container) return;
    container.innerHTML = '';
    
    const viewportWidth = window.innerWidth;
    const isMobile = viewportWidth <= 768;
    const isLandscape = window.matchMedia("(orientation: landscape)").matches && viewportWidth <= 900;
    
    let wWidth = 48; // Desktop default (at 1280px width, fits all octaves or > 2 octaves)
    if (isMobile) {
        wWidth = 32; // Mobile (390px): white key 32px (>= 28px target), black key 19px (>= 18px target)
    } else if (isLandscape || viewportWidth <= 1024) {
        wWidth = 38; // Tablet / small landscape
    }
    
    const bWidth = Math.round(wWidth * 0.6);
    const sidePadding = 20;
    
    // First pass: Build white keys
    let whiteIndex = 0;
    for (let m = 48; m <= 83; m++) {
        const pc = m % 12;
        const isBlack = [1, 3, 6, 8, 10].includes(pc);
        if (!isBlack) {
            const k = document.createElement('div');
            k.className = 'key white-key';
            k.dataset.midi = m;
            k.innerHTML = `<div class="label-n">${noteNames[pc]}</div>`;
            const char = Object.keys(keyMap).find(x => keyMap[x] === m);
            if (char) k.innerHTML += `<div class="label-k">${char.toUpperCase()}</div>`;
            
            const leftPx = sidePadding + whiteIndex * wWidth;
            k.style.left = leftPx + 'px';
            k.style.width = wWidth + 'px';
            
            bindKeyEvents(k, m);
            container.appendChild(k);
            whiteIndex++;
        }
    }
    
    // Second pass: Build black keys based on declared geometry
    for (let m = 48; m <= 83; m++) {
        const pc = m % 12;
        const isBlack = [1, 3, 6, 8, 10].includes(pc);
        if (isBlack) {
            const k = document.createElement('div');
            k.className = 'key black-key';
            k.dataset.midi = m;
            
            const octave = Math.floor((m - 48) / 12);
            const whiteKeysBefore = octave * 7 + WHITE_KEYS_BEFORE_CRACK[pc];
            const crackX = sidePadding + whiteKeysBefore * wWidth;
            
            const offsetRatio = BLACK_KEY_OFFSETS[pc] || 0;
            const blackCenter = crackX + offsetRatio * wWidth;
            const leftPx = Math.round(blackCenter - bWidth / 2);
            
            k.style.left = leftPx + 'px';
            k.style.width = bWidth + 'px';
            
            bindKeyEvents(k, m);
            container.appendChild(k);
        }
    }
    
    const totalWidth = sidePadding * 2 + whiteIndex * wWidth;
    container.style.width = totalWidth + 'px';
}

function toggleLatch(forceState) {
    const nextState = forceState !== undefined ? forceState : !State.isLatched;
    if (State.isLatched && !nextState) {
        clearAllNotes();
    }
    State.isLatched = nextState;
    const btn = document.getElementById('latch-btn');
    if (btn) {
        btn.classList.toggle('active', State.isLatched);
    }
}
window.toggleLatch = toggleLatch;

function clearAllNotes() {
    const activeMidis = Array.from(State.active);
    activeMidis.forEach(m => {
        stopNote(m);
    });
    State.active.clear();
    State.heldKeys.clear();
    State.pointerNotes.clear();
    State.keyboardNotes.clear();
    updateUI();
}
window.clearAllNotes = clearAllNotes;

function bindKeyEvents(el, m) {
    const handlePress = (e) => {
        e.preventDefault();
        if (State.isLatched) {
            if (State.active.has(m)) {
                noteOff(m);
            } else {
                State.pointerNotes.add(m);
                noteOn(m);
            }
        } else {
            State.pointerNotes.add(m);
            noteOn(m);
        }
    };

    const handleRelease = (e) => {
        e.preventDefault();
        if (!State.isLatched) {
            noteOff(m);
        }
    };

    // Mouse
    el.addEventListener('mousedown', handlePress); 
    el.addEventListener('mouseup', handleRelease); 
    el.addEventListener('mouseleave', handleRelease);
    
    // Touch - Passive false critical for preventing scrolling
    el.addEventListener('touchstart', handlePress, {passive:false}); 
    el.addEventListener('touchend', handleRelease, {passive:false});
    el.addEventListener('touchcancel', handleRelease, {passive:false});
}

window.addEventListener('load', () => {
    initController();
    buildPiano();
    
    // Keyboard with Ghosting Protection
    document.addEventListener('keydown', e => {
        if(e.repeat) return;
        const k = e.key.toLowerCase();
        if(keyMap[k] && !State.heldKeys.has(k)) {
            State.heldKeys.add(k);
            const m = keyMap[k];
            if (!State.active.has(m)) {
                State.keyboardNotes.add(m);
                noteOn(m);
            }
        }
    });
    
    document.addEventListener('keyup', e => {
        const k = e.key.toLowerCase();
        if(State.heldKeys.has(k)) {
            State.heldKeys.delete(k);
            const m = keyMap[k];
            if (State.keyboardNotes.has(m)) {
                State.keyboardNotes.delete(m);
                noteOff(m);
            }
        }
    });

    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess().then(m => {
            document.getElementById('midi-badge').innerText = "MIDI Ready";
            document.getElementById('midi-badge').classList.add('connected');
            for (let i of m.inputs.values()) i.onmidimessage=msg=>{ const [c,n,v]=msg.data; if(c===144&&v>0)noteOn(n); if(c===128||(c===144&&v===0))noteOff(n); };
        });
    }
});
window.addEventListener('resize', buildPiano);
