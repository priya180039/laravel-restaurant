import { useState } from "react";

const useCheckout = () => {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);

    const checkout = async () => {
        console.log("2");
        setLoading(true);
        setTimeout((resolve) => {
            try {
                console.log("3");
                setResponse({
                    type: "success",
                    message: `Checkout success, we will process your order!`,
                });
            } catch (error) {
                setResponse({
                    type: "error",
                    message: error,
                });
            } finally {
                setLoading(false);
            }
        }, 1500);
    };

    return { loading, response, checkout, setResponse };
};

export default useCheckout;
