import os

class SheetMusicGenerator:
    @staticmethod
    def generate_svg(notes, filename="output.svg"):
        """
        Generates a simple SVG of the notes on a treble staff with labels.
        notes: List of note names e.g. ["C4", "E4", "G4"]
        """
        width = 400
        height = 220
        
        # Staff Geometry
        line_gap = 12
        top_line_y = 70 # F5
        # Lines: F5 (70), D5 (82), B4 (94), G4 (106), E4 (118)
        
        def get_diatonic_step(note_name):
            # C4 -> 0, D4 -> 1 ... B4 -> 6, C5 -> 7
            letter = note_name[0]
            octave = int(note_name[-1])
            d_indices = {'C': 0, 'D': 1, 'E': 2, 'F': 3, 'G': 4, 'A': 5, 'B': 6}
            return (octave - 4) * 7 + d_indices[letter]

        # E4 (bottom line) is step 2 relative to C4.
        # Y of E4 = 118.
        # Formula: Y = 118 - (step - 2) * (line_gap / 2)
        
        svg_content = f'<svg width="{width}" height="{height}" xmlns="http://www.w3.org/2000/svg" style="background:transparent">'
        
        # Draw Staff Lines
        for i in range(5):
            y = top_line_y + (i * line_gap)
            svg_content += f'<line x1="20" y1="{y}" x2="{width-20}" y2="{y}" stroke="#999" stroke-width="2" />'
            
        is_chord = len(notes) <= 5
        start_x = 100
        spacing_x = 40
        
        # Sort notes to draw bottom-up for cleaner stacking
        sorted_notes = sorted(notes, key=lambda n: (int(n[-1]), n[0]))
        
        for i, note in enumerate(sorted_notes):
            step = get_diatonic_step(note)
            cy = 118 - (step - 2) * (line_gap / 2)
            cx = start_x + (0 if is_chord else i * spacing_x)
            
            # Note Head
            svg_content += f'<ellipse cx="{cx}" cy="{cy}" rx="{line_gap*0.65}" ry="{line_gap*0.45}" fill="#1d1d1f" />'
            
            # Stem
            if step < 6: # Up
                svg_content += f'<line x1="{cx+6}" y1="{cy}" x2="{cx+6}" y2="{cy-35}" stroke="#1d1d1f" stroke-width="2" />'
            else: # Down
                svg_content += f'<line x1="{cx-6}" y1="{cy}" x2="{cx-6}" y2="{cy+35}" stroke="#1d1d1f" stroke-width="2" />'
            
            # Ledger Lines (C4 and below, A5 and above)
            # C4 is step 0. Bottom line E4 is step 2.
            # A5 is step 12. Top line F5 is step 10.
            
            # Low Ledgers
            curr_step = step
            while curr_step <= 0:
                ly = 118 - (curr_step - 2) * (line_gap / 2)
                if curr_step % 2 == 0:
                    svg_content += f'<line x1="{cx-10}" y1="{ly}" x2="{cx+10}" y2="{ly}" stroke="#999" stroke-width="2" />'
                curr_step += 1
            
            # High Ledgers
            curr_step = step
            while curr_step >= 12:
                ly = 118 - (curr_step - 2) * (line_gap / 2)
                if curr_step % 2 == 0:
                     svg_content += f'<line x1="{cx-10}" y1="{ly}" x2="{cx+10}" y2="{ly}" stroke="#999" stroke-width="2" />'
                curr_step -= 1

            # LABEL (Note Name)
            # Position below the note (or chord bottom)
            # If chord, we might overlap. For simplicity in this drill tool, 
            # we offset X slightly or put it right under/above.
            
            label_y = cy + 25 if step < 6 else cy - 25
            svg_content += f'<text x="{cx}" y="{label_y}" font-family="sans-serif" font-size="10" fill="#0071e3" text-anchor="middle" font-weight="bold">{note}</text>'

        svg_content += '</svg>'
        return svg_content