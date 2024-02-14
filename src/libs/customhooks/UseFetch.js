import AppDataservice from "../../services/AppDataservice";

const useFetch = () => {
    return async ({ url = "", type = "", data = [] }) => {
        let response = {
            loading: false,
            data: [],
            error: ""
        };

        try {
            let resp;
            switch (type) {
                case 'GET':
                    resp = await AppDataservice.get(url);
                    break;
                case 'POST':
                    resp = await AppDataservice.post(url, data);
                    break;
                case 'PUT':
                    resp = await AppDataservice.put(url, data);
                    break;
                case 'DELETE':
                    resp = await AppDataservice.delete(url);
                    break;
                case 'PATCH':
                    console.log('the data is',data)
                    resp = await AppDataservice.patch(url, data);
                    break;
                default:
                    resp = await AppDataservice.get(url);
            }

            const result = await resp.json();

            if (resp.ok) {
                response = {
                    loading: false,
                    data: result,
                    error: ""
                };
            } else {
                response = {
                    loading: false,
                    data: [],
                    error: result || "Something went wrong"
                };
            }
        } catch (error) {
            response = {
                loading: false,
                data: [],
                error: error?.message || "Something went wrong"
            };
        }

        return response;
    }
}

export default useFetch;
