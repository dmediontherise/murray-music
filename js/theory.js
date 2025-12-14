class TheoryEngine {
    constructor() {
        this.NOTES_SHARP = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        // Map flats to sharp equivalents for index lookup
        this.FLAT_MAP = {
            "Cb": "B", "Db": "C#", "Eb": "D#", "Fb": "E", "Gb": "F#", "Ab": "G#", "Bb": "A#"
        };
        this.INTERVALS = {
            0: 'Perfect Unison', 1: 'Minor 2nd', 2: 'Major 2nd', 3: 'Minor 3rd', 4: 'Major 3rd',
            5: 'Perfect 4th', 6: 'Tritone', 7: 'Perfect 5th', 8: 'Minor 6th', 9: 'Major 6th',
            10: 'Minor 7th', 11: 'Major 7th', 12: 'Perfect Octave'
        };
    }

    getMidi(noteName) {
        // Handle "C4", "C#4", "Db4"
        if (!noteName) return null;
        
        let letter = noteName.slice(0, -1); // "C", "C#", "Db"
        const octave = parseInt(noteName.slice(-1));
        
        // Resolve Enharmonics (Db -> C#)
        if (this.FLAT_MAP[letter]) {
            letter = this.FLAT_MAP[letter];
        }
        
        const idx = this.NOTES_SHARP.indexOf(letter);
        if (idx === -1) return null;
        
        return (octave + 1) * 12 + idx;
    }

    getNoteName(midi) {
        const idx = midi % 12;
        const octave = Math.floor(midi / 12) - 1;
        return this.NOTES_SHARP[idx] + octave;
    }

    getFreq(midi) {
        return 440 * Math.pow(2, (midi - 69) / 12);
    }

    analyze(names) {
        if (!names || names.length === 0) return { root: '-', intervals: [] };
        // Sort by MIDI
        const midis = names.map(n => this.getMidi(n)).sort((a,b) => a-b);
        const rootMidi = midis[0];
        const rootName = this.getNoteName(rootMidi);
        const intervals = midis.map(m => {
            const dist = (m - rootMidi) % 12; 
            const name = this.INTERVALS[dist] || '?';
            return `${this.getNoteName(m)} (${name})`;
        });
        return { root: rootName, intervals: intervals };
    }
}
window.Theory = new TheoryEngine();