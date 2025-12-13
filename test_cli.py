from murrays_cli.theory_engine import TheoryEngine
from murrays_cli.visualizer import PianoVisualizer
from murrays_cli.sheet_music import SheetMusicGenerator

print("Testing Theory Engine...")
scale = TheoryEngine.generate_scale("C4", TheoryEngine.MODES['Ionian'])
print(f"C Major Scale: {scale}")

print("\nTesting Visualizer (Static)...")
viz = PianoVisualizer()
viz.set_active_notes(scale)
viz.render()

print("\nTesting Sheet Music Generation...")
try:
    path = SheetMusicGenerator.generate_svg(scale, "test_output.svg")
    print(f"SVG generated at: {path}")
except Exception as e:
    print(f"SVG Error: {e}")

print("\nImport Success.")

