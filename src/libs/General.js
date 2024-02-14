export class General {
    static getElipsisString = (string, length = 10) => {
        return string.length > length ? string.slice(0, length) + "..." : string
    }

    static setLocalStorage = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static getLocalStorage = (key) => {
        const value = localStorage.getItem(key)
        return JSON.parse(value)
    }

}

export default General