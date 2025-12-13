import mido
import sys

# 1. Helper Function: Convert MIDI Number to Note Name
#    Midi 60 = Middle C (C4)
NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

def get_note_name(note_number):
    octave = (note_number // 12) - 1
    note_index = note_number % 12
    note_name = NOTES[note_index]
    return f"{note_name}{octave}"

# 2. Function: List Available Ports
def list_midi_ports():
    print("\n--- Scanning for MIDI Devices ---")
    inputs = mido.get_input_names()
    if not inputs:
        print("No MIDI devices found. Please plug in your keyboard.")
        return None
    
    print("Found the following devices:")
    for i, name in enumerate(inputs):
        print(f"[{i}] {name}")
    return inputs

# 3. Main Listener Function
def start_midi_listener():
    available_ports = list_midi_ports()
    
    if not available_ports:
        return

    # Auto-select the first device for simplicity, or ask user (optional)
    selected_port = available_ports[0] 
    print(f"\nConnected to: {selected_port}")
    print("Press keys on your piano! (Press Ctrl+C to stop)")
    print("-" * 40)

    try:
        # 'mido.open_input' opens the connection
        with mido.open_input(selected_port) as inport:
            for msg in inport:
                # We only care about 'note_on' (key press) and velocity > 0
                # Some keyboards send 'note_on' with velocity 0 for key release
                if msg.type == 'note_on' and msg.velocity > 0:
                    
                    readable_note = get_note_name(msg.note)
                    
                    # Formatting the output for the CLI
                    print(f"Key Pressed: {readable_note:<4} | "
                          f"MIDI No: {msg.note:<3} | "
                          f"Velocity: {msg.velocity}")
                    
                # Optional: Handle Note Off (Key Release)
                elif msg.type == 'note_off' or (msg.type == 'note_on' and msg.velocity == 0):
                    readable_note = get_note_name(msg.note)
                    # print(f"Key Released: {readable_note}") # Uncomment to see releases

    except KeyboardInterrupt:
        print("\nStopping MIDI Listener...")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    start_midi_listener()
