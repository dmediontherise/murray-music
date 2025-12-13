import os
import sys
# Add parent directory to path so we can import murrays_cli
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from flask import Flask, render_template, request, jsonify, make_response
from murrays_cli.theory_engine import TheoryEngine
from murrays_cli.curriculum import Curriculum
from murrays_cli.sheet_music import SheetMusicGenerator
import random

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/curriculum')
def get_curriculum():
    return jsonify({
        "beginner": Curriculum.BEGINNER_PATH,
        "advanced": Curriculum.ADVANCED_PATH,
        "descriptions": Curriculum.DESCRIPTIONS
    })

@app.route('/api/analyze', methods=['POST'])
def analyze():
    data = request.json
    notes = data.get('notes', [])
    
    if not notes:
        return jsonify({"info": "No notes detected.", "root": "-", "intervals": [], "sorted_notes": []})

    # Sort notes by midi value
    sorted_notes = sorted(notes, key=lambda n: TheoryEngine.note_to_midi(n))
    root = sorted_notes[0]
    
    # Identify intervals relative to root
    intervals = []
    root_midi = TheoryEngine.note_to_midi(root)
    
    for n in sorted_notes:
        m = TheoryEngine.note_to_midi(n)
        semitones = m - root_midi
        int_name = "?"
        for k, v in TheoryEngine.INTERVALS.items():
            if v == semitones % 12: 
                int_name = k
                break
        intervals.append(f"{n} ({int_name})")

    return jsonify({
        "root": root,
        "intervals": intervals,
        "sorted_notes": sorted_notes
    })

@app.route('/api/generate-sheet', methods=['POST'])
def generate_sheet():
    data = request.json
    notes = data.get('notes', [])
    
    # Generate SVG String
    svg_data = SheetMusicGenerator.generate_svg(notes)
    
    response = make_response(svg_data)
    response.content_type = 'image/svg+xml'
    return response

@app.route('/api/challenge', methods=['POST'])
def get_challenge():
    data = request.json
    topic = data.get('topic', 'Major Triads')
    
    # CONSTRAINT: Generate roots only in Octave 3 or 4 so chords fit in C3-C6 range
    # Our piano is C3(48) to C6(84)
    # Roots can be C3 up to maybe G4? If we go too high, the 5th/7th will be off screen.
    # Safe range for roots: C3 (48) to F4 (65).
    
    roots_safe = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"]
    chosen_root_note = random.choice(roots_safe)
    chosen_octave = random.choice([3, 4])
    
    # If octave is 4, limit root note to F to prevent overflow
    if chosen_octave == 4 and roots_safe.index(chosen_root_note) > roots_safe.index("F"):
        chosen_octave = 3
        
    root = f"{chosen_root_note}{chosen_octave}"
    
    target_notes = []
    instruction = ""
    
    # Simple mapping for drill logic
    if "Major Triad" in topic:
        target_notes = TheoryEngine.generate_scale(root, TheoryEngine.TRIAD_FORMULAS['maj'])
        instruction = f"Play a {chosen_root_note} Major Triad"
    elif "Minor Triad" in topic:
        target_notes = TheoryEngine.generate_scale(root, TheoryEngine.TRIAD_FORMULAS['min'])
        instruction = f"Play a {chosen_root_note} Minor Triad"
    elif "Diminished" in topic and "Triad" in topic:
        target_notes = TheoryEngine.generate_scale(root, TheoryEngine.TRIAD_FORMULAS['dim'])
        instruction = f"Play a {chosen_root_note} Diminished Triad"
    elif "Major 7th" in topic:
        target_notes = TheoryEngine.generate_scale(root, TheoryEngine.TRIAD_FORMULAS['maj7'])
        instruction = f"Play a {chosen_root_note} Major 7th Chord"
    elif "Minor 7th" in topic:
        target_notes = TheoryEngine.generate_scale(root, TheoryEngine.TRIAD_FORMULAS['min7'])
        instruction = f"Play a {chosen_root_note} Minor 7th Chord"
    elif "Dominant 7th" in topic:
        target_notes = TheoryEngine.generate_scale(root, TheoryEngine.TRIAD_FORMULAS['dom7'])
        instruction = f"Play a {chosen_root_note} Dominant 7th Chord"
    elif "Intervals" in topic:
        # Random interval
        int_name, semitones = random.choice(list(TheoryEngine.INTERVALS.items()))
        n2 = TheoryEngine.get_note_from_interval(root, semitones)
        target_notes = [root, n2]
        instruction = f"Play the interval: {root[:-1]} to {int_name}"
    else:
        # Fallback
        target_notes = [root]
        instruction = f"Play the note {root}"

    # Generate SVG for the target
    svg_data = SheetMusicGenerator.generate_svg(target_notes)
    
    return jsonify({
        "instruction": instruction,
        "target_notes": target_notes,
        "svg": svg_data
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)