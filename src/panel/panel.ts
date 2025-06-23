export class Panel {
    private readonly _colors: string[];
    private readonly _forces: number[][];

    constructor(colors: string[], forces: number[][]) {
        this._colors = colors;
        this._forces = forces;
        this.init();
    }

    private init(): void {
        document.documentElement.style.setProperty('--color-1', this._colors[0]);
        document.documentElement.style.setProperty('--color-2', this._colors[1]);
        document.documentElement.style.setProperty('--color-3', this._colors[2]);
        document.documentElement.style.setProperty('--color-4', this._colors[3]);
        document.documentElement.style.setProperty('--color-5', this._colors[4]);
        document.documentElement.style.setProperty('--color-6', this._colors[5]);

        let index: number = 1;

        for (let i: number = 0; i < this._forces.length; i++) {
            for (let j: number = 0; j < this._forces[i].length; j++) {
                document.documentElement.style.setProperty(`--weight-${index}`, this.valueToColor(this._forces[i][j]));
                index++;
            }
        }
    }

    private valueToColor(value: number): string {
        const clamped = Math.max(-1, Math.min(1, value));

        const normalized = (clamped + 1) / 2;

        const red = Math.round(255 * (1 - normalized));
        const green = Math.round(255 * normalized);
        const blue = 0;

        return `rgb(${red}, ${green}, ${blue})`;
    }

}