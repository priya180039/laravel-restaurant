import { getAllBeverages, getAllFood } from "@/Api/Api";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { addToCart, removeFromCart } from "@/Store/store";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

export default function Cart({ auth }) {
    const [allFood, setAllFood] = useState([]);
    const [allBeverages, setAllBeverages] = useState([]);
    const [total, setTotal] = useState(0);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

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

    useEffect(() => {
        getAllFood().then((res) => {
            if (res) {
                setAllFood(res.data.data);
            }
        });
        getAllBeverages().then((res) => {
            if (res) {
                setAllBeverages(res.data.data);
            }
        });
        console.log(cart);
    }, []);

    const filteredFoods = allFood
        .map((food) => {
            const exist = cart.foodCart.find((item) => item.id === food.id);
            if (exist) {
                return { ...food, quantity: exist.quantity };
            }
        })
        .filter(Boolean);
    console.log(filteredFoods);

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
    console.log(filteredBeverages);

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

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-transparent overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex justify-between text-gray-900 dark:text-gray-100">
                            <div className="w-6/12 grid grid-cols-1 gap-0">
                                {filteredFoods &&
                                    filteredFoods.map((food) => {
                                        return (
                                            <div
                                                key={food.id}
                                                className="w-full grid grid-cols-6 justify-between text-sky-600/90 bg-white dark:bg-zinc-950/90 border-2 dark:border-zinc-700/90 my-3 mx-auto rounded-lg overflow-hidden shadow-lg"
                                            >
                                                <div className="w-full overflow-hidden col-span-2">
                                                    <img
                                                        className="object-cover"
                                                        src={`../Images/${food.image}`}
                                                        alt="food"
                                                    />
                                                </div>
                                                <div className="flex flex-col justify-center col-span-4">
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
                                {filteredBeverages &&
                                    filteredBeverages.map((beverage) => {
                                        return (
                                            <div
                                                key={beverage.id}
                                                className="w-full grid grid-cols-6 justify-between text-sky-600/90 bg-white dark:bg-zinc-950/90 border-2 dark:border-zinc-700/90 my-3 rounded-lg overflow-hidden shadow-lg"
                                            >
                                                <div className="w-full overflow-hidden col-span-2">
                                                    <img
                                                        className="object-cover"
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
                                {filteredFoods.length < 1 &&
                                    filteredBeverages.length < 1 && (
                                        <div className="w-full text-sky-400/90 bg-white dark:bg-zinc-950/90 border-2 dark:border-zinc-700/90 my-3 p-2 rounded-lg overflow-hidden shadow-lg">
                                            <p className="text-2xl">
                                                You haven't add anything to cart
                                                yet.
                                            </p>
                                        </div>
                                    )}
                            </div>
                            <div className="w-6/12 text-gray-900">
                                <div className="grid grid-cols-2 gap-3 text-center my-3 mx-3 col-span-2">
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
                                        {console.log(cart.beverageCart)}
                                        {cart.beverageCart.map((beverage) => {
                                            return (
                                                <div
                                                    key={beverage.id}
                                                    className="text-left"
                                                >
                                                    <p className="underline">
                                                        {beverage.beverage_name}
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
                                        })}
                                    </div>
                                </div>
                                <div className="w-[calc(100%-1.5rem)] flex justify-between gap-2 my-3 mx-3 text-2xl text-sky-400/90 rounded-lg">
                                    <p>Total Price :</p>
                                    <p>{total}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
