import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-sky-700/30 from-blue-700/20 dark:bg-sky-950 bg-gradient-to-br dark:from-teal-950/60">
            <div>
                <Link href="/">
                    <div className="hidden dark:flex w-7/12 sm:w-3/12 mx-auto items-center justify-center">
                        <img src="../Images/logo-white-tp.png" />
                    </div>
                    <div className="flex dark:hidden w-7/12 sm:w-3/12 mx-auto items-center justify-center">
                        <img src="../Images/logo-black-tp.png" />
                    </div>
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-sky-100/20 shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
