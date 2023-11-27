import { getAllBeverages, getAllFood } from "@/Api/Api";
import Loader from "@/Components/Loader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { addToCart, removeFromCart, reset } from "@/Store/store";
import { Head } from "@inertiajs/react";
import useCheckout from "@/Hook/useCheckout";
import { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@/Components/Alert";
import { useAlertContext } from "@/Context/alertContext";

export default function Cart({ auth }) {
    const [allFood, setAllFood] = useState([]);
    const [allBeverages, setAllBeverages] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const { loading, response, setResponse, checkout } = useCheckout();
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const { onOpen } = useAlertContext();

    const handleAddToCart = (category, id, name, price) => {
        dispatch(
            addToCart({
                category: category,
                id: id,
                name: name,
                price: price,
            })
        );
    };
    const handleRemoveFromCart = (category, id) => {
        dispatch(removeFromCart({ category: category, id: id }));
    };
    const handleReset = () => {
        dispatch(reset());
    };

    useEffect(() => {
        setLoading(true);
        getAllFood().then((res) => {
            if (res) {
                setAllFood(res.data.data);
            }
            setLoading(false);
        });
        getAllBeverages().then((res) => {
            if (res) {
                setAllBeverages(res.data.data);
            }
            setLoading(false);
        });
    }, []);

    const filteredFoods = allFood
        .map((food) => {
            const exist = cart.foodCart.find((item) => item.id === food.id);
            if (exist) {
                return { ...food, quantity: exist.quantity };
            }
        })
        .filter(Boolean);

    const filteredBeverages = allBeverages
        .map((beverage) => {
            const exist = cart.beverageCart.find(
                (item) => item.id === beverage.id
            );
            if (exist) {
                return { ...beverage, quantity: exist.quantity };
            }
        })
        .filter(Boolean);

    useEffect(() => {
        let count = 0;
        if (!filteredFoods) {
            count += 0;
        } else {
            filteredFoods.forEach((food) => {
                count += Math.floor(food.quantity * food.price);
            });
        }
        if (!filteredBeverages) {
            count += 0;
        } else {
            filteredBeverages.forEach((drink) => {
                count += Math.floor(drink.quantity * drink.price);
            });
        }
        setTotal(count);
    }, [filteredFoods, filteredBeverages]);

    useEffect(() => {
        if (response) {
            onOpen(response.type, response.message);
            setResponse(null);
        }
    }, [response]);

    const handleSubmit = (e) => {
        e.preventDefault();
        checkout();
        setTimeout(() => {
            handleReset();
        }, 1500);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Cart
                </h2>
            }
        >
            <Head title="Cart" />

            <div className="py-6">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-transparent overflow-hidden shadow-sm sm:rounded-lg">
                        {isLoading && <Loader />}
                        <div className="hidden lg:flex xl:flex justify-between text-gray-900 dark:text-gray-100">
                            <div className="w-11/12 mx-auto sm:w-6/12 md:w-6/12 lg:w-6/12 xl:w-6/12 grid grid-cols-1 gap-0">
                                {!isLoading &&
                                    filteredFoods &&
                                    filteredFoods.map((food) => {
                                        return (
                                            <div
                                                key={food.id}
                                                className="w-full grid grid-cols-4 justify-between text-sky-600/90 bg-white dark:bg-zinc-950/90 border-2 dark:border-zinc-700/90 my-3 mx-auto rounded-lg overflow-hidden shadow-lg"
                                            >
                                                <div className="w-full overflow-hidden col-span-2">
                                                    <img
                                                        className="object-cover"
                                                        src={`../Images/${food.image}`}
                                                        alt="food"
                                                    />
                                                </div>
                                                <div className="flex flex-col justify-center col-span-2">
                                                    <div className="flex flex-col justify-center">
                                                        <h1 className="text-center text-sky-400/90 font-bold text-2xl">
                                                            {food.product_name}
                                                        </h1>
                                                        <p className="text-center text-lg px-3">
                                                            {food.price}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center justify-center text-lg pt-4">
                                                        <BiMinus
                                                            onClick={() =>
                                                                handleRemoveFromCart(
                                                                    "foodCart",
                                                                    food.id
                                                                )
                                                            }
                                                            className="shadow-3xl border-[1px] border-zinc-950/90 transform transition-all duration-200 ease-in-out hover:scale-150 hover:cursor-pointer"
                                                        />
                                                        <p className="px-3">
                                                            {food.quantity}
                                                        </p>
                                                        <BiPlus
                                                            onClick={() =>
                                                                handleAddToCart(
                                                                    "foodCart",
                                                                    food.id,
                                                                    food.product_name,
                                                                    food.price
                                                                )
                                                            }
                                                            className="shadow-3xl border-[1px] border-zinc-950/90 transform transition-all duration-200 ease-in-out hover:scale-150 hover:cursor-pointer"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                {!isLoading &&
                                    filteredBeverages &&
                                    filteredBeverages.map((beverage) => {
                                        return (
                                            <div
                                                key={beverage.id}
                                                className="w-full grid grid-cols-4 justify-between text-sky-600/90 bg-white dark:bg-zinc-950/90 border-2 dark:border-zinc-700/90 my-3 rounded-lg overflow-hidden shadow-lg"
                                            >
                                                <div className="w-full overflow-hidden col-span-2">
                                                    <img
                                                        className="object-cover"
                                                        src={`../Images/${beverage.image}`}
                                                        alt="beverage"
                                                    />
                                                </div>
                                                <div className="flex flex-col justify-center col-span-2">
                                                    <div className="flex flex-col justify-center">
                                                        <h1 className="text-center text-sky-400/90 font-bold text-2xl">
                                                            {
                                                                beverage.beverage_name
                                                            }
                                                        </h1>
                                                        <p className="text-center text-lg px-3">
                                                            {beverage.price}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center justify-center text-lg pt-4">
                                                        <BiMinus
                                                            onClick={() =>
                                                                handleRemoveFromCart(
                                                                    "beverageCart",
                                                                    beverage.id
                                                                )
                                                            }
                                                            className="shadow-3xl border-[1px] border-zinc-950/90 transform transition-all duration-200 ease-in-out hover:scale-150 hover:cursor-pointer"
                                                        />
                                                        <p className="px-3">
                                                            {beverage.quantity}
                                                        </p>
                                                        <BiPlus
                                                            onClick={() =>
                                                                handleAddToCart(
                                                                    "beverageCart",
                                                                    beverage.id,
                                                                    beverage.beverage_name,
                                                                    beverage.price
                                                                )
                                                            }
                                                            className="shadow-3xl border-[1px] border-zinc-950/90 transform transition-all duration-200 ease-in-out hover:scale-150 hover:cursor-pointer"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                {!isLoading &&
                                    filteredFoods.length < 1 &&
                                    filteredBeverages.length < 1 && (
                                        <div className="w-full text-sky-400/90 bg-white dark:bg-zinc-950/90 border-2 dark:border-zinc-700/90 my-3 p-2 rounded-lg overflow-hidden shadow-lg">
                                            <p className="text-2xl">
                                                You haven't add anything to cart
                                                yet.
                                            </p>
                                        </div>
                                    )}
                            </div>
                            {!isLoading && (
                                <div className="w-6/12 text-gray-900">
                                    <div className="grid grid-cols-2 gap-3 text-center my-3 ml-3 col-span-2">
                                        <div className="w-full p-2 text-lg text-sky-600/90 bg-white dark:bg-zinc-950/90 border-2 dark:border-zinc-700/90 rounded-lg">
                                            <h1 className="text-xl font-bold text-sky-400/90">
                                                Food Costs
                                            </h1>
                                            {cart.foodCart.map((food) => {
                                                return (
                                                    <div
                                                        key={food.id}
                                                        className="text-left"
                                                    >
                                                        <p className="underline">
                                                            {food.product_name}
                                                        </p>
                                                        <p>
                                                            {food.price +
                                                                " x " +
                                                                food.quantity +
                                                                " = " +
                                                                Math.floor(
                                                                    food.price *
                                                                        food.quantity
                                                                )}
                                                        </p>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="w-full p-2 text-lg text-sky-600/90 bg-white dark:bg-zinc-950/90 border-2 dark:border-zinc-700/90 rounded-lg">
                                            <h1 className="text-xl font-bold text-sky-400/90">
                                                Beverage Costs
                                            </h1>
                                            {cart.beverageCart.map(
                                                (beverage) => {
                                                    return (
                                                        <div
                                                            key={beverage.id}
                                                            className="text-left"
                                                        >
                                                            <p className="underline">
                                                                {
                                                                    beverage.beverage_name
                                                                }
                                                            </p>
                                                            <p>
                                                                {beverage.price +
                                                                    " x " +
                                                                    beverage.quantity +
                                                                    " = " +
                                                                    Math.floor(
                                                                        beverage.price *
                                                                            beverage.quantity
                                                                    )}
                                                            </p>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                    <div className="w-[calc(100%-1.5rem)] flex justify-between gap-2 my-3 mx-3 text-2xl text-sky-400/90 rounded-lg">
                                        <p>Total Price :</p>
                                        <p>{total}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="block lg:hidden xl:hidden text-gray-900 dark:text-gray-100">
                            <div className="w-full bg-transparent rounded-md mx-auto px-2 mt-6">
                                <div className="w-full flex overflow-auto mx-4">
                                    {!isLoading &&
                                        filteredFoods &&
                                        filteredFoods.map((food) => {
                                            return (
                                                <div
                                                    key={food.id}
                                                    className="text-sky-600/90 bg-white dark:bg-zinc-950/90 border-2 dark:border-zinc-700/90 my-3 mr-auto rounded-lg shadow-lg"
                                                >
                                                    <div className="w-full overflow-hidden">
                                                        <img
                                                            className="object-cover menu"
                                                            src={`../Images/${food.image}`}
                                                            alt="food"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col justify-center col-span-4">
                                                        <div className="flex flex-col justify-center">
                                                            <h1 className="text-center text-sky-400/90 font-bold text-2xl">
                                                                {
                                                                    food.product_name
                                                                }
                                                            </h1>
                                                            <p className="text-center text-lg px-3">
                                                                {food.price}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center justify-center text-lg pt-4">
                                                            <BiMinus
                                                                onClick={() =>
                                                                    handleRemoveFromCart(
                                                                        "foodCart",
                                                                        food.id
                                                                    )
                                                                }
                                                                className="shadow-3xl border-[1px] border-zinc-950/90 transform transition-all duration-200 ease-in-out hover:scale-150 hover:cursor-pointer"
                                                            />
                                                            <p className="px-3">
                                                                {food.quantity}
                                                            </p>
                                                            <BiPlus
                                                                onClick={() =>
                                                                    handleAddToCart(
                                                                        "foodCart",
                                                                        food.id,
                                                                        food.product_name,
                                                                        food.price
                                                                    )
                                                                }
                                                                className="shadow-3xl border-[1px] border-zinc-950/90 transform transition-all duration-200 ease-in-out hover:scale-150 hover:cursor-pointer"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                                <div className="w-full flex overflow-auto mx-4">
                                    {!isLoading &&
                                        filteredBeverages &&
                                        filteredBeverages.map((beverage) => {
                                            return (
                                                <div
                                                    key={beverage.id}
                                                    className="text-sky-600/90 bg-white dark:bg-zinc-950/90 border-2 dark:border-zinc-700/90 my-3 mr-auto rounded-lg shadow-lg"
                                                >
                                                    <div className="w-full overflow-hidden">
                                                        <img
                                                            className="object-cover menu"
                                                            src={`../Images/${beverage.image}`}
                                                            alt="beverage"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col justify-center col-span-4">
                                                        <div className="flex flex-col justify-center">
                                                            <h1 className="text-center text-sky-400/90 font-bold text-2xl">
                                                                {
                                                                    beverage.beverage_name
                                                                }
                                                            </h1>
                                                            <p className="text-center text-lg px-3">
                                                                {beverage.price}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center justify-center text-lg pt-4">
                                                            <BiMinus
                                                                onClick={() =>
                                                                    handleRemoveFromCart(
                                                                        "beverageCart",
                                                                        beverage.id
                                                                    )
                                                                }
                                                                className="shadow-3xl border-[1px] border-zinc-950/90 transform transition-all duration-200 ease-in-out hover:scale-150 hover:cursor-pointer"
                                                            />
                                                            <p className="px-3">
                                                                {
                                                                    beverage.quantity
                                                                }
                                                            </p>
                                                            <BiPlus
                                                                onClick={() =>
                                                                    handleAddToCart(
                                                                        "beverageCart",
                                                                        beverage.id,
                                                                        beverage.beverage_name,
                                                                        beverage.price
                                                                    )
                                                                }
                                                                className="shadow-3xl border-[1px] border-zinc-950/90 transform transition-all duration-200 ease-in-out hover:scale-150 hover:cursor-pointer"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                                {!isLoading &&
                                    filteredFoods.length < 1 &&
                                    filteredBeverages.length < 1 && (
                                        <div className="w-[calc(100%-2rem)] mx-4 text-sky-400/90 bg-white dark:bg-zinc-950/90 border-2 dark:border-zinc-700/90 my-3 p-3 rounded-lg overflow-hidden shadow-lg">
                                            <p className="text-xl font-bold sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl">
                                                You haven't add anything to cart
                                                yet.
                                            </p>
                                        </div>
                                    )}
                            </div>
                            {!isLoading && (
                                <div className="w-full px-3 mx-auto lg:w-6/12 xl:w-6/12 text-gray-900">
                                    <div className="grid grid-cols-2 gap-3 text-center my-3 mx-3 col-span-2">
                                        <div className="w-full p-2 text-lg text-sky-600/90 bg-white dark:bg-zinc-950/90 border-2 dark:border-zinc-700/90 rounded-lg">
                                            <h1 className="text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl text-sky-400/90">
                                                Food Costs
                                            </h1>
                                            {cart.foodCart.map((food) => {
                                                return (
                                                    <div
                                                        key={food.id}
                                                        className="text-left"
                                                    >
                                                        <p className="underline">
                                                            {food.product_name}
                                                        </p>
                                                        <p>
                                                            {food.price +
                                                                " x " +
                                                                food.quantity +
                                                                " = " +
                                                                Math.floor(
                                                                    food.price *
                                                                        food.quantity
                                                                )}
                                                        </p>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="w-full p-2 text-lg text-sky-600/90 bg-white dark:bg-zinc-950/90 border-2 dark:border-zinc-700/90 rounded-lg">
                                            <h1 className="text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl text-sky-400/90">
                                                Beverage Costs
                                            </h1>
                                            {cart.beverageCart.map(
                                                (beverage) => {
                                                    return (
                                                        <div
                                                            key={beverage.id}
                                                            className="text-left"
                                                        >
                                                            <p className="underline">
                                                                {
                                                                    beverage.beverage_name
                                                                }
                                                            </p>
                                                            <p>
                                                                {beverage.price +
                                                                    " x " +
                                                                    beverage.quantity +
                                                                    " = " +
                                                                    Math.floor(
                                                                        beverage.price *
                                                                            beverage.quantity
                                                                    )}
                                                            </p>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                    <div className="w-[calc(100%-1.5rem)] flex justify-between gap-2 my-3 mx-3 text-lg sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl text-sky-400/90 rounded-lg">
                                        <p>Total Price :</p>
                                        <p>{total}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        {}
                        {!isLoading &&
                            (filteredFoods.length > 0 ||
                                filteredBeverages.length > 0) && (
                                <div className="w-full mx-auto px-6 lg:px-0 xl:px-0">
                                    <button
                                        type="submit"
                                        onClick={handleSubmit}
                                        className={`w-full p-3 text-2xl text-center bg-zinc-800 hover:bg-zinc-700 text-sky-600/90 rounded-xl flex flex-col items-center justify-center ${
                                            loading &&
                                            "pointer-events-none hover:cursor-default"
                                        }`}
                                    >
                                        {loading ? "Loading..." : "Checkout"}
                                    </button>
                                </div>
                            )}
                    </div>
                </div>
            </div>
            <Alert />
        </AuthenticatedLayout>
    );
}
