export class Particle {
    private _x: number;
    private _y: number;
    private _vx:number;
    private _vy: number;
    private _color:string;

    constructor(x: number, y: number, vx: number, vy: number, color: string) {
        this._x = x;
        this._y = y;
        this._vx = vx;
        this._vy = vy;
        this._color = color;
    }

    /* GETTERS & SETTERS */
    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }

    get vx(): number {
        return this._vx;
    }

    set vx(value: number) {
        this._vx = value;
    }

    get vy(): number {
        return this._vy;
    }

    set vy(value: number) {
        this._vy = value;
    }

    get color(): string {
        return this._color;
    }

    set color(value: string) {
        this._color = value;
    }
}