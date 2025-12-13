import mido
import threading
import time
from .theory_engine import TheoryEngine

class MidiManager:
    def __init__(self, callback=None):
        self.callback = callback # Function(active_notes_list)
        self.active_notes = set() # MIDI numbers
        self.running = False
        self.thread = None
        self.input_port_name = None

    def list_ports(self):
        return mido.get_input_names()

    def start(self, port_name=None):
        if self.running: return
        
        ports = self.list_ports()
        if not ports:
            print("No MIDI ports found.")
            return
        
        if port_name:
            self.input_port_name = port_name
        else:
            self.input_port_name = ports[0]
            
        self.running = True
        self.thread = threading.Thread(target=self._listen)
        self.thread.daemon = True
        self.thread.start()
        print(f"MIDI Listening on {self.input_port_name}...")

    def stop(self):
        self.running = False
        if self.thread:
            self.thread.join(timeout=1.0)

    def _listen(self):
        try:
            with mido.open_input(self.input_port_name) as inport:
                while self.running:
                    # Poll instead of block forever so we can check self.running
                    msg = inport.poll()
                    if msg:
                        updated = False
                        if msg.type == 'note_on' and msg.velocity > 0:
                            self.active_notes.add(msg.note)
                            updated = True
                        elif msg.type == 'note_off' or (msg.type == 'note_on' and msg.velocity == 0):
                            if msg.note in self.active_notes:
                                self.active_notes.remove(msg.note)
                                updated = True
                        
                        if updated and self.callback:
                            # Convert MIDI # to Note Names
                            note_names = [TheoryEngine.midi_to_note(n) for n in self.active_notes]
                            self.callback(note_names)
                    else:
                        time.sleep(0.01)
        except Exception as e:
            print(f"MIDI Error: {e}")
            self.running = False
