import BestSelling from "@/Components/BestSelling";
import Jumbotron from "@/Components/Jumbotron";
import SocialMedias from "@/Components/SocialMedias";
import { Link, Head } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="sm:absolute sm:top-0 sm:right-0 p-[1.875rem] text-end z-10">
                    {auth.user ? (
                        <div>
                            <Link
                                href={route("foods")}
                                className="font-semibold mx-1 text-gray-800 bg-gray-200 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white dark:bg-zinc-900/70 dark:bg-gradient-to-bl from-gray-700/50 dark:hover:bg-zinc-800/80 p-2 px-3 rounded-lg focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Foods
                            </Link>
                            <Link
                                href={route("beverages")}
                                className="font-semibold mx-1 text-gray-800 bg-gray-200 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white dark:bg-zinc-900/70 dark:bg-gradient-to-bl from-gray-700/50 dark:hover:bg-zinc-800/80 p-2 px-3 rounded-lg focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Beverages
                            </Link>
                        </div>
                    ) : (
                        <>
                            <Link
                                href={route("login")}
                                className="font-semibold mx-1 text-gray-800 bg-gray-200 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white dark:bg-zinc-900/70 dark:bg-gradient-to-bl from-zinc-800/90 dark:hover:bg-zinc-800/80 p-2 px-3 rounded-lg focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route("register")}
                                className="font-semibold mx-1 text-gray-800 bg-gray-200 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white dark:bg-zinc-900/70 dark:bg-gradient-to-bl from-zinc-800/90 dark:hover:bg-zinc-800/80 p-2 px-3 rounded-lg focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                <div className="max-w-7xl mx-auto mb-8 mt-2">
                    <div className="absolute top-0 left-0 w-screen">
                        <Jumbotron />
                    </div>
                    <div className="mt-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                            <div className="scale-100 col-span-2 p-6 bg-white dark:bg-zinc-900/80 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500">
                                <div>
                                    <div className="w-3/12 mx-auto flex items-center justify-center">
                                        <img src="../Images/logo-white-tp.png" />
                                    </div>

                                    <h2 className="mt-6 text-center text-3xl font-semibold text-gray-900 dark:text-white">
                                        Welcome to Larareact Restaurant
                                    </h2>

                                    <p className="mt-4 text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                                        Welcome to our dynamic e-commerce
                                        platform dedicated to providing an
                                        extensive array of delightful foods and
                                        refreshing beverages. Crafted using the
                                        robust combination of Laravel 10 and
                                        React.js, our website offers a seamless
                                        shopping experience where users can
                                        explore a diverse range of culinary
                                        delights and thirst-quenching beverages.
                                        With an intuitive interface designed
                                        using Tailwind CSS, customers can
                                        effortlessly navigate through an
                                        extensive catalog, featuring delectable
                                        food items and an array of beverages.
                                        Whether it's indulging in gourmet dishes
                                        or discovering new refreshing drinks,
                                        our platform ensures a user-friendly
                                        journey, delivering convenience and
                                        satisfaction with every purchase.
                                    </p>
                                </div>
                            </div>

                            <div className="scale-100 col-span-2 p-6 bg-white dark:bg-zinc-900/80 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500">
                                <div>
                                    <h2 className="text-center text-3xl font-semibold text-gray-900 dark:text-white">
                                        Best Selling
                                    </h2>

                                    <div className="mt-4 text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                                        <BestSelling />
                                    </div>
                                </div>
                            </div>

                            <div className="scale-100 col-span-2 p-6 bg-white dark:bg-zinc-900/80 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500">
                                <div className="w-full mx-auto">
                                    <h2 className="text-center text-3xl font-semibold text-gray-900 dark:text-white">
                                        Business Contact
                                    </h2>

                                    <div className="mt-4 w-8/12 mx-auto text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                                        <SocialMedias />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            `}</style>
        </>
    );
}
