export class ForceService {
    public static generateForce(): number {
        const min: number = -1;
        const max: number = 1;
        return Math.random() * (max - min) + min;
    }
}