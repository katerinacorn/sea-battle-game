export class Mouse {
    element = null;

    isMouseOver = false;
    isPrevMouseOver = false;

    x = null;
    y = null;

    prevX = null;
    prevY = null;

    isLeftMouseClick = false;
    isPrevLeftMouseClick = false;

    delta = 0;
    prevDelta = 0;



    constructor(element) {
        this.element = element;

        const updatePosition = (event) => {
            this.x = event.clientX;
            this.y = event.clientY;
            this.delta = 0;
            this.isMouseOver = true;
        };

        element.addEventListener("mousemove", event => {
            this.tick();
            updatePosition(event);
        });

        element.addEventListener("mouseenter", event => {
            this.tick();
            updatePosition(event);
        });

        element.addEventListener("mouseleave", event => {
            this.tick();
            updatePosition(event);
            this.isMouseOver = false;
        });

        element.addEventListener("mousedown", event => {
            this.tick();
            updatePosition(event);

            if (event.button === 0) {
                this.isLeftMouseClick = true;
            }
        });

        element.addEventListener("mouseup", event => {
            this.tick();
            updatePosition(event);

            if (event.button === 0) {
                this.isLeftMouseClick = false;
            }
        });

        element.addEventListener("wheel", event => {
            this.tick();

            this.x = event.clientX;
            this.y = event.clientY;
            this.isMouseOver = true;
            this.delta = event.deltaY > 0 ? 1 : -1; //deltaY scrolled pixel number 
        });

    }

    tick() {
        this.prevX = this.x;
        this.prevY = this.y;
        this.isPrevMouseOver = this.isMouseOver;
        this.isPrevLeftMouseClick = this.isLeftMouseClick;
        this.prevDelta = this.delta;
        this.delta = 0;
    }

}

console.log("Mouse")