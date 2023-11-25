import { getAllFood } from "@/Api/Api";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { addToCart, removeFromCart } from "@/Store/store";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

export default function Cart({ auth }) {
    const [allFood, setAllFood] = useState([]);
    const [total, setTotal] = useState(0);
    const cart = useSelector((state) => state.cart);
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
    const handleRemoveFromCart = (category, id) => {
        dispatch(removeFromCart({ category: category, id: id }));
    };

    useEffect(() => {
        getAllFood().then((res) => {
            if (res) {
                setAllFood(res.data.data);
                console.log(res.data);
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
    const filteredDrinks = [];
    console.log(filteredFoods);

    useEffect(() => {
        let count = 0;
        if (!filteredFoods) {
            count += 0;
        } else {
            filteredFoods.forEach((food) => {
                count += Math.floor(food.quantity * food.price);
            });
        }
        if (!filteredDrinks) {
            count += 0;
        } else {
            filteredDrinks.forEach((drink) => {
                count += Math.floor(drink.quantity * drink.price);
            });
        }
        setTotal(count);
    }, [filteredFoods, filteredDrinks]);

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
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex justify-between p-6 text-gray-900 dark:text-gray-100">
                            <div className="w-6/12 grid grid-cols-1 gap-2">
                                {filteredFoods &&
                                    filteredFoods.map((food) => {
                                        return (
                                            <div
                                                key={food.id}
                                                className="w-11/12 grid grid-cols-6 justify-between text-gray-900 bg-white my-3 mx-3 rounded-lg overflow-hidden shadow-lg"
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
                                                        <h1 className="text-center text-indigo-950/90 font-bold text-2xl">
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
                                                            className="shadow-3xl border-[1px] border-zinc-950/90 transform transition-all duration-200 ease-in-out hover:scale-110 hover:cursor-pointer"
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
                                                            className="shadow-3xl border-[1px] border-zinc-950/90 transform transition-all duration-200 ease-in-out hover:scale-110 hover:cursor-pointer"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                            <div className="w-6/12 text-gray-900">
                                <div className="grid grid-cols-2 gap-2 text-center my-3 mx-3 col-span-2">
                                    <div className="w-full p-2 text-lg bg-white rounded-lg">
                                        <h1 className="text-xl font-bold">
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
                                                    <p className="text-gray-600/90">
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
                                    <div className="w-full bg-white rounded-lg">
                                        Beverage Costs
                                    </div>
                                </div>
                                <div className="w-[calc(100%-1.5rem)] flex justify-between gap-2 my-3 mx-3 text-2xl text-gray-200 rounded-lg">
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
