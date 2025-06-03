import {Particle} from "./particle.model.ts";
import {MathHelper} from "../helpers/math.helper.ts";

export class ParticleService {
    private readonly particles: Particle[] = [];
    private readonly _ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D, nbParticles: number) {
        this._ctx = ctx;

        const particles: Particle[] = [];

        for (let i: number = 0; i < nbParticles; i++) {
            particles.push(new Particle(MathHelper.getRandomInt((this._ctx.canvas.width / 2 - 500), (this._ctx.canvas.width / 2 + 500)),
                MathHelper.getRandomInt((this._ctx.canvas.height / 2 - 500), (this._ctx.canvas.height / 2 + 500)), 0, 0, "red"))
        }

        this.particles = particles;
    }

    public init(g: number): void {
        this.particles.forEach((a: Particle): void => {
            let fx = 0;
            let fy = 0;

            this.particles.forEach((b: Particle): void => {
                if (a === b) return;

                const dx: number = b.x - a.x;
                const dy: number = b.y - a.y;
                const d: number = Math.sqrt(dx * dx + dy * dy);

                if (d > 0) {
                    const force: number = g / d;
                    fx += force * dx;
                    fy += force * dy;
                }
            });

            a.vx += fx * .5;
            a.vy += fy * .5;
            a.x += a.vx;
            a.y += a.vy;
            if (a.x <= 0 || a.x >= (this._ctx.canvas.width)) a.vx *= -.75;
            if (a.y <= 0 || a.y >= this._ctx.canvas.height) a.vy *= -.75;
        });

        this.draw();
    }

    private draw(): void {
        this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);

        this.particles.forEach((particle: Particle): void => {
            this._ctx.beginPath();
            this._ctx.shadowColor = "white";
            this._ctx.shadowBlur = 15;
            this._ctx.fillStyle = "white";
            this._ctx.arc(particle.x, particle.y, 7, 0, 2 * Math.PI);
            this._ctx.fill();
        });
    }
}