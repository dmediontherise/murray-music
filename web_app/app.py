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
    topic = data.get('topic')
    challenge_index = data.get('challenge_index', 0)
    
    if topic not in Curriculum.CHALLENGES:
        return jsonify({"error": "Topic not found or no challenges defined."}), 404

    challenges_for_topic = Curriculum.CHALLENGES[topic]
    
    if challenge_index >= len(challenges_for_topic):
        return jsonify({"no_more_challenges": True, "message": "You've completed all challenges for this section! Time to move on."})

    challenge_data = challenges_for_topic[challenge_index]
    
    target_notes = []
    instruction = challenge_data["instruction"]
    context_info = challenge_data.get("context", "")
    
    if challenge_data["type"] == "triad":
        root = challenge_data["root"]
        formula_key = challenge_data["formula_key"]
        formula = TheoryEngine.TRIAD_FORMULAS.get(formula_key)
        if formula:
            target_notes = TheoryEngine.generate_scale(root, formula)
        else:
            target_notes = [root] # Fallback
    elif challenge_data["type"] == "interval":
        root = challenge_data["root"]
        semitones = challenge_data["semitones"]
        n2 = TheoryEngine.get_note_from_interval(root, semitones)
        target_notes = [root, n2]
    elif challenge_data["type"] == "sequence":
        target_notes = challenge_data["notes"] # Directly provide notes for sequences
    
    # Generate SVG for the target
    svg_data = SheetMusicGenerator.generate_svg(target_notes)
    
    return jsonify({
        "instruction": instruction,
        "context": context_info,
        "target_notes": target_notes,
        "svg": svg_data
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)