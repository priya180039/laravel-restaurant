import React from "react";
import { FaSpinner } from "react-icons/fa";

const Loader = () => {
    return (
        <div className="text-3xl text-zinc-900/90 dark:text-sky-400/90 flex justify-center w-full mx-auto">
            <FaSpinner className="animate-spin text-5xl text-zinc-900/90 dark:text-sky-400/90 text-center" />
        </div>
    );
};

export default Loader;
