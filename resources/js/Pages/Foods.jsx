import { getAllFood } from "@/Api/Api";
import Loader from "@/Components/Loader";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { addToCart } from "@/Store/store";
import { Head } from "@inertiajs/react";
import { Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Foods({ auth }) {
    const [allFood, setAllFood] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleAddToCart = (category, id, product_name, price) => {
        dispatch(
            addToCart({
                category: category,
                id: id,
                name: product_name,
                price: price,
            })
        );
    };

    useEffect(() => {
        setLoading(true);
        getAllFood().then((res) => {
            if (res) {
                setAllFood(res.data.data);
                console.log(res.data);
            }
            setLoading(false);
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
                    <div className="bg-white dark:bg-transparent overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="text-gray-900 dark:text-gray-100">
                            {isLoading && <Loader />}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                                {allFood &&
                                    allFood.map((food) => {
                                        return (
                                            <div
                                                key={food.id}
                                                className="w-full flex flex-col justify-between text-sky-600/90 bg-white dark:bg-zinc-950/90 border-2 dark:border-zinc-700/90 my-3 mx-auto max-w-md rounded-lg overflow-hidden shadow-lg"
                                            >
                                                <img
                                                    className="foodImg"
                                                    src={`../Images/${food.image}`}
                                                    alt="food"
                                                />
                                                <div className="flex flex-col flex-1 justify-start">
                                                    <h1 className="text-center text-sky-400/90 mt-2 font-bold text-xl">
                                                        {food.product_name}
                                                    </h1>
                                                    <p className="text-center px-3">
                                                        {food.description}
                                                    </p>
                                                </div>
                                                <div className="flex items-center justify-between pt-4">
                                                    <p className="px-3">
                                                        {"IDR " + food.price}
                                                    </p>
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
