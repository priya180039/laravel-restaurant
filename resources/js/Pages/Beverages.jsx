import { getAllBeverages } from "@/Api/Api";
import Loader from "@/Components/Loader";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { addToCart } from "@/Store/store";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Beverages({ auth }) {
    const [allBeverages, setAllBeverages] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleAddToCart = (category, id, beverage_name, price) => {
        dispatch(
            addToCart({
                category: category,
                id: id,
                name: beverage_name,
                price: price,
            })
        );
    };

    useEffect(() => {
        setLoading(true);
        getAllBeverages().then((res) => {
            if (res) {
                setAllBeverages(res.data.data);
                console.log(res.data);
            }
            setLoading(false);
        });
    }, []);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-200 leading-tight">
                    Beverages
                </h2>
            }
        >
            <Head title="Beverages" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-transparent overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="text-gray-900 dark:text-gray-100">
                            {isLoading && <Loader />}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                                {allBeverages &&
                                    allBeverages.map((beverage) => {
                                        return (
                                            <div
                                                key={beverage.id}
                                                className="w-full flex flex-col justify-between dark:text-sky-600/90 bg-white dark:bg-zinc-950/90 border-2 border-blue-400/80 dark:border-zinc-700/90 my-3 mx-auto max-w-md rounded-lg overflow-hidden shadow-lg"
                                            >
                                                <img
                                                    className="beverageImg"
                                                    src={`../Images/${beverage.image}`}
                                                    alt="beverage"
                                                />
                                                <h1 className="text-center dark:text-sky-400/90 font-bold text-xl">
                                                    {beverage.beverage_name}
                                                </h1>
                                                <p className="text-center px-3">
                                                    {beverage.description}
                                                </p>
                                                <div className="flex items-center justify-between pt-4">
                                                    <p className="px-3">
                                                        {"IDR " +
                                                            beverage.price}
                                                    </p>
                                                    {/* <Cart>
                                                        <Cart.Add> */}
                                                    <SecondaryButton
                                                        onClick={() =>
                                                            handleAddToCart(
                                                                "beverageCart",
                                                                beverage.id,
                                                                beverage.beverage_name,
                                                                beverage.price
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
