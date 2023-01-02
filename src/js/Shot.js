export class Shot {
    x = null;
    y = null;
    state = null;

    constructor(x, y, state = "miss") {
        this.x = x;
        this.y = y;
        this.state = state;
    }

    setState(state) {
        this.state = state;
    }
}