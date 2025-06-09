import {Particle} from "./particle.model.ts";
import {NB_COLORS, NB_PARTICLES, PARTICLE_SIZE, VELOCITY} from "../config/config.ts";
import {ColorService} from "../colors/color.service.ts";
import {MassService} from "../mass/mass.service.ts";
import {PositionService} from "../postion/position.service.ts";
import {WeightService} from "../weight/weight.service.ts";

export class ParticleService {
    private readonly _particles: Particle[] = [];
    private readonly _forces: number[][] = [];
    private readonly _colors: string[] = [];
    private readonly _ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this._ctx = ctx;
        const particles: Particle[] = [];

        const nbParticlesPerColor: number = NB_PARTICLES / NB_COLORS;
        const colors: string[] = [];

        for (let i: number = 0; i < NB_COLORS; i++) {

            const color: string = ColorService.generateColor();
            const mass: number = MassService.generateMass();

            for (let j: number = 0; j < nbParticlesPerColor; j++) {
                const position: { x: number, y: number } = PositionService.generatePosition(this._ctx.canvas.width, this._ctx.canvas.height);
                particles.push(new Particle(position.x, position.y, mass, color));
            }

            colors.push(color);
        }

        this._colors = colors;
        this._forces = WeightService.generateWeight(colors);
        this._particles = particles;
    }

    public init(): void {
        this.applyForces();
        this.draw();
    }

    private applyForces(): void {
        for (const particle of this._particles) {
            let forceX: number = 0;
            let forceY: number = 0;

            const width: number = this._ctx.canvas.width;
            const height: number = this._ctx.canvas.height;
            const limit: number = 500;

            for (const otherParticle of this._particles) {
                if (particle === otherParticle) continue;

                let otherX: number = otherParticle.x;
                let otherY: number = otherParticle.y;

                if (particle.x > width - limit && otherX < limit) {
                    otherX += width;
                } else if (particle.x < limit && otherX > width - limit) {
                    otherX -= width;
                }

                if (particle.y > height - limit && otherY < limit) {
                    otherY += height;
                } else if (particle.y < limit && otherY > height - limit) {
                    otherY -= height;
                }

                const distanceX: number = otherX - particle.x;
                const distanceY: number = otherY - particle.y;
                const distance: number = Math.hypot(distanceX, distanceY);

                if (distance < limit) {
                    const g: number = this.getGravitationalForce(particle, otherParticle);
                    const m1: number = otherParticle.mass;
                    const m2: number = particle.mass;
                    let force: number = (g * m1 * m2) / (distance ** 2);

                    const scale: number = 8;
                    const collisionD: number = otherParticle.mass * scale + particle.mass * scale;

                    if (distance <= collisionD) {
                        force *= force < 0 ? 1 : -1;
                    }

                    forceX += (force * distanceX) / particle.mass;
                    forceY += (force * distanceY) / particle.mass;
                }
            }

            particle.vx += forceX;
            particle.vy += forceY;


            particle.vx *= VELOCITY;
            particle.vy *= VELOCITY;
        }

        for (const particle of this._particles) {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0) particle.x += this._ctx.canvas.width;
            if (particle.y < 0) particle.y += this._ctx.canvas.height;
            if (particle.x > this._ctx.canvas.width) particle.x -= this._ctx.canvas.width;
            if (particle.y > this._ctx.canvas.height) particle.y -= this._ctx.canvas.height;
        }
    }

    private getGravitationalForce(particle: Particle, otherParticle: Particle): number {
        const indexColorParticle: number = this._colors.indexOf(particle.color);
        const indexColorOtherParticle: number = this._colors.indexOf(otherParticle.color);
        return this._forces[indexColorParticle][indexColorOtherParticle];
    }

    private draw(): void {
        this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);

        for (const particle of this._particles) {
            this._ctx.beginPath();
            this._ctx.arc(particle.x, particle.y, PARTICLE_SIZE, 0, 2 * Math.PI);
            this._ctx.fillStyle = particle.color;
            this._ctx.fill();
        }
    }
}