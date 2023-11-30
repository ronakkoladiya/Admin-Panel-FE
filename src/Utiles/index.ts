declare global {
    interface String {
        isString: () => boolean;
    }
    interface NumberConstructor {
        randomId: () => string;
    }
}

export const isString = (value : any) => typeof value === 'string';

export const randomId = function () {
    const hex = (value : number) => Math.floor(value).toString(16);
    return hex(Date.now() / 1000) + ' '.repeat(16).replace(/./g, () => hex(Math.random() * 16));
};

const updateProtoTypes = () => {

    Object.defineProperty(String.prototype, 'isString', {
        value: isString,
        writable: true,
        enumerable: false,
        configurable: true
    });

    Object.defineProperty(Number, 'randomId', {
        value: randomId,
        writable: true,
        enumerable: false,
        configurable: true
    });

};

export { updateProtoTypes };