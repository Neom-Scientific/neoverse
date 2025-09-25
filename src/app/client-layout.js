// "use client";

// import { Provider } from "react-redux";
// import Header from "./components/Header";
// import { persistor, store } from "@/lib/redux/store";
// import { PersistGate } from "redux-persist/integration/react";

// export default function ClientLayout({ children }) {
//     return (
//         <div>
//             <Provider store={store}>
//                 <PersistGate loading={null} persistor={persistor}>
//                     <Header />
//                     {children}
//                 </PersistGate>
//             </Provider>
//         </div>
//     );
// }

"use client";

import { Provider } from "react-redux";
import Header from "./components/Header";
import { persistor, store } from "@/lib/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }) {
    const pathname = usePathname();
    const hideHeaderRoutes = ["/vide", "/neovar", "/cardio-predict"];
    const showHeader = !hideHeaderRoutes.includes(pathname);

    return (
        <div>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    {showHeader && <Header />}
                    {children}
                </PersistGate>
            </Provider>
        </div>
    );
}