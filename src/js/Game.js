import {
    BattlefieldView
} from "./BattlefieldView.js";
import {
    Mouse
} from "./Mouse.js";

export class Game {
    mouse = null;
    player = null;
    opponent = null;

    scenes = {};
    activeScene = null;

    constructor(scenes = {}) {
        const mouse = new Mouse(document.body);
        const player = new BattlefieldView();
        const opponent = new BattlefieldView();

        Object.assign(this, {
            mouse,
            player,
            opponent
        });

        document.querySelector(".player").append(player.root);
        document.querySelector(".opponent").append(opponent.root);

        for (const [sceneName, sceneClass] of Object.entries(scenes)) {
            this.scenes[sceneName] = new sceneClass(sceneName, this);
        }

        for (const scene of Object.values(this.scenes)) {
            scene.init();
        }

        requestAnimationFrame(() => this.tick());
    }

    tick() {
        requestAnimationFrame(() => this.tick());

        if (this.activeScene) {
            this.activeScene.update();
        }

        this.mouse.tick();
    };

    start(sceneName) {
        if (this.activeScene && this.activeScene.name === sceneName) {
            return false;
        }

        if (!this.scenes.hasOwnProperty(sceneName)) {
            return false;
        }

        if (this.activeScene) {
            this.activeScene.stop();
        }

        const scene = this.scenes[sceneName];
        this.activeScene = scene;
        scene.start();

        return true;
    };
}