import {
    ShipView
} from "../ShipView.js";
import {
    Scene
} from "../Scene.js";

import {
    isPointOverElement
} from "../utils.js"

const shipsDatabase = [{
        size: 4,
        direction: "row",
        startX: 10,
        startY: 345
    },
    {
        size: 3,
        direction: "row",
        startX: 10,
        startY: 390
    },
    {
        size: 3,
        direction: "row",
        startX: 120,
        startY: 390
    }, {
        size: 2,
        direction: "row",
        startX: 10,
        startY: 435
    },
    {
        size: 2,
        direction: "row",
        startX: 88,
        startY: 435
    },
    {
        size: 2,
        direction: "row",
        startX: 167,
        startY: 435
    },
    {
        size: 1,
        direction: "row",
        startX: 10,
        startY: 480
    },
    {
        size: 1,
        direction: "row",
        startX: 55,
        startY: 480
    },
    {
        size: 1,
        direction: "row",
        startX: 100,
        startY: 480
    },
    {
        size: 1,
        direction: "row",
        startX: 145,
        startY: 480
    },
];
export class PrepScene extends Scene {
    draggedShip = null;
    draggedOffsetX = 0;
    draggedOffsetY = 0;

    init() {
        console.log('init: ');

        //create ships
        const {
            player
        } = this.game;

        for (const {
                size,
                direction,
                startX,
                startY
            } of shipsDatabase) {
            const ship = new ShipView(size, direction, startX, startY);
            player.addShip(ship);
        }
    }

    start() {
        const {
            player
        } = this.game;
        player.randomize(ShipView);

        for (let index = 0; index < 10; index += 1) {
            player.ships[index].startX = shipsDatabase[index].startX;
            player.ships[index].startY = shipsDatabase[index].startY;
        }
    }

    update() {
        console.log('update: ');
        const {
            player,
            mouse
        } = this.game;

        //drag&drop we want start pull
        if (!this.draggedShip && mouse.isLeftMouseClick && !mouse.isPrevLeftMouseClick) {
            const ship = player.ships.find(ship => ship.isUnder(mouse));

            if (ship) {
                const shipRectangle = ship.div.getBoundingClientRect();
                this.draggedShip = ship;
                this.draggedOffsetX = mouse.x - shipRectangle.left;
                this.draggedOffsetY = mouse.y - shipRectangle.top;
            }
        }

        if (mouse.isLeftMouseClick && this.draggedShip) {
            const {
                left,
                top
            } = player.root.getBoundingClientRect();
            this.draggedShip.div.style.left = `${mouse.x - left - this.draggedOffsetX}px`;
            this.draggedShip.div.style.top = `${mouse.y - top - this.draggedOffsetY}px`;
        }

        //drop
        if (!mouse.isLeftMouseClick && this.draggedShip) {
            const ship = this.draggedShip;
            this.draggedShip = null;

            const {
                left,
                top
            } = ship.div.getBoundingClientRect();
            const {
                width,
                height
            } = player.cells[0][0].getBoundingClientRect();
            const point = {
                x: left + width / 2,
                y: top + height / 2,
            };

            const cell = player.cells.flat().find((cell) => isPointOverElement(point, cell))
            console.log('cell: ', cell);

            if (cell) {
                const x = parseInt(cell.dataset.x);
                const y = parseInt(cell.dataset.y);

                player.removeShip(ship);
                player.addShip(ship, x, y);
            } else {
                player.removeShip(ship);
                player.addShip(ship);
            }
        }

        //rotate
        if (this.draggedShip && mouse.delta) {
            this.draggedShip.changeDirection();
        }
    }

    stop() {
        console.log('stop: ');

    }
}