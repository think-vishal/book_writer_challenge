export class Dataservice {
    constructor() {
        this.baseUrl = process.env.REACT_APP_BASE_URL_BE
    }
    get(relativeUrl, config = {}) {
        try {
            return fetch(`${this.baseUrl}${relativeUrl}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...config
                }
            })
        } catch (err) {
            console.error(err)
        }
    }

    post(relativeUrl, data, config = {}) {
        try {
            return fetch(`${this.baseUrl}${relativeUrl}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...config
                },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.error(error)
        }
    }

    put(relativeUrl, data, config = {}) {
        try {
            return fetch(`${this.baseUrl}${relativeUrl}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...config
                },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.error(error)
        }
    }
    patch(relativeUrl, data, config = {}) {
        try {
            return fetch(`${this.baseUrl}${relativeUrl}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    ...config
                },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.error(error)
        }
    }
    delete(relativeUrl, config = {}) {
        try {
            return fetch(`${this.baseUrl}${relativeUrl}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    ...config
                }
            });
        } catch (error) {
            console.error(error)
        }
    }
}

export default Dataservice