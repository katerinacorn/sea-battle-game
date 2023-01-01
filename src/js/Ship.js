export class Ship {
    size = null;
    direction = null;
    isKilled = false;

    x = null;
    y = null;

    get isPlaced() {
        return this.x !== null && this.y !== null;
    }

    constructor(size, direction) {
        this.size = size;
        this.direction = direction;
    }
}