class TheoryEngine {
    constructor() {
        this.NOTES_SHARP = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        this.FLAT_MAP = {
            "Cb": "B", "Db": "C#", "Eb": "D#", "Fb": "E", "Gb": "F#", "Ab": "G#", "Bb": "A#"
        };
        this.INTERVAL_NAMES = {
            0: 'P1', 1: 'm2', 2: 'M2', 3: 'm3', 4: 'M3',
            5: 'P4', 6: 'TT', 7: 'P5', 8: 'm6', 9: 'M6',
            10: 'm7', 11: 'M7', 12: 'P8'
        };
        this.CHORD_PATTERNS = {
            '4,7': 'Maj',
            '3,7': 'min',
            '3,6': 'dim',
            '4,8': 'aug',
            '2,7': 'sus2',
            '5,7': 'sus4',
            '4,7,11': 'Maj7',
            '4,7,10': 'Dom7',
            '3,7,10': 'min7',
            '3,6,10': 'm7b5',
            '3,6,9': 'dim7'
        };
    }

    getMidi(noteName) {
        if (!noteName) return null;
        let letter = noteName.slice(0, -1);
        const octave = parseInt(noteName.slice(-1));
        if (this.FLAT_MAP[letter]) letter = this.FLAT_MAP[letter];
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
        if (!names || names.length === 0) return { root: '-', intervals: [], label: '' };
        
        const midis = names.map(n => this.getMidi(n)).sort((a,b) => a-b);
        const rootMidi = midis[0];
        const rootName = this.getNoteName(rootMidi).replace(/[0-9]/g, ''); // Strip octave
        
        // Calculate intervals relative to root
        const intervals = midis.map(m => (m - rootMidi)).filter(i => i > 0);
        // Remove duplicates (e.g. octaves) for pattern matching
        const uniqueIntervals = [...new Set(intervals.map(i => i % 12))].sort((a,b)=>a-b);
        const patternKey = uniqueIntervals.join(',');
        
        const chordType = this.CHORD_PATTERNS[patternKey];
        const label = chordType ? `${rootName} ${chordType}` : '';

        const verboseIntervals = midis.map(m => {
            const dist = (m - rootMidi) % 12;
            return this.INTERVAL_NAMES[dist] || '?';
        });

        return { 
            root: rootName, 
            intervals: verboseIntervals,
            label: label
        };
    }
}
window.Theory = new TheoryEngine();
