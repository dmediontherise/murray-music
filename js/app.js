// MURRAY'S THEORY v9.0 (Pure JS)

const State = {
    active: new Set(),
    targetNotes: [],
    targetMidis: new Set(),
    mode: "FREE",
    topic: null,
    idx: 0,
    audioCtx: null,
    oscs: new Map(),
    isChord: true
};

// --- AUDIO ---
function initAudio() {
    if (!State.audioCtx) {
        State.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
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
    gain.connect(State.audioCtx.destination);
    osc.start();
    
    State.oscs.set(m, {osc, gain});
}

function stopNote(m) {
    if (!State.oscs.has(m)) return;
    const {osc, gain} = State.oscs.get(m);
    const t = State.audioCtx.currentTime;
    
    gain.gain.cancelScheduledValues(t);
    gain.gain.linearRampToValueAtTime(0, t + 0.1);
    osc.stop(t + 0.1);
    
    setTimeout(() => { osc.disconnect(); gain.disconnect(); }, 150);
    State.oscs.delete(m);
}

// --- LOGIC ---
function noteOn(m) {
    if (State.active.has(m)) return;
    State.active.add(m);
    playNote(m);
    updateUI();
    checkDrill(m);
}

function noteOff(m) {
    State.active.delete(m);
    stopNote(m);
    updateUI();
}

function updateUI() {
    // Piano Keys
    document.querySelectorAll('.key').forEach(k => {
        const m = parseInt(k.dataset.midi);
        if (State.active.has(m)) k.classList.add('active');
        else k.classList.remove('active');
    });

    // Analysis
    const activeMidis = Array.from(State.active).sort((a,b)=>a-b);
    const names = activeMidis.map(m => window.Theory.getNoteName(m));
    const analysis = window.Theory.analyze(names);
    
    const bar = document.getElementById('analysis-bar');
    if (names.length > 0) {
        bar.classList.add('visible');
        bar.innerText = analysis.root === '-' ? names.join(' ') : `${analysis.root} Root • ${analysis.intervals.join(' ')}`;
    } else {
        bar.classList.remove('visible');
    }

    // Free Play Sheet Music
    if (State.mode === "FREE") {
        document.getElementById('staff-display').innerHTML = window.Renderer.render(names);
    }
}

function checkDrill(lastMidi) {
    if (State.mode === "FREE") return;
    
    const card = document.getElementById('drill-card');
    
    // Check match
    const targetSet = State.targetMidis;
    const activeSet = State.active;
    
    // Strict Set Equality for Chords
    const match = targetSet.size === activeSet.size && 
                  [...targetSet].every(x => activeSet.has(x));
    
    if (match) {
        card.classList.add('success');
        document.getElementById('next-btn').style.display = 'inline-block';
        document.getElementById('hint-btn').style.display = 'none';
        document.querySelectorAll('.hint').forEach(k => k.classList.remove('hint'));
    }
}

// --- CONTROLLER ---
window.setMode = (mode) => {
    State.mode = mode;
    resetUI();
    document.getElementById('drill-title').innerText = "Free Play";
    document.getElementById('drill-desc').innerText = "Explore harmony.";
    document.getElementById('context-box').style.display = 'none';
};

window.setTopic = (topic) => {
    State.mode = "DRILL";
    State.topic = topic;
    State.idx = 0;
    resetUI();
    // Nav highlight
    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.toggle('active', el.innerText === topic);
    });
    loadChallenge();
};

window.nextDrill = () => {
    State.idx++;
    loadChallenge();
};

function loadChallenge() {
    resetUI();
    const challenges = window.Curriculum.CHALLENGES[State.topic];
    
    if (!challenges || State.idx >= challenges.length) {
        document.getElementById('drill-title').innerText = "Complete!";
        document.getElementById('drill-desc').innerText = "Select a new topic.";
        return;
    }

    const data = challenges[State.idx];
    document.getElementById('drill-title').innerText = data.instruction;
    document.getElementById('drill-desc').innerText = "Match the notes.";
    
    // Render Staff
    // data.notes might be "C4" or ["C4","E4"]
    const notes = Array.isArray(data.notes) ? data.notes : [data.notes]; // handle single note legacy
    // Wait, curriculum uses 'notes' array for sequences/triads.
    // Ensure all challenges use 'notes' array.
    
    // Convert to target MIDIs
    const midis = notes.map(n => window.Theory.getMidi(n));
    State.targetNotes = notes;
    State.targetMidis = new Set(midis);
    
    document.getElementById('staff-display').innerHTML = window.Renderer.render(notes);
    
    // Context
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
}

window.showHint = () => {
    State.targetMidis.forEach(m => {
        const el = document.querySelector(`.key[data-midi="${m}"]`);
        if (el) el.classList.add('hint');
    });
};

window.toggleMenu = () => {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('visible');
};

// --- INIT ---
function init() {
    buildPiano();
    
    // MIDI
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess().then(m => {
            document.getElementById('midi-badge').innerText = "MIDI Ready";
            document.getElementById('midi-badge').classList.add('connected');
            for (let input of m.inputs.values()) {
                input.onmidimessage = (msg) => {
                    const [c, n, v] = msg.data;
                    if (c===144 && v>0) noteOn(n);
                    if (c===128 || (c===144 && v===0)) noteOff(n);
                };
            }
        });
    }
    
    // Keyboard
    const keyMap = {'z':48,'s':49,'x':50,'d':51,'c':52,'v':53,'g':54,'b':55,'h':56,'n':57,'j':58,'m':59,',':60,'q':60,'2':61,'w':62,'3':63,'e':64,'r':65,'5':66,'t':67,'6':68,'y':69,'7':70,'u':71,'i':72,'9':73,'o':74,'p':76};
    document.addEventListener('keydown', e => {
        if(!e.repeat && keyMap[e.key.toLowerCase()]) noteOn(keyMap[e.key.toLowerCase()]);
    });
    document.addEventListener('keyup', e => {
        if(keyMap[e.key.toLowerCase()]) noteOff(keyMap[e.key.toLowerCase()]);
    });

    // Populate Menu
    const bg = document.getElementById('bg-list');
    const ad = document.getElementById('adv-list');
    window.Curriculum.BEGINNER.forEach(t => bg.innerHTML += `<div class="nav-item" onclick="setTopic('${t}')">${t}</div>`);
    window.Curriculum.ADVANCED.forEach(t => ad.innerHTML += `<div class="nav-item" onclick="setTopic('${t}')">${t}</div>`);
}

// --- PIANO ---
function buildPiano() {
    const container = document.getElementById('piano-keys');
    const wWidth = window.innerWidth <= 768 ? 44 : 50; 
    let wIdx = 0;
    
    // Range 48-83
    for(let m=48; m<=83; m++) {
        const isBlack = [1,3,6,8,10].includes(m%12);
        const k = document.createElement('div');
        k.dataset.midi = m;
        
        if (isBlack) {
            k.className = 'key black-key';
            const left = (wIdx * wWidth) - (wWidth * 0.6); // Center on gap
            k.style.left = left + 'px';
            container.appendChild(k);
        } else {
            k.className = 'key white-key';
            k.innerHTML = `<div class="label-n">${window.Theory.getNoteName(m).slice(0,-1)}</div>`;
            container.appendChild(k);
            wIdx++;
        }
        
        // Touch events
        const start = (e) => { e.preventDefault(); noteOn(m); };
        const end = (e) => { e.preventDefault(); noteOff(m); };
        k.addEventListener('mousedown', start);
        k.addEventListener('mouseup', end);
        k.addEventListener('mouseleave', end);
        k.addEventListener('touchstart', start, {passive:false});
        k.addEventListener('touchend', end, {passive:false});
    }
    container.style.width = (wIdx * wWidth) + 'px';
}

window.addEventListener('load', init);
window.addEventListener('resize', buildPiano);
