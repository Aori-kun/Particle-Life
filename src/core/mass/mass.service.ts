export class MassService {
    public static generateMass(): number {
        const scale: number = 0.5;
        const min: number = 3 * scale;
        const max: number = 7 * scale;
        return Math.random() * (max - min) + min;
    }
}
