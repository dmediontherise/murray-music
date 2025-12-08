/**
 * script.js
 * 
 * Audio Engine & Music Theory Logic based on "Murray's Music Theory"
 * Integrated by Lead Full-Stack Integrator
 */

// ==========================================
// 1. AUDIO ENGINE
// ==========================================

class Synthesizer {
    constructor() {
        // Initialize Web Audio API context
        // Browser Policy: Created here, but suspended. Must be resumed on user interaction.
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.gainNode = this.audioCtx.createGain();
        this.gainNode.connect(this.audioCtx.destination);
        this.gainNode.gain.value = 0.5; // Master volume
        this.activeNotes = new Map(); // Tracks currently playing notes { noteName: { osc, gain } }
    }

    /**
     * Converts a Note Name (e.g., "C4", "A#3") to Frequency (Hz)
     * Reference: A4 = 440Hz
     */
    getFrequency(note) {
        const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        const octave = parseInt(note.slice(-1));
        const keyNumber = notes.indexOf(note.slice(0, -1));

        if (keyNumber === -1) return 0;

        // Calculate steps from A4 (which is at index 9 in octave 4)
        const A4_INDEX = 9;
        const A4_OCTAVE = 4;
        
        // Total semitones relative to C0
        const absoluteIndex = (octave * 12) + keyNumber;
        const a4AbsoluteIndex = (A4_OCTAVE * 12) + A4_INDEX;
        
        const semitoneDistance = absoluteIndex - a4AbsoluteIndex;
        
        // Formula: f = 440 * 2^(n/12)
        return 440 * Math.pow(2, semitoneDistance / 12);
    }

    /**
     * Starts playing a note (Key Down)
     */
    noteOn(note, frequency, type = 'triangle') {
        if (this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }

        // Prevent multiple oscillators for the same key (machine gun effect)
        if (this.activeNotes.has(note)) return;

        const osc = this.audioCtx.createOscillator();
        const oscGain = this.audioCtx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(this.gainNode);

        // Attack
        oscGain.gain.setValueAtTime(0, this.audioCtx.currentTime);
        oscGain.gain.linearRampToValueAtTime(0.5, this.audioCtx.currentTime + 0.05);

        osc.start();
        
        // Store reference to stop it later
        this.activeNotes.set(note, { osc, gain: oscGain });
    }

    /**
     * Stops playing a note (Key Up)
     */
    noteOff(note) {
        const activeNote = this.activeNotes.get(note);
        if (!activeNote) return;

        const { osc, gain } = activeNote;

        // Release
        const releaseTime = 0.2;
        gain.gain.cancelScheduledValues(this.audioCtx.currentTime);
        gain.gain.setValueAtTime(gain.gain.value, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + releaseTime);

        osc.stop(this.audioCtx.currentTime + releaseTime);

        // Cleanup
        setTimeout(() => {
            osc.disconnect();
            gain.disconnect();
        }, releaseTime * 1000 + 50);

        this.activeNotes.delete(note);
    }

    /**
     * Legacy support for chords/sequences (one-shot)
     */
    playTone(frequency, type = 'triangle', duration = 1.0, time = 0) {
        if (this.audioCtx.state === 'suspended') this.audioCtx.resume();
        
        const t = this.audioCtx.currentTime + time;
        const osc = this.audioCtx.createOscillator();
        const oscGain = this.audioCtx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(frequency, t);

        osc.connect(oscGain);
        oscGain.connect(this.gainNode);

        oscGain.gain.setValueAtTime(0, t);
        oscGain.gain.linearRampToValueAtTime(0.5, t + 0.05);
        oscGain.gain.exponentialRampToValueAtTime(0.001, t + duration);

        osc.start(t);
        osc.stop(t + duration);

        setTimeout(() => {
            osc.disconnect();
            oscGain.disconnect();
        }, (time + duration) * 1000 + 100);
    }

    playChord(frequencies, type = 'sine', duration = 2.0) {
        frequencies.forEach(freq => this.playTone(freq, type, duration));
    }
}

// ==========================================
// 2. THEORY ENGINE (THE BRAIN)
// ==========================================

const TheoryEngine = {
    // Basic Chromatic Scale for reference
    notes: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],

    /**
     * Murray Rule: Intervals
     * Defining semitone distances for calculations.
     */
    intervals: {
        'P1': 0, 'm2': 1, 'M2': 2, 'm3': 3, 'M3': 4,
        'P4': 5, 'd5': 6, 'P5': 7, 'm6': 8, 'M6': 9,
        'm7': 10, 'M7': 11, 'P8': 12
    },
    
    triadFormulas: {
        'maj': [0, 4, 7],
        'min': [0, 3, 7],
        'dim': [0, 3, 6],
        'aug': [0, 4, 8],
        'sus4': [0, 5, 7],
        'sus2': [0, 2, 7],
        // 7th Chords
        'maj7': [0, 4, 7, 11],
        'min7': [0, 3, 7, 10],
        'dom7': [0, 4, 7, 10],
        'm7b5': [0, 3, 6, 10], // Half-diminished
        'dim7': [0, 3, 6, 9]   // Fully diminished
    },

    /**
     * Murray Rule: Modes
     * Offsets from the root note in semitones.
     */
    modes: {
        'Ionian':     [0, 2, 4, 5, 7, 9, 11], // Major
        'Dorian':     [0, 2, 3, 5, 7, 9, 10],
        'Phrygian':   [0, 1, 3, 5, 7, 8, 10],
        'Lydian':     [0, 2, 4, 6, 7, 9, 11],
        'Mixolydian': [0, 2, 4, 5, 7, 9, 10],
        'Aeolian':    [0, 2, 3, 5, 7, 8, 10], // Natural Minor
        'Locrian':    [0, 1, 3, 5, 6, 8, 10],
        
        // Minor Variations
        'HarmonicMinor': [0, 2, 3, 5, 7, 8, 11],
        'MelodicMinor':  [0, 2, 3, 5, 7, 9, 11], // Jazz Minor (ascending form used both ways)
        
        // Jazz & Blues
        'PentMajor':   [0, 2, 4, 7, 9],
        'PentMinor':   [0, 3, 5, 7, 10],
        'Blues':       [0, 3, 5, 6, 7, 10],
        'WholeTone':   [0, 2, 4, 6, 8, 10],
        'DiminishedHW': [0, 1, 3, 4, 6, 7, 9, 10], // Half-Whole (Dominant Diminished)
        
        // Exotic
        'DoubleHarmonicMaj': [0, 1, 4, 5, 7, 8, 11], // Byzantine Scale
        'Sadness': [0, 1, 3, 6, 7, 8, 11] // Double Harmonic Minor
    },

    /**
     * Helper: Get note name from Root + Semitones
     * Handles wrapping around the octave.
     */
    getNoteFromInterval: function(rootNote, semitones) {
        const rootIndex = this.notes.indexOf(rootNote.slice(0, -1)); // Ignore octave for base note
        const octave = parseInt(rootNote.slice(-1));
        
        let newIndex = rootIndex + semitones;
        let octaveShift = Math.floor(newIndex / 12);
        let normalizedIndex = newIndex % 12;

        return this.notes[normalizedIndex] + (octave + octaveShift);
    },

    /**
     * Generate a scale based on a root note and mode/pattern
     */
    generateScale: function(rootNote, pattern) {
        return pattern.map(interval => this.getNoteFromInterval(rootNote, interval));
    }
};

// ==========================================
// 3. VOICING LOGIC
// ==========================================

const VoicingLogic = {
    /**
     * Murray Rule: Shell Voicing
     * STRICTLY drops the root.
     * Returns only 3rd and 7th.
     * Assumes a standard 7th chord structure (1, 3, 5, 7) as input array [Root, 3rd, 5th, 7th].
     */
    getShellVoicing: function(chordNotes) {
        const shell = [];
        // Index 1 is 3rd, Index 3 is 7th
        if (chordNotes[1]) shell.push(chordNotes[1]); // 3rd
        if (chordNotes[3]) shell.push(chordNotes[3]); // 7th
        return shell;
    },

    /**
     * Murray Rule: Herbie Hancock Voicing
     * "LH: Root/7th and RH: 3rd, 4th, 7th, 9th"
     */
    getHerbieHancockVoicing: function(rootNote) {
        // LH: Root (0), m7 (10)
        // RH: 3rd (16), 4th (17), 7th (22), 9th (26)
        const intervals = [0, 10, 16, 17, 22, 26];
        return intervals.map(semitones => TheoryEngine.getNoteFromInterval(rootNote, semitones));
    },

    /**
     * Murray Rule: So What Voicing (Quartal)
     * Stack of 4ths with a Major 3rd on top.
     * Classic Dm11: D, G, C, F, A (0, 5, 10, 15, 19)
     */
    getSoWhatVoicing: function(rootNote) {
        const intervals = [0, 5, 10, 15, 19];
        return intervals.map(semitones => TheoryEngine.getNoteFromInterval(rootNote, semitones));
    },

    /**
     * Murray Rule: Kenny Barron Minor 11
     * Open spread: Root, 5, 9, 11, 7 (on top)
     * 0, 7, 14, 17, 22
     */
    getKennyBarronVoicing: function(rootNote) {
        const intervals = [0, 7, 14, 17, 22];
        return intervals.map(semitones => TheoryEngine.getNoteFromInterval(rootNote, semitones));
    }
};

// ==========================================
// 4. CALCULATORS
// ==========================================

const Calculators = {
    /**
     * Murray Rule: Tritone Sub
     * Calculates exactly 6 half-steps down (or up) from the root.
     */
    getTritoneSub: function(rootNote) {
        // 6 semitones = Tritone
        return TheoryEngine.getNoteFromInterval(rootNote, 6);
    },

    /**
     * Murray Rule: Altered Dominant
     */
    getAlteredDominant: function(rootNote, alterations = {}) {
        let intervals = [0, 4, 7, 10]; // 1, 3, 5, b7

        if (alterations.five === '#') {
            intervals[2] = 8; // #5 (m6 enharmonic)
        }

        if (alterations.nine === 'b') {
            intervals.push(13); // b9
        } else {
            intervals.push(14); // Natural 9 (default extension)
        }

        return intervals.map(semitones => TheoryEngine.getNoteFromInterval(rootNote, semitones));
    }
};

// ==========================================
// 5. INTEGRATION & DOM EVENTS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Audio Engine
    const audio = new Synthesizer();
    let currentRoot = "C4";

    // Browser Policy Fix: Resume AudioContext on first interaction
    const resumeAudio = () => {
        if (audio.audioCtx.state === 'suspended') {
            audio.audioCtx.resume();
        }
    };
    document.addEventListener('click', resumeAudio, { once: true });
    document.addEventListener('keydown', resumeAudio, { once: true });

    // 2. Helper Functions
    const infoText = document.getElementById('info-text');

    // === STAFF RENDERER ===
    const StaffRenderer = {
        container: document.getElementById('notes-layer'),
        
        // Staff Geometry
        // We assume 5 lines with gap 10px.
        // Bottom Line (E4) is reference. 
        // Logic: Calculate offset in "half steps" (lines/spaces) from E4.
        // E4 is at the bottom of the stack of lines.
        // Let's get the visual offset relative to the staff-lines container.
        
        draw: function(notes, isChord = false) {
            if (!this.container) return;
            this.container.innerHTML = ''; // Clear

            // Base position: Center of the staff
            // The staff lines height is roughly 44px (4 gaps * 11px).
            // Let's place sequence notes spread out, chords stacked.
            
            const startX = isChord ? 50 : 30; // Percent
            const stepX = isChord ? 0 : 5;   // Percent spacing for sequences
            
            // Reference: E4 is the bottom line.
            // Visually, the .staff-lines container has 5 lines.
            // Top line (index 0) is F5.
            // Bottom line (index 4) is E4.
            // Each visual step (line to space) is approx 5.5px.
            // But we can use % or px. Let's use PX relative to the container center.
            
            // Getting container dimensions
            const staffHeight = 44; // Approx height of lines block
            const bottomLineY = 44; // Relative to top of .staff-lines? 
            // Actually, let's just anchor to the bottom line element if possible, or assume 10px gap.
            // Top (F5) = 0px
            // ...
            // Bottom (E4) = 44px (4 * 11px)
            
            const baseNote = "E4"; // Bottom Line
            const baseY = 44;      // Top offset in PX for E4
            const stepY = 5.5;     // Half the gap (11px / 2)

            notes.forEach((note, index) => {
                const { noteName, octave, accidental } = this.parseNote(note);
                
                // Calculate steps from E4
                const steps = this.calculateSteps(noteName, octave); // e.g. C4 is -2 steps from E4
                
                // Calculate Y position (Higher pitch = Lower Y value)
                // Y = baseY - (steps * stepY)
                const topY = baseY - (steps * stepY);
                
                // Create Note Group
                const group = document.createElement('div');
                group.className = 'note-group';
                
                // Center the group in the staff container vertically? 
                // No, we rely on the .staff-lines position which is centered in flex.
                // We need to offset relative to the .staff-lines. 
                // The .notes-layer is absolute covering .staff-display.
                // .staff-lines is centered.
                // We need to add a TOP offset to align with the rendered lines.
                // The lines start at some Y inside the flex container.
                // Let's try to center strictly relative to the layer center.
                // Center line is B4.
                
                const centerY = 50; // %
                const stepsFromB4 = steps - 4; // B4 is 4 steps above E4
                const pxOffset = -(stepsFromB4 * 5.5);
                
                group.style.top = `calc(50% + ${pxOffset}px)`;
                
                // X Position
                let leftPos = startX;
                if (!isChord) {
                     // Center the sequence
                     const totalWidth = notes.length * stepX;
                     const startOffset = 50 - (totalWidth / 2);
                     leftPos = startOffset + (index * stepX);
                }
                group.style.left = `${leftPos}%`;

                // Note Head
                const head = document.createElement('div');
                head.className = 'note-head';
                group.appendChild(head);
                
                // Accidental
                if (accidental) {
                    const acc = document.createElement('div');
                    acc.className = 'note-accidental';
                    acc.textContent = accidental === '#' ? '♯' : '♭';
                    group.appendChild(acc);
                }
                
                // Ledger Lines
                // Top Line is F5 (steps=8 from E4). Notes > 8 need lines?
                // Actually F5 is Top Line. G5 (9) sits on top. A5 (10) needs line.
                // Bottom Line is E4 (steps=0). D4 (-1) sits below. C4 (-2) needs line.
                
                if (steps <= -2 || steps >= 10) { 
                    // Simple logic for C4 (Middle C) -> -2
                    // A5 -> 10
                    // Just one line for now for simplicity
                     if (steps % 2 === 0) {
                        const line = document.createElement('div');
                        line.className = 'ledger-line';
                        group.appendChild(line);
                     }
                }

                this.container.appendChild(group);
            });
        },
        
        parseNote: function(noteString) {
            // e.g. C#4, Bb3, F5
            const regex = /^([A-G])(#|b)?(\d)$/;
            const match = noteString.match(regex);
            if (!match) return { noteName: 'C', octave: 4, accidental: null };
            return {
                noteName: match[1],
                accidental: match[2] || null,
                octave: parseInt(match[3])
            };
        },
        
        calculateSteps: function(noteName, octave) {
            // Diatonic steps from C0
            const diatonicIndices = { 'C': 0, 'D': 1, 'E': 2, 'F': 3, 'G': 4, 'A': 5, 'B': 6 };
            const absStep = (octave * 7) + diatonicIndices[noteName];
            
            // Reference E4
            // E4 = (4 * 7) + 2 = 30
            const refStep = 30;
            
            return absStep - refStep;
        }
    };

    const theoryInfo = {
        // Intervals
        'm2': "Minor 2nd: Very dissonant, 1 semitone apart. Creates a sense of tension or horror (e.g., 'Jaws' theme).",
        'M2': "Major 2nd: Whole step, 2 semitones. A standard building block for scales. Sounds open but slightly suspended.",
        'm3': "Minor 3rd: Sad, melancholic, or serious. 3 semitones. The defining interval of a Minor Chord.",
        'M3': "Major 3rd: Happy, bright, or stable. 4 semitones. The defining interval of a Major Chord.",
        'P4': "Perfect 4th: Consonant but slightly suspended. 5 semitones. Sounds like a call or announcement ('Here Comes the Bride').",
        'd5': "Tritone (Aug4/Dim5): The 'Devil in Music'. 6 semitones. Highly unstable and demands resolution.",
        'P5': "Perfect 5th: The 'Power Chord'. 7 semitones. Very stable, grounded, and powerful.",
        'm6': "Minor 6th: Emotional, romantic, or tragic. 8 semitones. Used in 'Love Story' theme.",
        'M6': "Major 6th: Pleasant, pastoral, and restful. 9 semitones. 'My Bonnie Lies Over the Ocean'.",
        'm7': "Minor 7th: Funky, jazzy, or unresolved. 10 semitones. Essential for Dominant 7th chords.",
        'M7': "Major 7th: Dreamy, nostalgic, and smooth. 11 semitones. Common in Jazz and Lo-Fi.",
        'P8': "Octave: The same note at a higher pitch. 12 semitones. Perfectly consonant.",
        
        // Triads
        'maj': "Major Triad (1-3-5): Happy, bright, and stable. The most common chord in Western music.",
        'min': "Minor Triad (1-b3-5): Sad, serious, or melancholic. The darker counterpart to Major.",
        'dim': "Diminished Triad (1-b3-b5): Tense, constricted, and unstable. Often used to pass between other chords or in horror scores.",
        'aug': "Augmented Triad (1-3-#5): Dreamy, floating, and unsettled. Has a 'whole tone' feel.",
        'sus4': "Suspended 4th (1-4-5): Open and tension-building. Usually resolves down to the Major 3rd.",
        'sus2': "Suspended 2nd (1-2-5): Airy, open, and modern. Common in Pop and Rock ballads.",
        
        // 7th Chords
        'maj7': "Major 7th (1-3-5-7): Dreamy, nostalgic, and smooth. Standard in Jazz and Lo-Fi.",
        'min7': "Minor 7th (1-b3-5-b7): Mellow, cool, and soulful. The foundation of Jazz II-V-I progressions.",
        'dom7': "Dominant 7th (1-3-5-b7): Tense and bluesy. Wants to resolve to the Tonic (I).",
        'm7b5': "Half-Diminished (1-b3-b5-b7): Dark, mysterious, and tragic. Used as the 'II' in minor key progressions.",
        'dim7': "Fully Diminished (1-b3-b5-bb7): Extremely tense and ambiguous. Used in horror scores and for chromatic modulation.",

        // Modes
        'Ionian': "Ionian (Major Scale): Bright, happy, and heroic. The standard reference for Western music.",
        'Dorian': "Dorian: A minor scale with a brighter 'Major 6th'. Soulful, jazzy, and medieval (e.g., 'So What', 'Scarborough Fair').",
        'Phrygian': "Phrygian: Minor scale with a dark 'Flat 2nd'. Sounds Spanish, exotic, or heavy (common in Metal).",
        'Lydian': "Lydian: Major scale with a 'Sharp 4th'. Dreamy, magical, and floaty (e.g., 'The Simpsons' theme, space movies).",
        'Mixolydian': "Mixolydian: Major scale with a 'Flat 7th'. Bluesy, rock-n-roll, and less eager to resolve than Major.",
        'Aeolian': "Aeolian (Natural Minor): Sad, serious, and epic. The standard minor key for ballads and dramatic scores.",
        'Locrian': "Locrian: The only mode with a diminished 5th. Very unstable and dark. Rarely used as a home key.",
        
        // Minor Variations
        'HarmonicMinor': "Harmonic Minor: Natural minor with a raised 7th. Creates a 'Snake Charmer' pull to the root. Used in Classical and Neo-Classical Metal.",
        'MelodicMinor': "Melodic Minor (Jazz Minor): Natural minor with raised 6th and 7th. Smooth and sophisticated, avoiding the 'augmented 2nd' jump.",
        
        // Jazz & Blues
        'PentMajor': "Major Pentatonic: The 'Country/Pop' scale. 5 notes, no semitones. Very pure and safe for improvisation.",
        'PentMinor': "Minor Pentatonic: The 'Rock/Blues' scale. 5 notes. The most popular scale for guitar solos.",
        'Blues': "Blues Scale: Minor Pentatonic with an added 'Blue Note' (#4/b5). Gritty, soulful, and expressive.",
        'WholeTone': "Whole Tone: 6 notes separated by whole steps. Dreamy, floating, and ambiguous. No tonal center (Debussy).",
        'DiminishedHW': "Diminished (Half-Whole): Symmetrical scale used over Dominant 7b9 chords. Creates distinct tension/release patterns in Jazz.",
        
        // Exotic
        'DoubleHarmonicMaj': "Double Harmonic Major: The 'Byzantine' or 'Arabic' scale. Major with b2 and b6. Very exotic and intense.",
        'Sadness': "Double Harmonic Minor: Exotic, Middle-Eastern flavor. Features two augmented second intervals. The 'Saddest' scale.",

        // Advanced
        'Circle': "Circle of 5ths: Visualizes the relationship between the 12 tones. Clockwise moves by 5ths, Counter-clockwise by 4ths.",
        'Herbie': "Herbie Hancock Voicing: A specific, rich dominant 13th voicing. (LH: 1-7, RH: 3-13-7-9). Dense and modern.",
        'SoWhat': "So What Voicing: Famous quartal voicing (stacked 4ths) used by Bill Evans on Miles Davis' 'So What'. Modern, modal sound.",
        'Kenny': "Kenny Barron Voicing: An open Minor 11th voicing (1-5-9-11-7). Creates a spacious, sophisticated minor sound.",
        'Shell': "Shell Voicings: Jazz piano technique playing only the essential 3rd and 7th (dropping the root). Defines the chord clearly with minimal notes.",
        'Tritone': "Tritone Substitution: Replacing a Dominant 7th chord with one a tritone away (e.g., G7 -> Db7). Creates smooth chromatic bass movement.",
        'G7': "Dominant 7th (G7): The 'tension' chord. Use #5 or b9 to add 'altered' tension that pulls even stronger to the tonic.",
        'Alt#5': "Sharp 5 (#5): Raises the 5th by a semitone. Creates an Augmented quality, adding suspense.",
        'Altb9': "Flat 9 (b9): Lowers the 9th by a semitone. Very dissonant and dark, common in Minor key dominants."
    };

    function updateInfo(key) {
        if (theoryInfo[key] && infoText) {
            infoText.textContent = theoryInfo[key];
            // Visual feedback on update
            infoText.style.opacity = 0;
            setTimeout(() => infoText.style.opacity = 1, 100);
        }
    }

    function highlightKeys(notes) {
        notes.forEach(note => {
            const key = document.querySelector(`.key[data-note="${note}"]`);
            if (key) {
                key.classList.add('active-key');
                setTimeout(() => key.classList.remove('active-key'), 400);
            }
        });
    }

    function playSequence(notes, duration = 0.5) {
        // RENDER NOTES
        StaffRenderer.draw(notes, false);

        notes.forEach((note, index) => {
            const freq = audio.getFrequency(note);
            audio.playTone(freq, 'triangle', duration, index * 0.3);
            setTimeout(() => highlightKeys([note]), index * 300);
        });
    }

    // 3. Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            btn.classList.add('active');
            const targetId = `tab-${btn.dataset.tab}`;
            document.getElementById(targetId).classList.add('active');
            
            // Clear staff on tab switch
            StaffRenderer.container.innerHTML = '';
        });
    });

    // 4. Root Selector Logic
    const rootBtns = document.querySelectorAll('.root-btn');
    rootBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            rootBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentRoot = btn.dataset.root;
        });
    });

    // 5. Fundamentals: Intervals
    const intervalBtns = document.querySelectorAll('.interval-btn');
    intervalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            resumeAudio();
            const intervalKey = btn.dataset.int;
            updateInfo(intervalKey); // UPDATE INFO

            const semitones = TheoryEngine.intervals[intervalKey];
            
            const note2 = TheoryEngine.getNoteFromInterval(currentRoot, semitones);
            
            // Play Root then Interval
            playSequence([currentRoot, note2], 0.6);
        });
    });

    // 6. Fundamentals: Triads
    const triadBtns = document.querySelectorAll('.triad-btn');
    triadBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            resumeAudio();
            const type = btn.dataset.triad;
            updateInfo(type); // UPDATE INFO

            const formula = TheoryEngine.triadFormulas[type];
            
            const notes = formula.map(semitones => TheoryEngine.getNoteFromInterval(currentRoot, semitones));
            
            // Play Chord
            const freqs = notes.map(n => audio.getFrequency(n));
            audio.playChord(freqs, 'triangle', 1.0);
            highlightKeys(notes);
            StaffRenderer.draw(notes, true); // RENDER CHORD
        });
    });
    
    // ... (Modes listeners follow playSequence which handles draw)

    // 7. Modes: Mode Pills
    const modeBtns = document.querySelectorAll('.mode-btn');
    modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            resumeAudio();
            const modeName = btn.dataset.mode;
            updateInfo(modeName.split(' ')[0]); // UPDATE INFO

            const formula = TheoryEngine.modes[modeName.split(' ')[0]]; // Handle "Ionian (Maj)"
            
            const scale = TheoryEngine.generateScale(currentRoot, formula);
            playSequence(scale);
        });
    });

    // 8. Modes: Circle of 5ths
    const circleBtn = document.getElementById('btn-circle-5ths');
    if (circleBtn) {
        circleBtn.addEventListener('click', () => {
            resumeAudio();
            updateInfo('Circle'); // UPDATE INFO

            // Play a sequence of 5ths starting from C4
            const sequence = [];
            let current = "C3";
            for(let i=0; i<6; i++) {
                sequence.push(current);
                current = TheoryEngine.getNoteFromInterval(current, 7); // Up a 5th
            }
            playSequence(sequence, 0.4);
        });
    }

    // 10. Advanced: Voicings
    const btnHerbie = document.getElementById('btn-herbie');
    if (btnHerbie) {
        btnHerbie.addEventListener('click', () => {
            resumeAudio();
            updateInfo('Herbie');
            const chord = VoicingLogic.getHerbieHancockVoicing(currentRoot);
            highlightKeys(chord);
            audio.playChord(chord.map(n => audio.getFrequency(n)), 'sine', 1.5);
            StaffRenderer.draw(chord, true); // RENDER CHORD
        });
    }

    const btnSoWhat = document.getElementById('btn-sowhat');
    if (btnSoWhat) {
        btnSoWhat.addEventListener('click', () => {
            resumeAudio();
            updateInfo('SoWhat');
            const chord = VoicingLogic.getSoWhatVoicing(currentRoot);
            highlightKeys(chord);
            audio.playChord(chord.map(n => audio.getFrequency(n)), 'sine', 1.5);
            StaffRenderer.draw(chord, true); // RENDER CHORD
        });
    }

    const btnKenny = document.getElementById('btn-kenny');
    if (btnKenny) {
        btnKenny.addEventListener('click', () => {
            resumeAudio();
            updateInfo('Kenny');
            const chord = VoicingLogic.getKennyBarronVoicing(currentRoot);
            highlightKeys(chord);
            audio.playChord(chord.map(n => audio.getFrequency(n)), 'sine', 1.5);
            StaffRenderer.draw(chord, true); // RENDER CHORD
        });
    }

    // 11. Advanced: Tritone Sub & G7 (Alterations Logic)
    const btnG7 = document.getElementById('btn-dominant-g7');
    const toggleTritone = document.getElementById('tritone-sub');
    const toggleShell = document.getElementById('shell-voicings');
    const altButtons = document.querySelectorAll('.chip-btn');
    
    // State for alterations
    let alterations = { five: null, nine: null };

    // Toggle logic for chip buttons
    altButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.alt; // sharp5 or flat9
            btn.classList.toggle('active');
            
            if (type === 'sharp5') {
                alterations.five = btn.classList.contains('active') ? '#' : null;
                if (btn.classList.contains('active')) updateInfo('Alt#5');
            } else if (type === 'flat9') {
                alterations.nine = btn.classList.contains('active') ? 'b' : null;
                 if (btn.classList.contains('active')) updateInfo('Altb9');
            }
        });
    });

    if(toggleTritone) toggleTritone.addEventListener('change', () => updateInfo('Tritone'));
    if(toggleShell) toggleShell.addEventListener('change', () => updateInfo('Shell'));

    if (btnG7) {
        btnG7.addEventListener('click', () => {
            resumeAudio();
            updateInfo('G7'); // UPDATE INFO
            
            let root = "G3"; 
            
            // Check Tritone Sub
            if (toggleTritone && toggleTritone.checked) {
                root = Calculators.getTritoneSub(root); // Becomes Db
            }
            
            // Calculate Notes (passing alterations)
            let notes = Calculators.getAlteredDominant(root, alterations);
            
            // Check Shell Voicing (Strictly Drops Root)
            if (toggleShell && toggleShell.checked) {
                notes = VoicingLogic.getShellVoicing(notes);
            }
            
            highlightKeys(notes);
            audio.playChord(notes.map(n => audio.getFrequency(n)), 'triangle', 1.0);
            StaffRenderer.draw(notes, true); // RENDER CHORD
        });
    }

    // 12. Piano Input Logic (Mouse/Touch/Keyboard)
    const attachKeyEvents = (keyElement) => {
        const note = keyElement.dataset.note;
        
        const startNote = (e) => {
            if (e.type === 'mousedown' && e.buttons !== 1) return;
            e.preventDefault();
            resumeAudio();
            const freq = audio.getFrequency(note);
            audio.noteOn(note, freq, 'triangle');
            keyElement.classList.add('active-key');
        };

        const stopNote = (e) => {
            e.preventDefault();
            audio.noteOff(note);
            keyElement.classList.remove('active-key');
        };

        keyElement.addEventListener('mousedown', startNote);
        keyElement.addEventListener('mouseup', stopNote);
        keyElement.addEventListener('mouseleave', stopNote);
        keyElement.addEventListener('touchstart', startNote);
        keyElement.addEventListener('touchend', stopNote);
    };

    const keys = document.querySelectorAll('.key');
    keys.forEach(attachKeyEvents);

    const keyMap = {
        'z': 'C3', 's': 'C#3', 'x': 'D3', 'd': 'D#3', 'c': 'E3', 'v': 'F3',
        'g': 'F#3', 'b': 'G3', 'h': 'G#3', 'n': 'A3', 'j': 'A#3', 'm': 'B3',
        'q': 'C4', '2': 'C#4', 'w': 'D4', '3': 'D#4', 'e': 'E4', 'r': 'F4',
        '5': 'F#4', 't': 'G4', '6': 'G#4', 'y': 'A4', '7': 'A#4', 'u': 'B4',
        'i': 'C5', '9': 'C#5', 'o': 'D5', '0': 'D#5', 'p': 'E5'
    };

    document.addEventListener('keydown', (e) => {
        if (e.repeat) return;
        const note = keyMap[e.key.toLowerCase()];
        if (note) {
            const freq = audio.getFrequency(note);
            audio.noteOn(note, freq, 'triangle');
            const keyEl = document.querySelector(`.key[data-note="${note}"]`);
            if (keyEl) keyEl.classList.add('active-key');
        }
    });

    document.addEventListener('keyup', (e) => {
        const note = keyMap[e.key.toLowerCase()];
        if (note) {
            audio.noteOff(note);
            const keyEl = document.querySelector(`.key[data-note="${note}"]`);
            if (keyEl) keyEl.classList.remove('active-key');
        }
    });
});