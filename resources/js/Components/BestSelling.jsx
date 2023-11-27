import React from "react";

const BestSelling = () => {
    const images = [
        { img: "fried_chicken.png", name: "Fried Chicken" },
        { img: "grilled_salmon.png", name: "Grilled Salmon" },
        { img: "dragon_juice.png", name: "Dragon Fruit Juice" },
    ];
    return (
        <div className="grid grid-cols-3 gap-6">
            {images.map((food, i) => {
                return (
                    <div key={i} className="">
                        <img
                            className="rounded-lg foodImg"
                            src={`../Images/${food.img}`}
                        />
                        <p className="text-xl text-center pt-2">{food.name}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default BestSelling;
