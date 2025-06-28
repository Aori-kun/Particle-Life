import {WeightService} from "../core/weight/weight.service.ts";
import {NB_COLORS} from "../core/config/config.ts";
import {ColorService} from "../core/colors/color.service.ts";
import {ParticleService} from "../core/particles/particle.service.ts";

export class Panel {
    public static _colors: string[] = [];
    public static _forces: number[][];
    public static displayBlur: boolean = false;
    public static erase: boolean = true;
    public static particleService: ParticleService | undefined = undefined;

    constructor() {
        this.init();
    }

    public init(): void {
        this.initColors();
        this.initForces();

        for (let i = 0; i < Panel._colors.length; i++) {
            document.documentElement.style.setProperty(`--color-${i + 1}`, Panel._colors[i]);
        }

        let index: number = 1;
        for (let i: number = 0; i < Panel._forces.length; i++) {
            for (let j: number = 0; j < Panel._forces[i].length; j++) {
                document.documentElement.style.setProperty(`--weight-${index}`, this.valueToColor(Panel._forces[i][j]));
                index++;
            }
        }


        this.generateTable();
        this.launchEventListener();
    }

    private initForces(): void {
        Panel._forces = WeightService.generateWeight(Panel._colors);
    }

    private initColors(): void {
        Panel._colors = [];
        for (let i: number = 0; i < NB_COLORS; i++) {
            Panel._colors.push(ColorService.generateColor());
        }
    }

    private generateTable(): void {
        const tableContainer: HTMLElement | null = document.getElementById('table-container');
        if (!tableContainer) return;

        const table: HTMLTableElement = document.createElement('table');

        const headerRow: HTMLTableRowElement = document.createElement('tr');

        headerRow.appendChild(document.createElement('th'));

        for (let i: number = 0; i < Panel._colors.length; i++) {
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
        for (let i: number = 0; i < Panel._forces.length; i++) {
            const row: HTMLTableRowElement = document.createElement('tr');

            const th: HTMLTableCellElement = document.createElement('th');
            const containerDiv: HTMLDivElement = document.createElement('div');
            containerDiv.className = 'container__indicator';

            const indicatorDiv: HTMLDivElement = document.createElement('div');
            indicatorDiv.className = `vertical__indicator indicator color-${i + 1}`;

            containerDiv.appendChild(indicatorDiv);
            th.appendChild(containerDiv);
            row.appendChild(th);

            for (let j: number = 0; j < Panel._forces[i].length; j++) {
                const td: HTMLTableCellElement = document.createElement('td');
                td.className = `weight-${cellIndex}`;

                td.style.backgroundColor = this.valueToColor(Panel._forces[i][j]);

                row.appendChild(td);
                cellIndex++;
            }

            table.appendChild(row);
        }

        tableContainer.innerHTML = '';
        tableContainer.appendChild(table);
    }

    private launchEventListener(): void {

        const randomButton: Element | null = document.querySelector(".settings__panel__random button");
        const reloadButton: Element | null = document.querySelector(".settings__panel__header button");
        const blurCheckbox: HTMLInputElement | null = document.querySelector(".blur__input");
        const eraseCheckbox: HTMLInputElement | null = document.querySelector(".erase__input");

        if (!randomButton) throw new Error("Element not found");
        if (!blurCheckbox) throw new Error("Element not found");
        if (!eraseCheckbox) throw new Error("Element not found")
        if (!reloadButton) throw new Error("Element not found");

        eraseCheckbox.checked = true;

        randomButton.addEventListener('click', (): void => {
            this.initForces();
            this.generateTable();
        });
        blurCheckbox.addEventListener('input', (): void => {
            Panel.displayBlur = blurCheckbox.checked;
        });
        eraseCheckbox.addEventListener('input', () => {
            Panel.erase = eraseCheckbox.checked
        })
        reloadButton.addEventListener('click', (): void => {
            if (Panel.particleService) Panel.particleService.initParticles();
        });
    }

    private valueToColor(value: number): string {
        const clamped: number = Math.max(-1, Math.min(1, value));

        const normalized: number = (clamped + 1) / 2;

        const red: number = Math.round(255 * (1 - normalized));
        const green: number = Math.round(255 * normalized);
        const blue = 0;

        return `rgb(${red}, ${green}, ${blue})`;
    }
}
