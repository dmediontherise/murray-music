// MURRAY'S THEORY v9.1 (Controller Fix)

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
    seqProgress: 0,
    targetSeq: []
};

// --- AUDIO ENGINE ---
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

// --- UI RENDERING ---
function updateUI() {
    // Keys
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

    if (State.mode === "FREE") {
        document.getElementById('staff-display').innerHTML = window.Renderer.render(names);
    }
}

// --- DRILL LOGIC ---
function checkDrill(lastMidi) {
    if (State.mode === "FREE") return;
    
    const card = document.getElementById('drill-card');
    
    if (State.isChord) {
        const match = State.targetMidis.size === State.active.size && 
                      [...State.targetMidis].every(x => State.active.has(x));
        if (match) successState();
    } else {
        // Sequence logic
        if (lastMidi === State.targetSeq[State.seqProgress]) {
            State.seqProgress++;
            // Update dots? Add visual tracker logic here if needed
            if (State.seqProgress >= State.targetSeq.length) successState();
        }
    }
}

function successState() {
    const card = document.getElementById('drill-card');
    card.classList.add('success');
    document.getElementById('next-btn').style.display = 'inline-block';
    document.getElementById('hint-btn').style.display = 'none';
    document.querySelectorAll('.hint').forEach(k => k.classList.remove('hint'));
}

// --- EXPOSED FUNCTIONS (Window) ---
window.setMode = (mode) => {
    State.mode = mode;
    resetUI();
    document.getElementById('drill-title').innerText = "Free Play";
    document.getElementById('drill-desc').innerText = "Explore harmony.";
    document.getElementById('context-box').style.display = 'none';
    document.querySelectorAll('.nav-item').forEach(e => e.classList.remove('active'));
    document.querySelector(`[onclick="setMode('FREE')"]`).classList.add('active');
};

window.setTopic = (topic) => {
    State.mode = "DRILL";
    State.topic = topic;
    State.idx = 0;
    resetUI();
    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.toggle('active', el.innerText === topic);
    });
    loadChallenge();
};

window.nextDrill = () => {
    State.idx++;
    loadChallenge();
};

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

function loadChallenge() {
    resetUI();
    const challenges = window.Curriculum.CHALLENGES[State.topic];
    
    if (!challenges || State.idx >= challenges.length) {
        document.getElementById('drill-title').innerText = "Section Complete!";
        document.getElementById('drill-desc').innerText = "Select a new topic.";
        return;
    }

    const data = challenges[State.idx];
    document.getElementById('drill-title').innerText = data.instruction;
    document.getElementById('drill-desc').innerText = "Match the notes.";
    
    const notes = Array.isArray(data.notes) ? data.notes : [data.notes];
    const midis = notes.map(n => window.Theory.getMidi(n));
    
    State.targetNotes = notes;
    State.targetMidis = new Set(midis);
    
    // Determine Type
    State.isChord = data.type === 'triad' || data.type === 'interval'; // Simple heuristic
    if (data.type === 'sequence') {
        State.isChord = false;
        State.targetSeq = midis;
        State.seqProgress = 0;
    }

    document.getElementById('staff-display').innerHTML = window.Renderer.render(notes);
    
    if (data.context) {
        document.getElementById('context-box').style.display = 'flex';
        document.getElementById('context-text').innerText = data.context;
    }
    
    document.getElementById('hint-btn').style.display = 'inline-block';
}

function resetUI() {
    const card = document.getElementById('drill-card');
    card.className = 'card'; // Remove success/fail
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('hint-btn').style.display = 'none';
    document.querySelectorAll('.hint').forEach(k => k.classList.remove('hint'));
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('visible');
}

// --- INIT & PIANO ---
const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
// Mapping C3 (48) to B5 (83)
const keyMap = {'z':48,'s':49,'x':50,'d':51,'c':52,'v':53,'g':54,'b':55,'h':56,'n':57,'j':58,'m':59,',':60,'q':60,'2':61,'w':62,'3':63,'e':64,'r':65,'5':66,'t':67,'6':68,'y':69,'7':70,'u':71,'i':72,'9':73,'o':74,'p':76};

function buildPiano() {
    const container = document.getElementById('piano-keys');
    container.innerHTML = '';
    
    const wWidth = window.innerWidth <= 768 ? 44 : 50; 
    let wCount = 0;
    
    // Render White Keys
    for(let m=48; m<=83; m++) {
        if(![1,3,6,8,10].includes(m%12)) {
            const k = document.createElement('div');
            k.className = 'key white-key';
            k.dataset.midi = m;
            
            // Note Label
            const n = document.createElement('div');
            n.className = 'label-n';
            n.innerText = noteNames[m%12];
            k.appendChild(n);
            
            bindEvents(k, m);
            container.appendChild(k);
            wCount++;
        }
    }
    container.style.width = (wCount * wWidth) + 'px';
    
    // Render Black Keys (Absolute)
    let wIdx = 0;
    for(let m=48; m<=83; m++) {
        const isBlack = [1,3,6,8,10].includes(m%12);
        if(isBlack) {
            const k = document.createElement('div');
            k.className = 'key black-key';
            k.dataset.midi = m;
            
            const bWidth = window.innerWidth <= 768 ? 26 : 30;
            // Center between wIdx and wIdx+1
            // White key width is known.
            const left = (wIdx * wWidth) - (bWidth / 2);
            k.style.left = left + 'px';
            
            bindEvents(k, m);
            container.appendChild(k);
        } else {
            wIdx++;
        }
    }
}

function bindEvents(el, m) {
    const on = (e) => { e.preventDefault(); noteOn(m); };
    const off = (e) => { e.preventDefault(); noteOff(m); };
    el.addEventListener('mousedown', on); el.addEventListener('mouseup', off); el.addEventListener('mouseleave', off);
    el.addEventListener('touchstart', on, {passive:false}); el.addEventListener('touchend', off, {passive:false});
}

function init() {
    buildPiano();
    window.addEventListener('resize', buildPiano);
    
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
    document.addEventListener('keydown', e => { if(!e.repeat && keyMap[e.key.toLowerCase()]) noteOn(keyMap[e.key.toLowerCase()]); });
    document.addEventListener('keyup', e => { if(keyMap[e.key.toLowerCase()]) noteOff(keyMap[e.key.toLowerCase()]); });

    // Menu
    const bg = document.getElementById('bg-list');
    const ad = document.getElementById('adv-list');
    if (window.Curriculum && window.Curriculum.BEGINNER) {
        window.Curriculum.BEGINNER.forEach(t => bg.innerHTML += `<div class="nav-item" onclick="setTopic('${t}')">${t}</div>`);
        window.Curriculum.ADVANCED.forEach(t => ad.innerHTML += `<div class="nav-item" onclick="setTopic('${t}')">${t}</div>`);
    }
}

window.addEventListener('load', init);
