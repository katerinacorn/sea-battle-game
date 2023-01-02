import {
    Shot
} from "./Shot.js";

export class ShotView extends Shot {
    div = null;
    constructor(x, y, state = "miss") {
        super(x, y, state);

        const div = document.createElement("div");
        div.classList.add("shot");
        this.div = div;

        this.setState(state, true);
    }

    setState(state, force = false) {
        if (!force && this.state === state) {
            return false;
        }

        this.state = state;
        this.div.classList.remove("shot-kill", "shot-hit", "shot-miss");
        this.div.textContent = "";

        if (this.state === "miss") {
            this.div.classList.add("shot-miss");
            this.div.textContent = "•";
        } else if (this.state === "hit") {
            this.div.classList.add("shot-hit");
        } else if (this.state === "kill") {
            this.div.classList.add("shot-hit");
            this.div.classList.add("shot-kill");
        }

        return true;
    }
}