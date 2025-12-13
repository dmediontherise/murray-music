import sys
import os
import time
import random
import msvcrt
from .theory_engine import TheoryEngine, VoicingLogic, Calculators
from .curriculum import Curriculum
from .visualizer import PianoVisualizer
from .midi_manager import MidiManager
from .sheet_music import SheetMusicGenerator

class MurraysCLI:
    def __init__(self):
        self.viz = PianoVisualizer()
        self.midi = MidiManager(callback=self.on_midi_event)
        self.current_notes = [] # Names
        self.running = True
        self.mode = "MENU" # MENU, TOPIC, DRILL, FREE
        self.current_topic = None
        self.feedback_msg = ""
        
    def clear(self):
        os.system('cls' if os.name == 'nt' else 'clear')

    def on_midi_event(self, notes):
        self.current_notes = notes
        self.viz.set_active_notes(notes)
        if self.mode in ["FREE", "DRILL", "TOPIC"]:
            self.refresh_screen()

    def refresh_screen(self):
        self.clear()
        print("MURRAY'S MUSIC THEORY v2.0")
        print("==========================")
        
        if self.mode == "MENU":
            self.print_menu()
        elif self.mode == "TOPIC":
            self.print_topic()
        elif self.mode == "FREE":
            print("\n[FREE PLAY MODE]")
            print("Play your MIDI keyboard. Press 'Q' to quit.")
            print("-" * 40)
            self.viz.render()
            print(f"\nDetected: {', '.join(self.current_notes)}")
            
            # Analyze Chord
            if len(self.current_notes) >= 3:
                # Basic analysis (naive)
                root = self.current_notes[0] # Naive assumption: Lowest note is root
                print(f"Potential Root: {root}")
                
        elif self.mode == "DRILL":
            self.print_drill()

        if self.feedback_msg:
            print(f"\n>> {self.feedback_msg}")

    def print_menu(self):
        print("\nSelect a Path:")
        print("1. Beginner Course")
        print("2. Advanced Course")
        print("3. Free Play (MIDI Test)")
        print("Q. Quit")

    def print_topic(self):
        print(f"\nTOPIC: {self.current_topic}")
        desc = Curriculum.DESCRIPTIONS.get(self.current_topic, "No description.")
        print(f"Info: {desc}")
        print("\nControls:")
        print("[D] Enter Drill Mode")
        print("[G] Generate Sheet Music")
        print("[B] Back to Menu")
        
        print("\nVisual Reference:")
        self.viz.render()
        print(f"\nActive Notes: {self.current_notes}")

    def print_drill(self):
        print(f"\nDRILL: {self.current_topic}")
        print(f"Task: {self.drill_target_desc}")
        
        # Check correctness
        # Logic: Convert target notes to set, compare with current input
        target_set = set(self.drill_target_notes)
        current_set = set(self.current_notes)
        
        # Determine if correct (ignoring octaves for basic theory check? Or specific?)
        # Let's require specific notes for now, or just note names.
        
        def strip_octave(n): return n[:-1]
        target_names = {strip_octave(n) for n in target_set}
        current_names = {strip_octave(n) for n in current_set}
        
        print(f"Target Notes: {', '.join(sorted(list(target_names)))}")
        print(f"Your Input:   {', '.join(sorted(list(current_names)))}")
        
        self.viz.render()
        
        if target_names == current_names and len(current_names) > 0:
            print("\n[SUCCESS!] Great job.")
            print("Press [N] for Next Challenge or [B] for Back.")
        else:
            print("\n... Waiting for correct notes ...")
            print("[N] Skip/Next  [B] Back")

    def run(self):
        # Start MIDI in background
        self.midi.start()
        
        try:
            while self.running:
                self.refresh_screen()
                
                # Input Loop (Blocking mostly, but we use msvcrt for polls if needed)
                # But here we can just block on getch for menu
                
                if self.mode == "FREE":
                    # Non-blocking check so screen updates via MIDI thread callback
                    # Wait a bit
                    time.sleep(0.1)
                    if msvcrt.kbhit():
                        key = msvcrt.getch().decode('utf-8').lower()
                        if key == 'q': self.mode = "MENU"
                
                elif self.mode == "DRILL":
                     time.sleep(0.1)
                     if msvcrt.kbhit():
                        key = msvcrt.getch().decode('utf-8').lower()
                        if key == 'b': self.mode = "TOPIC"
                        if key == 'n': self.setup_drill()

                elif self.mode == "TOPIC":
                    # We want to see MIDI input here too
                    time.sleep(0.1)
                    if msvcrt.kbhit():
                        key = msvcrt.getch().decode('utf-8').lower()
                        if key == 'b': self.mode = "MENU"
                        if key == 'd': 
                            self.setup_drill()
                            self.mode = "DRILL"
                        if key == 'g':
                            # Generate Sheet Music
                            fname = SheetMusicGenerator.generate_svg(self.current_notes if self.current_notes else ["C4", "E4", "G4"])
                            self.feedback_msg = f"Generated {fname}"

                elif self.mode == "MENU":
                    # Blocking is fine here until key press
                    key = msvcrt.getch().decode('utf-8').lower()
                    if key == 'q':
                        self.running = False
                    elif key == '1':
                        self.select_course(Curriculum.BEGINNER_PATH)
                    elif key == '2':
                        self.select_course(Curriculum.ADVANCED_PATH)
                    elif key == '3':
                        self.mode = "FREE"

        except KeyboardInterrupt:
            pass
        finally:
            self.midi.stop()
            print("\nGoodbye!")

    def select_course(self, path):
        self.clear()
        print("\nSelect Topic:")
        for i, topic in enumerate(path):
            print(f"{i+1}. {topic}")
        print("B. Back")
        
        while True:
            if msvcrt.kbhit():
                key = msvcrt.getch().decode('utf-8').lower()
                if key == 'b': return
                try:
                    idx = int(key) - 1
                    if 0 <= idx < len(path):
                        self.current_topic = path[idx]
                        self.mode = "TOPIC"
                        return
                except:
                    pass

    def setup_drill(self):
        # Generate a random challenge based on topic
        root = random.choice(["C", "G", "D", "A", "F", "Bb"]) + "4"
        self.drill_target_desc = f"Play a {self.current_topic} in {root}"
        
        # Logic to get notes
        # Simplify: Just mapping string to formula lookup?
        # Ideally we map "Major Triads" -> 'maj' key in TheoryEngine
        
        key_map = {
            "Major Triads": 'maj',
            "Minor Triads": 'min',
            "Diminished Triads": 'dim',
            "Major 7th Chords": 'maj7',
            "Minor 7th Chords": 'min7',
            "Dominant 7th Chords": 'dom7',
            "Half-Diminished 7th": 'm7b5',
            "Fully Diminished 7th": 'dim7'
        }
        
        formula_key = key_map.get(self.current_topic)
        if formula_key:
            pat = TheoryEngine.TRIAD_FORMULAS.get(formula_key)
            self.drill_target_notes = TheoryEngine.generate_scale(root, pat)
        else:
            self.drill_target_notes = [root] # Fallback
            
if __name__ == "__main__":
    app = MurraysCLI()
    app.run()
