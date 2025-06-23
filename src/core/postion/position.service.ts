export class PositionService {
    public static generatePosition(width: number, height: number): { x: number, y: number } {
        const size: number = width / 10;
        const midX: number = width / 2;
        const midY: number = height / 2;

        return {
            x: midX + (Math.random() * size) - (size / 2),
            y: midY + (Math.random() * size) - (size / 2)
        }
    }
}