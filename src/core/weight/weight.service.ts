export class WeightService {
    public static generateWeight(colors: string[]): number[][] {
        const result: number[][] = [];
        const min: number = -1;
        const max: number = 1;

        for (let i: number = 0; i < colors.length; i++) {
            const weight: number[] = [];

            for (let j: number = 0; j < colors.length; j++) {
                weight.push(Math.random() * (max - min) + min);
            }
            result.push(weight);
        }

        return result;
    }
}
