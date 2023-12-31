import { useState } from "react";

export default function ApplicationLogo(props) {
    const [isHover, setHover] = useState(false);
    return (
        <>
            {isHover ? (
                <img
                    onMouseLeave={() => setHover(false)}
                    className="hidden dark:block w-full brightness-150"
                    src="../Images/logo-white-sm.png"
                />
            ) : (
                <img
                    onMouseEnter={() => setHover(true)}
                    className="hidden dark:block w-full brightness-150"
                    src="../Images/logo-blue-sm.png"
                />
            )}
        </>
    );
}
