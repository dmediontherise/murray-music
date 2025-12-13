import os

class SheetMusicGenerator:
    @staticmethod
    def generate_svg(notes, filename="output.svg"):
        """
        Generates a simple SVG of the notes on a treble staff.
        notes: List of note names e.g. ["C4", "E4", "G4"]
        """
        # Dimensions
        width = 300
        height = 200
        
        # Staff Geometry
        line_gap = 10
        top_line_y = 60 # F5
        # Lines: F5, D5, B4, G4, E4
        # Y: 60, 70, 80, 90, 100
        
        # Helper: Calculate Y for a note
        # Center Line is B4 (y=80)
        # Each step (semitone isn't linear on staff) is line/space.
        # We need "diatonic step".
        
        def get_diatonic_step(note_name):
            # C4 -> 0
            # D4 -> 1
            # ...
            # B4 -> 6
            # C5 -> 7
            
            letter = note_name[0]
            octave = int(note_name[-1])
            
            d_indices = {'C': 0, 'D': 1, 'E': 2, 'F': 3, 'G': 4, 'A': 5, 'B': 6}
            
            # Reference C4
            # C4 is index 0 relative to C4.
            # B4 is index 6.
            
            # Step count
            step = (octave - 4) * 7 + d_indices[letter]
            return step

        # E4 is bottom line. C4 is -2 (Line below).
        # E4 diatonic step from C4 = 2.
        # B4 diatonic step from C4 = 6.
        # Y of B4 = 80.
        
        # Formula: Y = 80 - (step - 6) * (line_gap / 2)
        # Check B4: 80 - (6-6)*5 = 80. Correct.
        # Check C5: 7. 80 - (1)*5 = 75. (Space above B4 line). Correct.
        
        svg_content = f'<svg width="{width}" height="{height}" xmlns="http://www.w3.org/2000/svg" style="background:white">'
        
        # Draw Staff Lines
        for i in range(5):
            y = top_line_y + (i * line_gap)
            svg_content += f'<line x1="20" y1="{y}" x2="{width-20}" y2="{y}" stroke="black" stroke-width="2" />'
            
        # Draw Notes
        # If chord, stack them at same X. If scale, spread them.
        # Heuristic: If note names are close (chord) vs sequence?
        # The prompt implies "snippet of the scale/chord".
        # Let's just space them out if it looks like a scale, or stack if chord.
        # Actually, let's just stack them at X=100 for simplicity if < 5 notes, else spread.
        
        is_chord = len(notes) <= 5 # Assumption for now
        start_x = 100
        spacing_x = 30
        
        for i, note in enumerate(notes):
            step = get_diatonic_step(note)
            cy = 80 - (step - 6) * (line_gap / 2)
            
            cx = start_x + (0 if is_chord else i * spacing_x)
            
            # Note Head
            svg_content += f'<ellipse cx="{cx}" cy="{cy}" rx="{line_gap*0.6}" ry="{line_gap*0.4}" fill="black" />'
            
            # Stem (Simple: Up if < B4, Down if >= B4)
            if step < 6:
                svg_content += f'<line x1="{cx+5}" y1="{cy}" x2="{cx+5}" y2="{cy-35}" stroke="black" stroke-width="2" />'
            else:
                svg_content += f'<line x1="{cx-5}" y1="{cy}" x2="{cx-5}" y2="{cy+35}" stroke="black" stroke-width="2" />'
                
            # Ledger Lines
            # Top Line F5 (step 11 from C4). B4 is 6. F5 is B4 + 4 steps? 
            # B4(6), C5(7), D5(8), E5(9), F5(10). 
            # Top line is F5 (10). Wait.
            # E4 (2) is bottom line.
            # F5 (10) is top line.
            
            # High notes: A5 (12) needs line.
            # Low notes: C4 (0) needs line.
            
            # C4 (0) -> Line at 0. E4(2). Middle C is one line below bottom line.
            if step <= 0: # C4 or lower
                # Draw line at C4 position (step 0)
                # Y = 80 - (0 - 6)*5 = 110.
                # Bottom line E4 is Y=100. Gap is 10. Next line is 110. Correct.
                ly = 80 - (0 - 6) * 5
                svg_content += f'<line x1="{cx-10}" y1="{ly}" x2="{cx+10}" y2="{ly}" stroke="black" stroke-width="2" />'

        svg_content += '</svg>'
        
        with open(filename, "w") as f:
            f.write(svg_content)
        return os.path.abspath(filename)
