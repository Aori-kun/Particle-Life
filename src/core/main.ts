import {CanvasHelper} from "./helpers/canvas.helper.ts";
import {ParticleService} from "./particles/particle.service.ts";
import {Panel} from "../panel/panel.ts";

export class Main {

    private readonly _particleService: ParticleService;
    private static _main: Main | null = null;

    private constructor() {
        const canvas: HTMLCanvasElement | null = document.querySelector('canvas');
        const ctx: CanvasRenderingContext2D | null | undefined = canvas?.getContext('2d');

        if (!canvas) throw new Error("Canvas is not supported");
        if (!ctx) throw new Error('CanvasRenderingContext2D is not supported');

        const canvasHelper: CanvasHelper = new CanvasHelper();
        canvasHelper.initCanvas(canvas);

        new Panel();

        this._particleService = new ParticleService(ctx);

        Panel.particleService = this._particleService;
        this.loop();
    }

    private loop(): void {
        this._particleService.start();
        window.requestAnimationFrame(() => this.loop());
    }

    public static getInstance(): Main {
        if(!Main._main) Main._main = new Main();
        return Main._main;
    }
}

Main.getInstance();