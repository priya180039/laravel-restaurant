import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Jumbotron = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const images = [
        "pizza_cheesy.png",
        "pancake.png",
        "burger_monster.png",
        "spaghetti.png",
        "mango_juice.png",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) =>
                prev === images.length - 1 ? 0 : prev + 1
            );
        }, 3000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="fixed flex justify-center items-center h-[100vh] w-screen overflow-hidden brightness-75 z-0">
            {images.map((image, i) => {
                return (
                    // <img
                    //     className="beverageImg"
                    //     src={`../Images/melon_juice.png`}
                    //     alt="beverage"
                    // />
                    <motion.img
                        key={i}
                        src={`../Images/${image}`}
                        alt={`Slide ${i + 1}`}
                        className="absolute h-[100vh] w-screen z-50 object-cover"
                        style={{
                            opacity: i === activeIndex ? 1 : 0,
                            zIndex: i === activeIndex ? 1 : 0,
                        }}
                        transition={{ duration: 1 }}
                    />
                );
            })}
        </div>
    );
};

export default Jumbotron;
