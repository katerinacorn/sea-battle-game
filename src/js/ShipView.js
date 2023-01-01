import {
    Ship
} from "./Ship.js";
import {
    isPointOverElement
} from "./utils.js"

export class ShipView extends Ship {
    div = null;
    startX = null;
    startY = null;

    constructor(size, direction, startX, startY) {
        super(size, direction);

        //!temp
        const div = document.createElement("div");
        div.classList.add("ship");

        this.startX = startX;
        this.startY = startY;
        this.div = div;

        this.setDirection(direction, true);
    }

    //force - kostyl
    setDirection(newDirection, force = false) {
        if (!force && this.direction === newDirection) {
            return false;
        }
        //style
        this.div.classList.remove(`ship-${this.direction}-${this.size}`);
        this.direction = newDirection;
        this.div.classList.add(`ship-${this.direction}-${this.size}`);
        return true;
    }

    changeDirection() {
        const changedDirection = this.direction === "row" ? "column" : "row";
        this.setDirection(changedDirection);
    }

    isUnder(point) {
        return isPointOverElement(point, this.div);

    }
}