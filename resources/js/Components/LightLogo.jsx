import { useState } from "react";

export default function LightLogo(props) {
    const [isHover, setHover] = useState(false);
    return (
        <>
            {isHover ? (
                <img
                    onMouseLeave={() => setHover(false)}
                    className="block dark:hidden w-full brightness-200 opacity-50"
                    src="../Images/logo-black-sm.png"
                />
            ) : (
                <img
                    onMouseEnter={() => setHover(true)}
                    className="block dark:hidden w-full brightness-110"
                    src="../Images/logo-black-sm.png"
                />
            )}
        </>
    );
}
