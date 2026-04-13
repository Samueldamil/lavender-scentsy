import { useContext, createContext, useState } from "react";
import PopUp from "../components/PopUp";

const PopUpContext = createContext(null);

export default function PopUpProvider({ children }) {
    const [notification, setNotification] = useState({
        message: "",
        type: "success",
        show: false
    });

    function notify(message, type = "success") {
        setNotification({message, type, show: true});

        setTimeout(() => {
            setNotification(n => ({ ...n, show: false }));
        }, 3000);
    }

    return(
        <PopUpContext.Provider value={{ notify }}>
            {children}
            <PopUp {...notification} />
        </PopUpContext.Provider>
    )
}

export function usePopUp() {
    return useContext(PopUpContext);
}