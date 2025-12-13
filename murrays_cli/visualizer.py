import sys
import os

class PianoVisualizer:
    def __init__(self):
        # 4 Octaves starting at C3
        # Notes: C3, D3, E3, F3, G3, A3, B3 ...
        self.start_octave = 3
        self.num_octaves = 4
        self.active_notes = set() # Set of note names e.g. "C4", "F#3"

    def set_active_notes(self, notes):
        self.active_notes = set(notes)

    def clear(self):
        # ANSI clear screen
        os.system('cls' if os.name == 'nt' else 'clear')

    def render(self):
        # Top of black keys
        # We need to construct string lines.
        # Pattern per octave:
        #  | |#| |#| | |#| |#| |#| |
        #  |_| |_| | |_| |_| |_| |
        #   |   |   |   |   |   | 
        
        # White Keys: C D E F G A B (7 keys)
        # Black Keys positions (0-based index of white keys):
        # C-D (0), D-E (1), F-G (3), G-A (4), A-B (5)
        
        line1 = "   " # Top border
        line2 = "   " # Black keys top
        line3 = "   " # Black keys bottom
        line4 = "   " # White keys bottom
        
        # Building the string octave by octave
        for oct_idx in range(self.start_octave, self.start_octave + self.num_octaves):
            # Keys in this octave
            whites = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
            
            for w_idx, note_char in enumerate(whites):
                note_name = f"{note_char}{oct_idx}"
                
                # Check if THIS white key is active
                is_active = note_name in self.active_notes
                key_color = "\033[42m" if is_active else "" # Green bg
                reset = "\033[0m"
                
                # Check black key to the right
                # Black keys exist after C, D, F, G, A
                has_black = w_idx in [0, 1, 3, 4, 5]
                black_note_name = ""
                if w_idx == 0: black_note_name = f"C#{oct_idx}"
                elif w_idx == 1: black_note_name = f"D#{oct_idx}"
                elif w_idx == 3: black_note_name = f"F#{oct_idx}"
                elif w_idx == 4: black_note_name = f"G#{oct_idx}"
                elif w_idx == 5: black_note_name = f"A#{oct_idx}"
                
                is_black_active = black_note_name in self.active_notes
                blk_color = "\033[42m" if is_black_active else "\033[40m" # Green or Black
                
                # LINE 2 (Upper part of white key + Black key)
                # White key part: 3 chars. Black key: 2 chars shared?
                # Visual: | W | B | W |
                # Let's do: | W |Bk| W |
                
                # Actually, standard ASCII piano:
                # | |#| |
                # |_| |_|
                # | | | |
                
                # Representation:
                # White Key width: 4 chars "|   "
                # Black Key width: 2 chars, centered on line.
                
                # Let's simplify.
                # Top part:
                # If has black key to right: " | " + "##" (black)
                # If no black key (E, B): " |   "
                
                # Wait, black key sits ON the line.
                pass

        # Retrying simple row-based string construction
        # We will build just the "active" state list and print a static template with replacement?
        # No, dynamic is better.
        
        # Simple Representation
        # White Keys are the base.
        # W W W W W W W
        #  B B   B B B
        
        output = []
        
        # Top Row (Black Keys and spaces)
        row_black = ""
        row_white = ""
        row_labels = ""
        
        for oct_idx in range(self.start_octave, self.start_octave + self.num_octaves):
            # C
            c_act = f"C{oct_idx}" in self.active_notes
            cs_act = f"C#{oct_idx}" in self.active_notes
            d_act = f"D{oct_idx}" in self.active_notes
            ds_act = f"D#{oct_idx}" in self.active_notes
            e_act = f"E{oct_idx}" in self.active_notes
            f_act = f"F{oct_idx}" in self.active_notes
            fs_act = f"F#{oct_idx}" in self.active_notes
            g_act = f"G{oct_idx}" in self.active_notes
            gs_act = f"G#{oct_idx}" in self.active_notes
            a_act = f"A{oct_idx}" in self.active_notes
            as_act = f"A#{oct_idx}" in self.active_notes
            b_act = f"B{oct_idx}" in self.active_notes

            # Styles
            def st(active, is_black=False):
                if active: return "XX"
                return "||" if is_black else "  "

            # Row Black: "  ||  ||    ||  ||  ||  "
            # C# D#       F# G# A#
            # The gap for white keys is intricate.
            
            # Use specific chars
            # C top: " |"
            # C#   : "|||" (Active: XXX)
            
            # Let's treat it as slots.
            # 1 Octave Width = 7 * 4 = 28 chars roughly
            
            # C | C# | D | D# | E | F | F# | G | G# | A | A# | B |
            # W | B  | W | B  | W | W | B  | W | B  | W | B  | W
            
            # Visualization:
            #  ___________________________________________________________
            # |  |##|  |##|  |  |##|  |##|  |##|  |
            # |__|##|__|##|__|__|##|__|##|__|##|__|
            # |   |   |   |   |   |   |   |   |   |
            # |___|___|___|___|___|___|___|___|___|
            
            # Top Segment (Black keys)
            # C_part: " |"
            # C#_part: "|##"
            # D_left: "|  " 
            
            # It's hard to align perfectly in logic.
            # I will use a simple list of keys and print them linearly if graphics fail, 
            # but I'll try to build the string.
            
            # Active Colors
            G = "\033[92m" # Green Text
            R = "\033[0m"  # Reset
            
            def col(txt, active):
                return f"{G}{txt}{R}" if active else txt

            # Constructing an octave strip
            # Black Key Row:
            # | C |C#| D |D#| E | F |F#| G |G#| A |A#| B |
            # We look at the boundaries.
            
            # C_left: " "
            # C_right/C#_left: "|" + ("##" if C# else "  ") + "|"
            
            # Let's just print a list of notes for now if the ASCII is too complex to get right in one shot without trial/error.
            # But the requirement is "Visual Reference... Piano Keyboard".
            
            # Simplified ASCII Piano (Vertical?) No, Horizontal.
            
            # Let's generate a string of Keys like: [ C ][ C#][ D ]...
            pass

        # Fallback: Simple "Piano Strip"
        # [C3][C#3][D3]... highlighted
        
        line = ""
        for oct_idx in range(self.start_octave, self.start_octave + self.num_octaves):
            notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
            for n in notes:
                full = f"{n}{oct_idx}"
                isActive = full in self.active_notes
                
                label = f"{n:<2}" if len(n)==1 else n
                if isActive:
                    line += f"[\033[7m{label}\033[0m]" # Inverted colors
                else:
                    line += f"[{label}]"
        
        print("\nKEYBOARD:")
        print(line)
        print("-" * len(line))
