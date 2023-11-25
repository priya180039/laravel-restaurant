import axios from "axios";

export const getAllFood = async () => {
    try {
        const response = await axios.get(`http://localhost:8000/api/products`);
        return response.data;
    } catch (err) {
        console.log(err.response);
    }
};
