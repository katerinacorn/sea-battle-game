console.log("utils")

export const getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomFrom = (...args) => {
    const index = Math.floor(Math.random() * args.length);
    return args[index];
};

export const isPointOverElement = (point, element) => {
    const {
        x,
        y
    } = point;

    const {
        left,
        top,
        width,
        height
    } = element.getBoundingClientRect();

    return left <= x && x <= left + width && top <= y && y <= top + height;
};