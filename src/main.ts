import {CanvasHelper} from "./helpers/canvas.helper.ts";
import {ParticleService} from "./particles/particle.service.ts";

class Main {

    private readonly _particleService: ParticleService;

    constructor() {
        const canvas: HTMLCanvasElement | null = document.querySelector('canvas');
        const ctx: CanvasRenderingContext2D | null | undefined = canvas?.getContext('2d');

        if (!canvas) throw new Error("Canvas is not supported");
        if (!ctx) throw new Error('CanvasRenderingContext2D is not supported');

        const canvasHelper: CanvasHelper = new CanvasHelper();
        canvasHelper.initCanvas(canvas);

        this._particleService = new ParticleService(ctx,3);
        this.loop();
    }

    private loop(): void {
        this._particleService.init(1);

        window.requestAnimationFrame(() => this.loop())
    }
}

new Main();