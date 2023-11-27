import React, { useEffect, useRef } from "react";
import { useAlertContext } from "../Context/alertContext";

function Alert() {
    const { isOpen, type, message, onClose } = useAlertContext();
    const cancelRef = useRef();

    const alertStyle = {
        padding: "16px",
        backgroundColor: type === "success" ? "#81C784" : "#FF8A65",
        color: "#fff",
        borderRadius: "4px",
    };

    const headerText = type === "success" ? "All good!" : "Oops!";

    useEffect(() => {
        const handleClick = (e) => {
            if (
                isOpen &&
                cancelRef.current &&
                !cancelRef.current.contains(e.target)
            ) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [isOpen, onClose]);

    return (
        <>
            {isOpen && (
                <div
                    onClick={onClose}
                    ref={cancelRef}
                    className="rounded-5xl top-[15%] left-1/2 w-11/12 sm:w-fit"
                    style={{
                        position: "fixed",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <div style={alertStyle}>
                        <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>
                            {headerText}
                        </h2>
                        <p style={{ marginTop: "8px" }}>{message}</p>
                    </div>
                </div>
            )}
        </>
    );
}

export default Alert;
