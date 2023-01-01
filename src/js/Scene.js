export class Scene {
    name = null;
    game = null;

    constructor(name, game) {
        this.name = name;
        this.game = game;

        //or Object.assign(this, {name, game});
    }

    init() {}

    start() {}

    update() {}

    stop() {}
}