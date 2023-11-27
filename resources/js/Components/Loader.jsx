import React from "react";
import { FaSpinner } from "react-icons/fa";

const Loader = () => {
    return (
        <div className="text-3xl text-sky-400/90 flex justify-center w-full mx-auto">
            <FaSpinner className="animate-spin text-5xl text-sky-400/90 text-center" />
        </div>
    );
};

export default Loader;
