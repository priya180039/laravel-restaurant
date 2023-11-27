import axios from "axios";

export const getAllFood = async () => {
    try {
        // const response = await axios.get(`http://localhost:8000/api/products`);
        const response = await axios.get(
            `https://larareact.domcloud.dev/api/products`
        );
        return response.data;
    } catch (err) {
        console.log(err.response);
    }
};

export const getAllBeverages = async () => {
    try {
        // const response = await axios.get(`http://localhost:8000/api/beverages`);
        const response = await axios.get(
            `https://larareact.domcloud.dev/api/beverages`
        );
        return response.data;
    } catch (err) {
        console.log(err.response);
    }
};
