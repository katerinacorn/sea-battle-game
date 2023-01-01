import {
    getRandomFrom,
    getRandomInteger
} from "./utils.js";

export class Battlefield {
    ships = [];
    shots = [];

    //location ships on the field
    #matrix = null;
    #changed = true;

    get matrix() {
        if (!this.#changed) {
            this.#matrix;
        }

        const matrix = [];
        for (let y = 0; y < 10; y += 1) {
            const row = [];
            for (let x = 0; x < 10; x += 1) {
                const cell = {
                    x,
                    y,
                    ship: null,
                    empty: true,
                };

                row.push(cell);

            }
            matrix.push(row);
        }

        for (const ship of this.ships) {
            if (!ship.isPlaced) {
                continue;
            }

            const {
                x,
                y
            } = ship;
            const directionX = ship.direction === "row";
            const directionY = ship.direction === "column";
            for (let index = 0; index < ship.size; index += 1) {
                const curvedX = x + directionX * index;
                const curvedY = y + directionY * index;

                const cell = matrix[curvedY][curvedX];
                cell.ship = ship;
            }

            for (let y = ship.y - 1; y < ship.y + ship.size * directionY + directionX + 1; y += 1) {
                for (let x = ship.x - 1; x < ship.x + ship.size * directionX + directionY + 1; x += 1) {
                    if (this.isInField(x, y)) {
                        const cell = matrix[y][x];
                        cell.empty = false;
                    }
                }
            }
        }
        this.#matrix = matrix;
        this.#changed = false;
        return this.#matrix;
    }

    //+ needs refactoring
    isInField(x, y) {
        if (parseInt(x) !== x || isNaN(x) || x === Infinity || x === -Infinity) {
            return false;
        }

        if (parseInt(y) !== y || isNaN(y) || y === Infinity || y === -Infinity) {
            return false;
        }

        return 0 <= x && x < 10 && 0 <= y && y < 10;
    }

    addShip(ship, x, y) {
        if (this.ships.includes(ship)) {
            return false;
        }
        this.ships.push(ship);
        //add review ship location
        if (this.isInField(x, y)) {
            let isShipInTheField = true;
            const directionX = ship.direction === "row";
            const directionY = ship.direction === "column";
            //check if ship is in the field and in the empty cells
            for (let index = 0; index < ship.size; index += 1) {
                const curvedX = x + directionX * index;
                const curvedY = y + directionY * index;

                if (!this.isInField(curvedX, curvedY)) {
                    isShipInTheField = false;
                    break;
                }

                const cell = this.matrix[curvedY][curvedX];
                if (!cell.empty) {
                    isShipInTheField = false;
                    break;
                }
            }

            if (isShipInTheField) {
                Object.assign(ship, {
                    x,
                    y
                });
            }
        }
        this.#changed = true;
        return true;
    }

    removeShip(ship) {
        if (!this.ships.includes(ship)) {
            return false;
        }

        const index = this.ships.indexOf(ship);
        this.ships.splice(index, 1);
        ship.x = null;
        ship.y = null;
        this.#changed = true;
        return true;
    }

    removeAllShips() {
        const ships = this.ships.slice(); //copy of ships

        for (const ship of ships) {
            this.removeShip(ship);
        }

        return ships.length;
    }

    addShot() {

    }

    removeShot() {

    }

    removeAllShots() {
        const shots = this.shots.slice(); //copy of shots

        for (const shot of shots) {
            this.removeShot(shot);
        }

        return shots.length;
    }


    randomize(shipClass = Ship) {
        this.removeAllShips();
        for (let size = 4; size >= 1; size -= 1) {
            for (let number = 0; number < 5; number += 1) {
                const direction = getRandomFrom("row", "column");
                const ship = new shipClass(size, direction);

                while (!ship.isPlaced) {
                    const x = getRandomInteger(0, 9);
                    const y = getRandomInteger(0, 9);

                    this.removeShip(ship);
                    this.addShip(ship, x, y);
                }
            }

        }
    }
}