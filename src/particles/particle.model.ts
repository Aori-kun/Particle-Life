export class Particle {
    private _x: number;
    private _y: number;
    private _z: number;
    private _vx:number;
    private _vy: number;
    private _vz:number;
    private _color:number;

    constructor(x: number, y: number, z: number, vx: number, vy: number, vz: number, color: number) {
        this._x = x;
        this._y = y;
        this._z = z;
        this._vx = vx;
        this._vy = vy;
        this._vz = vz;
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

    get z(): number {
        return this._z;
    }

    set z(value: number) {
        this._z = value;
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

    get vz(): number {
        return this._vz;
    }

    set vz(value: number) {
        this._vz = value;
    }

    get color(): number {
        return this._color;
    }

    set color(value: number) {
        this._color = value;
    }
}