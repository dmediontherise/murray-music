class TheoryEngine:
    NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
    
    INTERVALS = {
        'P1': 0, 'm2': 1, 'M2': 2, 'm3': 3, 'M3': 4,
        'P4': 5, 'd5': 6, 'P5': 7, 'm6': 8, 'M6': 9,
        'm7': 10, 'M7': 11, 'P8': 12
    }

    TRIAD_FORMULAS = {
        'maj': [0, 4, 7],
        'min': [0, 3, 7],
        'dim': [0, 3, 6],
        'aug': [0, 4, 8],
        'sus4': [0, 5, 7],
        'sus2': [0, 2, 7],
        # 7th Chords
        'maj7': [0, 4, 7, 11],
        'min7': [0, 3, 7, 10],
        'dom7': [0, 4, 7, 10],
        'm7b5': [0, 3, 6, 10], # Half-diminished
        'dim7': [0, 3, 6, 9]   # Fully diminished
    }

    MODES = {
        'Ionian':     [0, 2, 4, 5, 7, 9, 11], # Major
        'Dorian':     [0, 2, 3, 5, 7, 9, 10],
        'Phrygian':   [0, 1, 3, 5, 7, 8, 10],
        'Lydian':     [0, 2, 4, 6, 7, 9, 11],
        'Mixolydian': [0, 2, 4, 5, 7, 9, 10],
        'Aeolian':    [0, 2, 3, 5, 7, 8, 10], # Natural Minor
        'Locrian':    [0, 1, 3, 5, 6, 8, 10],
        
        # Minor Variations
        'HarmonicMinor': [0, 2, 3, 5, 7, 8, 11],
        'MelodicMinor':  [0, 2, 3, 5, 7, 9, 11], 
        
        # Jazz & Blues
        'PentMajor':   [0, 2, 4, 7, 9],
        'PentMinor':   [0, 3, 5, 7, 10],
        'Blues':       [0, 3, 5, 6, 7, 10],
        'WholeTone':   [0, 2, 4, 6, 8, 10],
        'DiminishedHW': [0, 1, 3, 4, 6, 7, 9, 10], # Half-Whole
        
        # Exotic
        'DoubleHarmonicMaj': [0, 1, 4, 5, 7, 8, 11],
        'Sadness': [0, 1, 3, 6, 7, 8, 11]
    }

    @staticmethod
    def get_note_from_interval(root_note, semitones):
        """
        Calculates a new note based on root and semitone offset.
        root_note: e.g., "C4", "A#3"
        """
        if not root_note: return None
        
        # Parse root
        try:
            if len(root_note) == 3:
                note_name = root_note[:2]
                octave = int(root_note[2])
            else:
                note_name = root_note[:1]
                octave = int(root_note[1])
        except ValueError:
            return root_note # Return as is if parse fails

        root_index = TheoryEngine.NOTES.index(note_name)
        
        new_total_index = root_index + semitones
        octave_shift = new_total_index // 12
        normalized_index = new_total_index % 12
        
        return f"{TheoryEngine.NOTES[normalized_index]}{octave + octave_shift}"

    @staticmethod
    def generate_scale(root_note, pattern):
        return [TheoryEngine.get_note_from_interval(root_note, interval) for interval in pattern]

    @staticmethod
    def note_to_midi(note_name):
        """Converts C4 to 60"""
        try:
            if len(note_name) == 3:
                note = note_name[:2]
                octave = int(note_name[2])
            else:
                note = note_name[:1]
                octave = int(note_name[1])
            
            # C0 is 12. C-1 is 0. 
            # MIDI 60 is C4.
            # Index of C is 0.
            # 60 = (4 + 1) * 12 + 0
            
            idx = TheoryEngine.NOTES.index(note)
            return (octave + 1) * 12 + idx
        except:
            return 0

    @staticmethod
    def midi_to_note(midi_number):
        octave = (midi_number // 12) - 1
        idx = midi_number % 12
        return f"{TheoryEngine.NOTES[idx]}{octave}"

class VoicingLogic:
    @staticmethod
    def get_shell_voicing(chord_notes):
        # chord_notes is a list of note names [Root, 3rd, 5th, 7th]
        shell = []
        if len(chord_notes) > 1: shell.append(chord_notes[1]) # 3rd
        if len(chord_notes) > 3: shell.append(chord_notes[3]) # 7th
        return shell

    @staticmethod
    def get_herbie_hancock_voicing(root_note):
        # 0, 10, 16, 17, 22, 26
        intervals = [0, 10, 16, 17, 22, 26]
        return [TheoryEngine.get_note_from_interval(root_note, s) for s in intervals]

    @staticmethod
    def get_so_what_voicing(root_note):
        # 0, 5, 10, 15, 19
        intervals = [0, 5, 10, 15, 19]
        return [TheoryEngine.get_note_from_interval(root_note, s) for s in intervals]

    @staticmethod
    def get_kenny_barron_voicing(root_note):
        # 0, 7, 14, 17, 22
        intervals = [0, 7, 14, 17, 22]
        return [TheoryEngine.get_note_from_interval(root_note, s) for s in intervals]

class Calculators:
    @staticmethod
    def get_tritone_sub(root_note):
        return TheoryEngine.get_note_from_interval(root_note, 6)

    @staticmethod
    def get_altered_dominant(root_note, alt_five=None, alt_nine=None):
        # 1, 3, 5, b7
        intervals = [0, 4, 7, 10]
        
        if alt_five == '#':
            intervals[2] = 8 # #5
        
        if alt_nine == 'b':
            intervals.append(13) # b9
        else:
            intervals.append(14) # Natural 9
            
        return [TheoryEngine.get_note_from_interval(root_note, s) for s in intervals]
