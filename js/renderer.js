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

    render(notes) {
        let svg = `<svg width="100%" height="100%" viewBox="0 0 ${this.width} ${this.height}" xmlns="http://www.w3.org/2000/svg">`;
        
        // Staff
        for (let i = 0; i < 5; i++) {
            let y = this.topLineY + (i * this.lineGap);
            svg += `<line x1="10" y1="${y}" x2="${this.width-10}" y2="${y}" stroke="#999" stroke-width="1" />`;
        }
        svg += `<text x="20" y="${this.topLineY + 30}" font-family="serif" font-size="40" fill="#333">𝄞</text>`;

        const isChord = notes.length > 1 && notes.length <= 5;
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

            // Note
            svg += `<ellipse cx="${cx}" cy="${cy}" rx="6" ry="4" fill="#1d1d1f" />`;
            // Stem
            if (step < 6) svg += `<line x1="${cx+5}" y1="${cy}" x2="${cx+5}" y2="${cy-30}" stroke="#1d1d1f" stroke-width="1.5" />`;
            else svg += `<line x1="${cx-5}" y1="${cy}" x2="${cx-5}" y2="${cy+30}" stroke="#1d1d1f" stroke-width="1.5" />`;

            // Ledgers
            let s = step;
            while (s <= 0) {
                if (s % 2 === 0) {
                    const ly = (this.topLineY + 40) - (s - 2) * (this.lineGap / 2);
                    svg += `<line x1="${cx-10}" y1="${ly}" x2="${cx+10}" y2="${ly}" stroke="#999" stroke-width="1" />`;
                }
                s++;
            }
            s = step;
            while (s >= 12) {
                if (s % 2 === 0) {
                    const ly = (this.topLineY + 40) - (s - 2) * (this.lineGap / 2);
                    svg += `<line x1="${cx-10}" y1="${ly}" x2="${cx+10}" y2="${ly}" stroke="#999" stroke-width="1" />`;
                }
                s--;
            }
            
            // Accidentals
            if (note.includes('#')) svg += `<text x="${cx-15}" y="${cy+5}" font-size="14" fill="#333">♯</text>`;
            else if (note.includes('b')) svg += `<text x="${cx-12}" y="${cy+5}" font-size="14" fill="#333">♭</text>`;
            
            // Label
            const labelY = step < 6 ? cy + 20 : cy - 35;
            svg += `<text x="${cx}" y="${labelY}" font-family="sans-serif" font-size="10" fill="#0071e3" text-anchor="middle" font-weight="bold">${note}</text>`;
        });

        svg += `</svg>`;
        return svg;
    }
}
window.Renderer = new SheetRenderer();
