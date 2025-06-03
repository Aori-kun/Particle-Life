import {Particle} from "./particle.model.ts";
import {
    BETA,
    DELTA_TIME,
    DISTANCE_MAX,
    FORCE_FACTOR,
    FRICTION_FACTOR,
    NB_COLOR,
    NB_PARTICLES
} from "../config/config.ts";
import {ColorService} from "../colors/color.service.ts";

export class ParticleService {
    private readonly _particles: Particle[] = [];
    private readonly _ctx: CanvasRenderingContext2D;
    private readonly _colorWeights: number[][];

    constructor(ctx: CanvasRenderingContext2D) {
        this._ctx = ctx;
        this._colorWeights = ColorService.generateColorWeight();

        const particles: Particle[] = [];

        for (let i: number = 0; i < NB_PARTICLES; i++) {
            particles.push(new Particle(
                Math.random(),
                Math.random(),
                0,
                0,
                Math.floor(Math.random() * NB_COLOR)
            ))
        }

        this._particles = particles;
    }

    public init(): void {
        this._particles.forEach((particle: Particle): void => {
            let totalForceX: number = 0;
            let totalForceY: number = 0;

            this._particles.forEach((otherParticle: Particle): void => {
                if (particle === otherParticle) return;
                const distanceX: number = otherParticle.x - particle.x;
                const distanceY: number = otherParticle.y - particle.y;

                const distance: number = Math.hypot(distanceX, distanceY);

                if (distance > 0 && distance < DISTANCE_MAX) {
                    const force: number = this.calculateForce(distance / DISTANCE_MAX, this._colorWeights[particle.color][otherParticle.color]);
                    totalForceX += distanceX / distance * force;
                    totalForceY += distanceY / distance * force;
                }
            })

            totalForceX *= DISTANCE_MAX * FORCE_FACTOR;
            totalForceY *= DISTANCE_MAX * FORCE_FACTOR;

            particle.vx *= FRICTION_FACTOR;
            particle.vy *= FRICTION_FACTOR;

            particle.vx += totalForceX * DELTA_TIME;
            particle.vy += totalForceY * DELTA_TIME;
        })

        this._particles.forEach((particle: Particle): void => {
            particle.x += particle.vx * DELTA_TIME;
            particle.y += particle.vy * DELTA_TIME;
        })

        this.draw();
    }

    private draw(): void {
        this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);

        this._particles.forEach((particle: Particle): void => {
            const screenX: number = particle.x * this._ctx.canvas.width;
            const screenY: number = particle.y * this._ctx.canvas.height;

            this._ctx.beginPath();
            this._ctx.arc(screenX, screenY, 2, 0, 2 * Math.PI);
            this._ctx.fillStyle = `hsl(${360 * (particle.color / NB_COLOR)}, 100%,50%)`;
            this._ctx.fill();
        });
    }

    private calculateForce(distance: number, acceleration: number): number {
        if (distance < BETA) {
            return distance / BETA - 1;
        } else if (BETA < distance && distance < 1) {
            return acceleration * (1 - Math.abs(2 * distance - 1 - BETA) / (1 - BETA));
        }
        return 0;
    }
}