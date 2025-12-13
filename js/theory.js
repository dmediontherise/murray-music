class TheoryEngine {
    constructor() {
        this.NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        this.INTERVALS = {
            0: 'Perfect Unison', 1: 'Minor 2nd', 2: 'Major 2nd', 3: 'Minor 3rd', 4: 'Major 3rd',
            5: 'Perfect 4th', 6: 'Tritone', 7: 'Perfect 5th', 8: 'Minor 6th', 9: 'Major 6th',
            10: 'Minor 7th', 11: 'Major 7th', 12: 'Perfect Octave'
        };
        this.TRIAD_FORMULAS = {
            'maj': [0, 4, 7], 'min': [0, 3, 7], 'dim': [0, 3, 6], 'aug': [0, 4, 8],
            'sus4': [0, 5, 7], 'sus2': [0, 2, 7], 'maj6': [0, 4, 7, 9], 'min6': [0, 3, 7, 9],
            'maj7': [0, 4, 7, 11], 'min7': [0, 3, 7, 10], 'dom7': [0, 4, 7, 10],
            'm7b5': [0, 3, 6, 10], 'dim7': [0, 3, 6, 9]
        };
    }

    getMidi(noteName) {
        // "C4" -> 60
        if (!noteName) return null;
        const letter = noteName.slice(0, -1);
        const octave = parseInt(noteName.slice(-1));
        const idx = this.NOTES.indexOf(letter);
        if (idx === -1) return null;
        return (octave + 1) * 12 + idx;
    }

    getNoteName(midi) {
        // 60 -> "C4"
        const idx = midi % 12;
        const octave = Math.floor(midi / 12) - 1;
        return this.NOTES[idx] + octave;
    }

    getFreq(midi) {
        return 440 * Math.pow(2, (midi - 69) / 12);
    }

    getScale(rootName, semitones) {
        // root: "C4", semitones: [0, 4, 7] -> ["C4", "E4", "G4"]
        const rootMidi = this.getMidi(rootName);
        if (rootMidi === null) return [];
        return semitones.map(s => this.getNoteName(rootMidi + s));
    }

    analyze(notes) {
        // notes: ["C4", "E4", "G4"]
        if (!notes || notes.length === 0) return { root: '-', intervals: [] };
        
        // Sort by MIDI
        const midis = notes.map(n => this.getMidi(n)).sort((a,b) => a-b);
        const rootMidi = midis[0];
        const rootName = this.getNoteName(rootMidi);
        
        const intervals = midis.map(m => {
            const dist = (m - rootMidi) % 12; // Modulo 12 for compound intervals simplified
            const name = this.INTERVALS[dist] || '?';
            return `${this.getNoteName(m)} (${name})`;
        });

        return { root: rootName, intervals: intervals };
    }
}

// Export instance
window.Theory = new TheoryEngine();
