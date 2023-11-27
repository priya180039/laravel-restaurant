import "./bootstrap";
import "../css/app.css";
import store from "./Store/store";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { Provider } from "react-redux";
import { AlertProvider } from "./Context/alertContext";

const appName = "Larareact";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <Provider store={store}>
                <AlertProvider>
                    <App {...props} />
                </AlertProvider>
            </Provider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
