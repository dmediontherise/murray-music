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
    
    # Generate a random root
    roots = ["C", "G", "D", "A", "F", "Bb", "Eb"]
    root = random.choice(roots) + "4" # default octave 4
    
    target_notes = []
    instruction = ""
    
    # Simple mapping for drill logic
    # In a real app, this would be more robust in TheoryEngine
    if "Major Triad" in topic:
        target_notes = TheoryEngine.generate_scale(root, TheoryEngine.TRIAD_FORMULAS['maj'])
        instruction = f"Play a {root[:-1]} Major Triad"
    elif "Minor Triad" in topic:
        target_notes = TheoryEngine.generate_scale(root, TheoryEngine.TRIAD_FORMULAS['min'])
        instruction = f"Play a {root[:-1]} Minor Triad"
    elif "Diminished" in topic and "Triad" in topic:
        target_notes = TheoryEngine.generate_scale(root, TheoryEngine.TRIAD_FORMULAS['dim'])
        instruction = f"Play a {root[:-1]} Diminished Triad"
    elif "Major 7th" in topic:
        target_notes = TheoryEngine.generate_scale(root, TheoryEngine.TRIAD_FORMULAS['maj7'])
        instruction = f"Play a {root[:-1]} Major 7th Chord"
    elif "Minor 7th" in topic:
        target_notes = TheoryEngine.generate_scale(root, TheoryEngine.TRIAD_FORMULAS['min7'])
        instruction = f"Play a {root[:-1]} Minor 7th Chord"
    elif "Dominant 7th" in topic:
        target_notes = TheoryEngine.generate_scale(root, TheoryEngine.TRIAD_FORMULAS['dom7'])
        instruction = f"Play a {root[:-1]} Dominant 7th Chord"
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