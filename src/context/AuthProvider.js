import { createContext, useState } from "react";
import { useKonami } from 'react-konami-code';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);
    const [konami, setKonami] = useState(false);

    const easterEgg = () => {
        setKonami(true);
        alert('Ohoh tu as trouvé le Konami Code ! Un petit aperçu de ce qui nous attend ?');
    };

    useKonami(easterEgg);

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist, konami, setKonami }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;