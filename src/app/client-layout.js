"use client";

import { Provider } from "react-redux";
import Header from "./components/Header";
import { persistor, store } from "@/lib/redux/store";
import { PersistGate } from "redux-persist/integration/react";

export default function ClientLayout({ children }) {
    return (
        <div>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Header />
                    {children}
                </PersistGate>
            </Provider>
        </div>
    );
}