import { createContext, useState } from "react";
import { useKonami } from 'react-konami-code';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);
    const [konami, setKonami] = useState(false);

    const easterEgg = () => {
        setKonami(true);
        alert('Attention! Tu vas voir un futur nétagif!');
    };

    useKonami(easterEgg);

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist, konami, setKonami }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;