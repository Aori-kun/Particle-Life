import {WeightService} from "../core/weight/weight.service.ts";
import {NB_COLORS} from "../core/config/config.ts";
import {ColorService} from "../core/colors/color.service.ts";
import {ParticleService} from "../core/particles/particle.service.ts";

export class Panel {
    public static colors: string[] = [];
    public static forces: number[][];
    public static displayBlur: boolean = false;
    public static erase: boolean = true;
    public static particleService: ParticleService | undefined = undefined;

    constructor() {
        this.init();
    }

    public init(): void {
        this.initColors();
        this.initForces();

        for (let i = 0; i < Panel.colors.length; i++) {
            document.documentElement.style.setProperty(`--color-${i + 1}`, Panel.colors[i]);
        }

        let index: number = 1;
        for (let i: number = 0; i < Panel.forces.length; i++) {
            for (let j: number = 0; j < Panel.forces[i].length; j++) {
                document.documentElement.style.setProperty(`--weight-${index}`, this.valueToColor(Panel.forces[i][j]));
                index++;
            }
        }

        this.generateTable();
        this.launchEventListener();
    }

    private initForces(): void {
        Panel.forces = WeightService.generateWeight(Panel.colors);
    }

    private initColors(): void {
        Panel.colors = [];
        for (let i: number = 0; i < NB_COLORS; i++) {
            Panel.colors.push(ColorService.generateColor());
        }
    }

    private generateTable(): void {
        const tableContainer: HTMLElement | null = document.getElementById('table-container');
        if (!tableContainer) return;

        const table: HTMLTableElement = document.createElement('table');

        const headerRow: HTMLTableRowElement = document.createElement('tr');

        headerRow.appendChild(document.createElement('th'));

        for (let i: number = 0; i < Panel.colors.length; i++) {
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
        for (let i: number = 0; i < Panel.forces.length; i++) {
            const row: HTMLTableRowElement = document.createElement('tr');

            const th: HTMLTableCellElement = document.createElement('th');
            const containerDiv: HTMLDivElement = document.createElement('div');
            containerDiv.className = 'container__indicator';

            const indicatorDiv: HTMLDivElement = document.createElement('div');
            indicatorDiv.className = `vertical__indicator indicator color-${i + 1}`;

            containerDiv.appendChild(indicatorDiv);
            th.appendChild(containerDiv);
            row.appendChild(th);

            for (let j: number = 0; j < Panel.forces[i].length; j++) {
                const td: HTMLTableCellElement = document.createElement('td');
                td.className = `weight__input weight-${cellIndex}`;

                td.style.backgroundColor = this.valueToColor(Panel.forces[i][j]);

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
        const weightInput: HTMLCollectionOf<Element> | null = document.getElementsByClassName("weight__input");

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

        for(const input of weightInput) input.addEventListener('click', (event: Event): void => {
            const el: HTMLTableCellElement = event.currentTarget as HTMLTableCellElement;
            const index: number = Number(el.className.match(/weight-(\d+)/)?.[1]);

            const rowIndex: number = Math.floor((index - 1) / 6);
            const colIndex: number = (index - 1) % 6;

            this.incrementWeight(rowIndex, colIndex);
        })
    }

    private valueToColor(value: number): string {
        const clamped: number = Math.max(-1, Math.min(1, value));

        const normalized: number = (clamped + 1) / 2;

        const red: number = Math.round(255 * (1 - normalized));
        const green: number = Math.round(255 * normalized);
        const blue = 0;

        return `rgb(${red}, ${green}, ${blue})`;
    }

    private incrementWeight(rowIndex: number, colIndex: number): void {
        const weight: number = Panel.forces[rowIndex][colIndex];
        Panel.forces[rowIndex][colIndex] = weight + 0.1;
        if(Panel.forces[rowIndex][colIndex] > 1) Panel.forces[rowIndex][colIndex] = -1;
        this.generateTable();
        this.launchEventListener()
    }
}
