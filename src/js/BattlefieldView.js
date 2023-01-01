import {
    Battlefield
} from "./Battlefield.js";
import {
    isPointOverElement
} from "./utils.js"

export class BattlefieldView extends Battlefield {
    root = null; //app
    field = null;
    dok = null;
    polygon = null; //shots

    cells = [];

    constructor() {
        super();
        const root = document.createElement("div");
        root.classList.add("battlefield");

        const field = document.createElement("table");
        field.classList.add("battlefield__field");

        const dok = document.createElement("div");
        dok.classList.add("battlefield__dok");

        const polygon = document.createElement("div");
        polygon.classList.add("battlefield__polygon");

        Object.assign(this, {
            root,
            field,
            dok,
            polygon
        });
        root.append(field, dok, polygon);

        //field table
        for (let y = 0; y < 10; y += 1) {
            const row = [];
            const tr = document.createElement("tr");

            tr.classList.add("battlefield__row");
            tr.dataset.y = y;

            for (let x = 0; x < 10; x += 1) {
                const td = document.createElement("td");

                td.classList.add("battlefield__cell");

                Object.assign(td.dataset, {
                    x,
                    y
                });

                tr.append(td);
                row.push(td);
            }

            field.append(tr);
            this.cells.push(row);
        }

        //add markers
        for (let x = 0; x < 10; x += 1) {
            const cell = this.cells[0][x];
            const letters = "ABCDEFGHIJ";
            const marker = document.createElement("div");
            marker.classList.add("marker", "marker-column");
            marker.textContent = letters[x];
            cell.append(marker);
        }

        for (let y = 0; y < 10; y += 1) {
            const cell = this.cells[y][0];
            const marker = document.createElement("div");
            marker.classList.add("marker", "marker-row");
            marker.textContent = y + 1;
            cell.append(marker);
        }
    }

    addShip(ship, x, y) {
        if (!super.addShip(ship, x, y)) {
            return false;
        }
        this.dok.append(ship.div);

        if (ship.isPlaced) {
            const cell = this.cells[y][x];
            const cellRectangle = cell.getBoundingClientRect();
            const rootRectangle = this.root.getBoundingClientRect();

            ship.div.style.left = `${cellRectangle.left - rootRectangle.left}px`;
            ship.div.style.top = `${cellRectangle.top - rootRectangle.top}px`;
        } else {
            ship.setDirection("row");
            ship.div.style.left = `${ship.startX}px`;
            ship.div.style.top = `${ship.startY}px`;
        }
        return true;
    }
    removeShip(ship) {
        if (!super.removeShip(ship)) {
            return false;
        }

        if ([...this.dok.children].includes(ship.div)) {
            ship.div.remove();
        }
        return true;
    }

    isUnder(point) {
        return isPointOverElement(point, this.root);
    }
}