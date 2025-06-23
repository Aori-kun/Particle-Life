export class Panel {
    private readonly _colors: string[];
    private readonly _forces: number[][];

    constructor(colors: string[], forces: number[][]) {
        this._colors = colors;
        this._forces = forces;
        this.init();
    }

    private init(): void {
        for (let i = 0; i < this._colors.length; i++) {
            document.documentElement.style.setProperty(`--color-${i + 1}`, this._colors[i]);
        }

        let index: number = 1;
        for (let i: number = 0; i < this._forces.length; i++) {
            for (let j: number = 0; j < this._forces[i].length; j++) {
                document.documentElement.style.setProperty(`--weight-${index}`, this.valueToColor(this._forces[i][j]));
                index++;
            }
        }

        this.generateTable();
    }

    private generateTable(): void {
        const tableContainer: HTMLElement | null = document.getElementById('table-container');
        if (!tableContainer) return;

        const table: HTMLTableElement = document.createElement('table');

        const headerRow: HTMLTableRowElement = document.createElement('tr');

        headerRow.appendChild(document.createElement('th'));

        for (let i: number = 0; i < this._colors.length; i++) {
            const th: HTMLTableCellElement = document.createElement('th');
            const containerDiv: HTMLDivElement = document.createElement('div');
            containerDiv.className = 'container__indicator';

            const indicatorDiv: HTMLDivElement = document.createElement('div');
            indicatorDiv.className = `horizontal__indicator indicator color-${i + 1}`;

            containerDiv.appendChild(indicatorDiv);
            th.appendChild(containerDiv);
            headerRow.appendChild(th);
        }

        table.appendChild(headerRow);

        let cellIndex: number = 1;
        for (let i: number = 0; i < this._forces.length; i++) {
            const row: HTMLTableRowElement = document.createElement('tr');

            const th: HTMLTableCellElement = document.createElement('th');
            const containerDiv: HTMLDivElement = document.createElement('div');
            containerDiv.className = 'container__indicator';

            const indicatorDiv: HTMLDivElement = document.createElement('div');
            indicatorDiv.className = `vertical__indicator indicator color-${i + 1}`;

            containerDiv.appendChild(indicatorDiv);
            th.appendChild(containerDiv);
            row.appendChild(th);

            for (let j: number = 0; j < this._forces[i].length; j++) {
                const td: HTMLTableCellElement = document.createElement('td');
                td.className = `weight-${cellIndex}`;

                td.style.backgroundColor = this.valueToColor(this._forces[i][j]);

                row.appendChild(td);
                cellIndex++;
            }

            table.appendChild(row);
        }

        tableContainer.innerHTML = '';
        tableContainer.appendChild(table);
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
