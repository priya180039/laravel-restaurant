import { getAllFood } from "@/Api/Api";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { addToCart } from "@/Store/store";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Foods({ auth }) {
    const [allFood, setAllFood] = useState([]);
    const dispatch = useDispatch();

    const handleAddToCart = (category, id, product_name, price) => {
        dispatch(
            addToCart({
                category: category,
                id: id,
                product_name: product_name,
                price: price,
            })
        );
    };

    useEffect(() => {
        getAllFood().then((res) => {
            if (res) {
                setAllFood(res.data.data);
                console.log(res.data);
            }
        });
    }, []);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Foods
                </h2>
            }
        >
            <Head title="Foods" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="grid grid-cols-4 gap-2">
                                {allFood &&
                                    allFood.map((food) => {
                                        return (
                                            <div
                                                key={food.id}
                                                className="w-11/12 flex flex-col justify-between text-gray-900 bg-white m-auto my-3 max-w-sm rounded-lg overflow-hidden shadow-lg"
                                            >
                                                <img
                                                    className="foodImg"
                                                    src={`../Images/${food.image}`}
                                                    alt="food"
                                                />
                                                <h1 className="text-center text-indigo-950/90 font-bold text-xl">
                                                    {food.product_name}
                                                </h1>
                                                <p className="text-center px-3">
                                                    {food.description}
                                                </p>
                                                <div className="flex items-center justify-between pt-4">
                                                    <p className="px-3">
                                                        {"IDR " + food.price}
                                                    </p>
                                                    {/* <Cart>
                                                        <Cart.Add> */}
                                                    <SecondaryButton
                                                        onClick={() =>
                                                            handleAddToCart(
                                                                "foodCart",
                                                                food.id,
                                                                food.product_name,
                                                                food.price
                                                            )
                                                        }
                                                        className="px-3"
                                                    >
                                                        Add to cart
                                                    </SecondaryButton>
                                                    {/* </Cart.Add>
                                                    </Cart> */}
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
