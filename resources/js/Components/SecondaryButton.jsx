export default function SecondaryButton({
    type = "button",
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center px-4 py-2 bg-blue-400/70 dark:bg-blue-600/70 border border-gray-300 dark:border-gray-500 rounded-md font-semibold text-xs text-zinc-800 hover:text-gray-100 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:hover:bg-blue-400 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-25 transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
