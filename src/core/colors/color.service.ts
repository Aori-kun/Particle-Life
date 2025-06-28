export class ColorService {
    public static generateColor(): string {
        let r: number = this.random();
        let g: number = this.random();
        let b: number = this.random()
        return `rgb(${r}, ${g}, ${b})`;
    }

    private static random(min = 100, max = 255): number {
        return Math.floor( Math.random() * (max - min) + min);
    }
}