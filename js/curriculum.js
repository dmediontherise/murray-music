const Curriculum = {
    BEGINNER: [
        // Section 1: The Atoms (Intervals)
        "1.1 The Semitone", "1.2 The Whole Tone", "1.3 The Major 2nd", "1.4 The Minor 3rd",
        "1.5 The Major 3rd", "1.6 The Perfect 4th", "1.7 The Tritone", "1.8 The Perfect 5th",
        "1.9 The Minor 6th", "1.10 The Major 6th", "1.11 The Minor 7th", "1.12 The Major 7th",
        "1.13 The Octave",
        
        // Section 2: Scales (The Palette)
        "2.1 The Chromatic Scale", "2.2 The Major Scale", "2.3 Natural Minor", 
        "2.4 Harmonic Minor", "2.5 Melodic Minor", "2.6 Major Pentatonic", 
        "2.7 Minor Pentatonic", "2.8 The Blues Scale",

        // Section 3: Triads (Building Blocks)
        "3.1 Major Triads", "3.2 Minor Triads", "3.3 Diminished Triads", 
        "3.4 Augmented Triads", "3.5 Suspended 2nd", "3.6 Suspended 4th",

        // Section 4: Harmony Basics
        "4.1 I-IV-V Progression", "4.2 ii-V-I Progression", "4.3 1st Inversion", 
        "4.4 2nd Inversion", "4.5 Relative Keys"
    ],
    ADVANCED: [
        // Section 1: Extended Chords
        "1.1 Major 7th Chords", "1.2 Dominant 7th Chords", "1.3 Minor 7th Chords",
        "1.4 Half-Diminished 7th", "1.5 Fully Diminished 7th", "1.6 Adding the 9th",
        "1.7 11ths and 13ths",

        // Section 2: Functional Harmony
        "2.1 Tonic Function", "2.2 Dominant Function", "2.3 Subdominant Function",
        "2.4 Secondary Dominants", "2.5 Tritone Substitution", "2.6 Passing Diminished",

        // Section 3: Modes
        "3.1 Ionian (Major)", "3.2 Dorian (So What)", "3.3 Phrygian (Spanish)",
        "3.4 Lydian (Dreamy)", "3.5 Mixolydian (Rock)", "3.6 Aeolian (Minor)",
        "3.7 Locrian (Unstable)",

        // Section 4: Jazz & Modern
        "4.1 Shell Voicings", "4.2 Rootless Voicings", "4.3 Quartal Harmony",
        "4.4 Upper Structures", "4.5 Altered Dominants", "4.6 Whole Tone Scale",
        "4.7 Diminished Scale", "4.8 Bebop Enclosures", "4.9 Coltrane Changes"
    ],
    DESCRIPTIONS: {
        // --- BASIC ---
        "1.1 The Semitone": `<p>The smallest distance in Western music. Also known as a Half Step. It creates immediate tension. Think of the 'Jaws' theme.</p>`,
        "1.2 The Whole Tone": `<p>Two semitones make a Whole Tone. It feels like taking a confident step forward. The opening of 'Happy Birthday'.</p>`,
        "1.3 The Major 2nd": `<p>The interval of a Whole Step. It sounds open but slightly unfinished.</p>`,
        "1.4 The Minor 3rd": `<p>The heart of Sadness. This 3-semitone interval defines the Minor chord and sounds melancholic.</p>`,
        "1.5 The Major 3rd": `<p>The heart of Happiness. This 4-semitone interval defines the Major chord and sounds bright and stable.</p>`,
        "1.6 The Perfect 4th": `<p>A structural pillar. 5 semitones. Sounds like a call or announcement ('Here Comes the Bride').</p>`,
        "1.7 The Tritone": `<p>The 'Devil in Music'. 6 semitones. It splits the octave perfectly in half and is highly unstable.</p>`,
        "1.8 The Perfect 5th": `<p>The 'Power Chord'. 7 semitones. The most stable interval besides the octave. Rock and Roll's best friend.</p>`,
        "1.9 The Minor 6th": `<p>Romantic and tragic. 8 semitones. Used heavily in film scores for love themes.</p>`,
        "1.10 The Major 6th": `<p>Pastoral and restful. 9 semitones. Think 'My Bonnie Lies Over the Ocean'.</p>`,
        "1.11 The Minor 7th": `<p>Funky and unresolved. 10 semitones. The defining sound of a Dominant 7th chord.</p>`,
        "1.12 The Major 7th": `<p>Dreamy and nostalgic. 11 semitones. It yearns desperately to resolve up to the Octave.</p>`,
        "1.13 The Octave": `<p>Home. 12 semitones. The same note, just higher. A perfect circle.</p>`,
        
        "2.1 The Chromatic Scale": `<p>Every single note in order. No gaps. Sounds like a swarm of bees or a falling cartoon character.</p>`,
        "2.2 The Major Scale": `<p>The 'Ionian' mode. The standard Do-Re-Mi. Formula: W-W-H-W-W-W-H. Happy and Heroic.</p>`,
        "2.3 Natural Minor": `<p>The 'Aeolian' mode. The standard sad scale. Formula: W-H-W-W-H-W-W.</p>`,
        "2.4 Harmonic Minor": `<p>Natural Minor with a raised 7th. Creates an exotic 'Snake Charmer' gap between the 6th and 7th degrees.</p>`,
        "2.5 Melodic Minor": `<p>The 'Jazz Minor'. Natural minor with a raised 6th and 7th ascending. Smooth and sophisticated.</p>`,
        "2.6 Major Pentatonic": `<p>Five notes. No semitones. Pure, country, and folk sound. 'My Girl'.</p>`,
        "2.7 Minor Pentatonic": `<p>The Rock & Roll scale. Five notes. The basis for almost all guitar solos.</p>`,
        "2.8 The Blues Scale": `<p>Minor Pentatonic plus the 'Blue Note' (#4/b5). Gritty, soulful, and expressive.</p>`,
        
        "3.1 Major Triads": `<p>Root - 3rd - 5th. The basic building block of happy harmony.</p>`,
        "3.2 Minor Triads": `<p>Root - b3 - 5th. The basic building block of sad harmony.</p>`,
        "3.3 Diminished Triads": `<p>Root - b3 - b5. Tense and constricted. Found in horror movies.</p>`,
        "3.4 Augmented Triads": `<p>Root - 3 - #5. Expanded and dreamy. Feels like floating in space.</p>`,
        "3.5 Suspended 2nd": `<p>Root - 2 - 5. Open and airy. Replaces the 3rd with a 2nd.</p>`,
        "3.6 Suspended 4th": `<p>Root - 4 - 5. Anthem-like tension. Replaces the 3rd with a 4th.</p>`,
        
        // --- ADVANCED ---
        "1.1 Major 7th Chords": `<p>Root - 3 - 5 - 7. The sound of Jazz, Lo-Fi, and sophisticated Pop.</p>`,
        "1.2 Dominant 7th Chords": `<p>Root - 3 - 5 - b7. The engine of functional harmony. Wants to resolve to I.</p>`,
        "2.5 Tritone Substitution": `<p>Replacing a Dominant 7th with another Dom7 six semitones away. They share the same tritone!</p>`,
        "4.1 Shell Voicings": `<p>Playing only the Root, 3rd, and 7th (or just 3rd and 7th). The skeleton of the chord.</p>`,
        "4.3 Quartal Harmony": `<p>Stacking 4ths instead of 3rds. The 'So What' sound. Modern and ambiguous.</p>`
    },
    CHALLENGES: {
        // --- BASIC ---
        "1.1 The Semitone": [{type:"interval", notes:["C4","C#4"], instruction:"Play C to C#", context:"Jaws"}],
        "1.2 The Whole Tone": [{type:"interval", notes:["C4","D4"], instruction:"Play C to D", context:"Happy Birthday"}],
        "1.3 The Major 2nd": [{type:"interval", notes:["F3","G3"], instruction:"Play F to G", context:"Whole Step"}],
        "1.4 The Minor 3rd": [{type:"interval", notes:["A3","C4"], instruction:"Play A to C", context:"Sadness"}],
        "1.5 The Major 3rd": [{type:"interval", notes:["C4","E4"], instruction:"Play C to E", context:"Brightness"}],
        "1.6 The Perfect 4th": [{type:"interval", notes:["G3","C4"], instruction:"Play G to C", context:"Here Comes the Bride"}],
        "1.7 The Tritone": [{type:"interval", notes:["B3","F4"], instruction:"Play B to F", context:"The Simpsons"}],
        "1.8 The Perfect 5th": [{type:"interval", notes:["C4","G4"], instruction:"Play C to G", context:"Star Wars"}],
        "1.9 The Minor 6th": [{type:"interval", notes:["E4","C5"], instruction:"Play E to C", context:"Love Story"}],
        "1.10 The Major 6th": [{type:"interval", notes:["C4","A4"], instruction:"Play C to A", context:"My Bonnie"}],
        "1.11 The Minor 7th": [{type:"interval", notes:["G3","F4"], instruction:"Play G to F", context:"Dominant Interval"}],
        "1.12 The Major 7th": [{type:"interval", notes:["C4","B4"], instruction:"Play C to B", context:"Take On Me"}],
        "1.13 The Octave": [{type:"interval", notes:["C4","C5"], instruction:"Play C4 to C5", context:"Somewhere Over the Rainbow"}],
        
        "2.1 The Chromatic Scale": [{type:"sequence", notes:["C4","C#4","D4","D#4","E4"], instruction:"Play Chromatic Run", context:"Half Steps"}],
        "2.2 The Major Scale": [{type:"sequence", notes:["C4","D4","E4","F4","G4","A4","B4","C5"], instruction:"Play C Major", context:"Ionian"}],
        "2.3 Natural Minor": [{type:"sequence", notes:["A3","B3","C4","D4","E4","F4","G4","A4"], instruction:"Play A Minor", context:"Aeolian"}],
        "2.4 Harmonic Minor": [{type:"sequence", notes:["A3","B3","C4","D4","E4","F4","G#4","A4"], instruction:"Play A Harmonic Minor", context:"Raised 7th"}],
        "2.5 Melodic Minor": [{type:"sequence", notes:["C4","D4","Eb4","F4","G4","A4","B4","C5"], instruction:"Play C Melodic Minor", context:"Jazz Minor"}],
        
        "3.1 Major Triads": [{type:"triad", notes:["C4","E4","G4"], instruction:"Play C Major", context:"1-3-5"}],
        "3.2 Minor Triads": [{type:"triad", notes:["A3","C4","E4"], instruction:"Play A Minor", context:"1-b3-5"}],
        "3.3 Diminished Triads": [{type:"triad", notes:["B3","D4","F4"], instruction:"Play B Diminished", context:"1-b3-b5"}],
        "3.4 Augmented Triads": [{type:"triad", notes:["C4","E4","G#4"], instruction:"Play C Augmented", context:"1-3-#5"}],

        // --- ADVANCED ---
        "1.1 Major 7th Chords": [{type:"triad", notes:["C4","E4","G4","B4"], instruction:"Play C Maj7", context:"1-3-5-7"}],
        "1.2 Dominant 7th Chords": [
            {
                type: "chord-sequence",
                sequence: [
                    ["G3","B3","D4","F4"], 
                    ["C4","E4","G4","B4"]
                ],
                instruction: "Play G7 then Cmaj7",
                context: "V7 - I Resolution"
            },
            {type:"triad", notes:["G3","B3","D4","F4"], instruction:"Play G7", context:"1-3-5-b7"}
        ],
        "2.5 Tritone Substitution": [
            {type:"triad", notes:["G3","B3","D4","F4"], instruction:"Play G7", context:"Original"},
            {type:"triad", notes:["C#4","F4","G#4","B4"], instruction:"Play Db7", context:"Substitute"}
        ],
        "4.1 Shell Voicings": [{type:"interval", notes:["E4","B4"], instruction:"Play E-B (3rd & 7th of Cmaj7)", context:"Rootless Shell"}],
        "4.3 Quartal Harmony": [{type:"sequence", notes:["D4","G4","C5","F5"], instruction:"Play So What Voicing", context:"Stacked 4ths"}]
    }
};

// Auto-fill Descriptions for missing keys to save space/time while ensuring content exists
const genericDesc = "<p>Explore this concept on the staff. Listen closely to the interval relationships.</p>";
[...Curriculum.BEGINNER, ...Curriculum.ADVANCED].forEach(key => {
    if(!Curriculum.DESCRIPTIONS[key]) Curriculum.DESCRIPTIONS[key] = genericDesc;
    if(!Curriculum.CHALLENGES[key]) Curriculum.CHALLENGES[key] = [{
        type: "sequence", 
        notes: ["C4"], 
        instruction: "Explore " + key, 
        context: "Free play"
    }];
});

window.Curriculum = Curriculum;
