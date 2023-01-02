import {
    Scene
} from "../Scene.js";
import {
    ShipView
} from "../ShipView.js";
import {
    ShotView
} from "../ShotView.js";
import {
    getRandomInteger,
    isPointOverElement
} from "../utils.js"
export class BotScene extends Scene {
    playerTurn = true;
    status = null;

    init() {
        this.status = document.querySelector(".battlefield-status");
    }

    start() {
        const {
            opponent
        } = this.game;

        document.querySelectorAll(".app-actions").forEach((element) => element.classList.add("hidden"));
        document.querySelector('[data-scene="computer"]').classList.remove("hidden");

        opponent.clear();
        opponent.randomize(ShipView);

        const giveupButton = document.querySelector(".giveup");
        const retryButton = document.querySelector(".retry");

        giveupButton.classList.remove("hidden");
        retryButton.classList.add("hidden");

        giveupButton.addEventListener("click", () => {
            this.game.start("prep");
        });

        retryButton.addEventListener("click", () => {
            this.game.start("prep");
        });
    }
    update() {
        const {
            mouse,
            player,
            opponent
        } = this.game;

        const isGameOver = opponent.loser || player.loser;
        const cells = opponent.cells.flat();
        cells.forEach(cell => cell.classList.remove("battlefield__cell-target"));

        if (isGameOver) {
            if (opponent.loser) {
                this.status.textContent = "You are win!🏆"
            } else {
                this.status.textContent = "You are lose!😞"
            }

            document.querySelector(".giveup").classList.add("hidden");
            document.querySelector(".retry").classList.remove("hidden");
            return;
        }

        if (isPointOverElement(mouse, opponent.field)) {
            const cell = cells.find(cell => isPointOverElement(mouse, cell))
            if (cell) {
                cell.classList.add("battlefield__cell-target");

                if (this.playerTurn && mouse.isLeftMouseClick && !mouse.isPrevLeftMouseClick) {
                    const x = parseInt(cell.dataset.x);
                    const y = parseInt(cell.dataset.y);

                    const shot = new ShotView(x, y);
                    const shooting = opponent.addShot(shot);

                    if (shooting) {
                        this.playerTurn = shot.state === "miss" ? false : true;
                    }
                }
            }
        }

        //bot turn
        if (!this.playerTurn) {
            const x = getRandomInteger(0, 9);
            const y = getRandomInteger(0, 9);

            const shot = new ShotView(x, y);
            const shooting = player.addShot(shot);

            if (shooting) {
                this.playerTurn = shot.state === "miss" ? true : false;
            }
        }

        if (this.playerTurn) {
            this.status.textContent = "Your turn";
        } else {
            this.status.textContent = "Bots turn";
        }

    }
}