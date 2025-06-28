export class CanvasHelper {
    public initCanvas(canvas: HTMLCanvasElement): void {
        window.document.addEventListener('resize', (): void => {
            this.resizeCanvas(canvas);
        })
        this.resizeCanvas(canvas);
    }

    /* PRIVATE METHODS */
    private resizeCanvas(canvas: HTMLCanvasElement): void {
        const displayWidth: number  = canvas.clientWidth;
        const displayHeight: number = canvas.clientHeight;

        const needResize: boolean = canvas.width  !== displayWidth ||
            canvas.height !== displayHeight;

        if (needResize) {
            canvas.width  = displayWidth;
            canvas.height = displayHeight;
        }
    }
}