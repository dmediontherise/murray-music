class SheetRenderer {
    constructor() {
        this.width = 300;
        this.height = 160;
        this.lineGap = 10;
        this.topLineY = 60; // F5
    }

    getDiatonicStep(noteName) {
        const letter = noteName.charAt(0);
        const octave = parseInt(noteName.slice(-1));
        const dIndices = { 'C': 0, 'D': 1, 'E': 2, 'F': 3, 'G': 4, 'A': 5, 'B': 6 };
        return (octave - 4) * 7 + dIndices[letter];
    }

    render(notes, animate = true) {
        // Animation Class
        const animClass = animate ? 'note-anim' : '';
        const style = `
            <style>
                .note-anim { animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; opacity: 0; transform-origin: center; }
                @keyframes popIn { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            </style>
        `;

        let svg = `<svg width="100%" height="100%" viewBox="0 0 ${this.width} ${this.height}" xmlns="http://www.w3.org/2000/svg">${style}`;
        
        // Staff Lines
        for (let i = 0; i < 5; i++) {
            let y = this.topLineY + (i * this.lineGap);
            svg += `<line x1="10" y1="${y}" x2="${this.width-10}" y2="${y}" stroke="#444" stroke-width="1" />`;
        }
        // Treble Clef (Simple Representation)
        svg += `<text x="20" y="${this.topLineY + 30}" font-family="serif" font-size="40" fill="#666">𝄞</text>`;

        const isChord = notes.length > 1 && notes.length <= 5;
        // Sort notes by pitch
        const sorted = [...notes].sort((a,b) => {
            const oa = parseInt(a.slice(-1)), ob = parseInt(b.slice(-1));
            return oa === ob ? a.charCodeAt(0) - b.charCodeAt(0) : oa - ob;
        });

        const startX = 80;
        const spacing = 35;

        sorted.forEach((note, i) => {
            const step = this.getDiatonicStep(note);
            const cy = (this.topLineY + 40) - (step - 2) * (this.lineGap / 2);
            const cx = isChord ? startX : startX + (i * spacing);
            const delay = i * 0.05; // Stagger animation

            // Group for animation
            svg += `<g class="${animClass}" style="animation-delay: ${delay}s">`;

            // Note Head
            svg += `<ellipse cx="${cx}" cy="${cy}" rx="6" ry="4" fill="#000000" />`;
            
            // Stem
            if (step < 6) svg += `<line x1="${cx+5}" y1="${cy}" x2="${cx+5}" y2="${cy-30}" stroke="#000000" stroke-width="1.5" />`;
            else svg += `<line x1="${cx-5}" y1="${cy}" x2="${cx-5}" y2="${cy+30}" stroke="#000000" stroke-width="1.5" />`;

            // Ledger Lines
            let s = step;
            while (s <= 0) { // Below E4
                if (s % 2 === 0) {
                    const ly = (this.topLineY + 40) - (s - 2) * (this.lineGap / 2);
                    svg += `<line x1="${cx-10}" y1="${ly}" x2="${cx+10}" y2="${ly}" stroke="#000000" stroke-width="1" />`;
                }
                s++;
            }
            s = step;
            while (s >= 12) { // Above F5
                if (s % 2 === 0) {
                    const ly = (this.topLineY + 40) - (s - 2) * (this.lineGap / 2);
                    svg += `<line x1="${cx-10}" y1="${ly}" x2="${cx+10}" y2="${ly}" stroke="#000000" stroke-width="1" />`;
                }
                s--;
            }
            
            // Accidentals
            if (note.includes('#')) svg += `<text x="${cx-16}" y="${cy+5}" font-size="14" fill="#000000">♯</text>`;
            else if (note.includes('b')) svg += `<text x="${cx-14}" y="${cy+5}" font-size="14" fill="#000000">♭</text>`;
            
            // Note Label (Optional, for clarity)
            const labelY = step < 6 ? cy + 20 : cy - 35;
            svg += `<text x="${cx}" y="${labelY}" font-family="sans-serif" font-size="10" fill="#000000" text-anchor="middle">${note}</text>`;
            
            svg += `</g>`;
        });

        svg += `</svg>`;
        return svg;
    }
}

class CircleRenderer {
    render() {
        // Simple Circle of 5ths SVG
        const keys = ['C','G','D','A','E','B','F#','Db','Ab','Eb','Bb','F'];
        const radius = 80;
        const cx = 150;
        const cy = 80;
        
        let svg = `<svg width="100%" height="100%" viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg">`;
        svg += `<circle cx="${cx}" cy="${cy}" r="${radius}" stroke="#333" stroke-width="2" fill="none" />`;
        
        keys.forEach((k, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const x = cx + Math.cos(angle) * (radius - 15);
            const y = cy + Math.sin(angle) * (radius - 15);
            svg += `<text x="${x}" y="${y+4}" font-family="sans-serif" font-size="12" fill="#fff" text-anchor="middle" font-weight="bold">${k}</text>`;
        });
        
        svg += `</svg>`;
        return svg;
    }
}

const sheet = new SheetRenderer();
const circle = new CircleRenderer();

window.Renderer = {
    render: (notes, type="SHEET") => {
        if (type === "CIRCLE") return circle.render();
        return sheet.render(notes);
    }
};