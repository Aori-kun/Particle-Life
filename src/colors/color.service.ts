import {NB_COLOR} from "../config/config.ts";

export class ColorService {
    public static generateColorWeight(): number[][] {
        const colorWeight: number[][] = [];
        for(let i: number = 0; i < NB_COLOR; i++) {
            const row: number[] = [];
            for(let j: number = 0; j < NB_COLOR; j++) {
                row.push(Math.random() * 2 - 1);
            }
            colorWeight.push(row);
        }
        return colorWeight;
    }
}