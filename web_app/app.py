import os
import sys
# Add parent directory to path so we can import murrays_cli
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from flask import Flask, render_template, request, jsonify, send_file
from murrays_cli.theory_engine import TheoryEngine
from murrays_cli.curriculum import Curriculum
from murrays_cli.sheet_music import SheetMusicGenerator

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
    notes = data.get('notes', []) # List of note names ["C4", "E4"]
    
    # Naive analysis: Root is lowest note
    if not notes:
        return jsonify({"info": "No notes detected."})

    # Sort notes by pitch? The input from Web MIDI might be time-ordered or random.
    # Let's trust the frontend or sort here.
    # Helper to sort by midi value
    sorted_notes = sorted(notes, key=lambda n: TheoryEngine.note_to_midi(n))
    root = sorted_notes[0]
    
    # Identify intervals relative to root
    intervals = []
    root_midi = TheoryEngine.note_to_midi(root)
    
    for n in sorted_notes:
        m = TheoryEngine.note_to_midi(n)
        semitones = m - root_midi
        # Find interval name
        int_name = "?"
        for k, v in TheoryEngine.INTERVALS.items():
            if v == semitones % 12: # Modulo for compound intervals?
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
    if not notes:
        return jsonify({"error": "No notes"}), 400
        
    filename = "temp_sheet.svg"
    filepath = os.path.join(os.path.dirname(__file__), filename)
    
    # Sort notes for cleaner sheet music
    sorted_notes = sorted(notes, key=lambda n: TheoryEngine.note_to_midi(n))
    
    SheetMusicGenerator.generate_svg(sorted_notes, filepath)
    
    return send_file(filepath, mimetype='image/svg+xml')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
