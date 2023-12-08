import { useRef, useState, useEffect} from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button, Stack, Alert, AlertTitle } from '@mui/material';

import axios from '../api/axios';
const LOGIN_URL = '/auth/token';

const Login = () => {
    const { setAuth, persist, setPersist } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        if (userRef.current){
            userRef.current.focus();
        }
    }, [userRef.current])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', user);
        formData.append('password', pwd);

        const config = {
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            },
            withCredentials: true
        };

        try {
            const response = await axios.post(LOGIN_URL,
                formData,
                config
            );
            const accessToken = response?.data?.access_token;
            const roles = response?.data?.roles;
            console.log(response?.data);
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Wrong Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
        }
    }

    const togglePersist = () => {
        setPersist(prev => !prev);
    }

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist])
    

    return (
        <> 
            <Button component={Link} to="/" sx={{ color: "black" }}>
                 Accueil </Button>
            <div className='centre'>
                <section>
                
                    {errMsg && (
                            <Alert severity="error" onClose={() => setErrMsg('')}>
                                <AlertTitle>Erreur</AlertTitle>
                                {errMsg}
                            </Alert>
                    )}
                    <h1>Connexion</h1>

                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2} direction="column" sx={{ width: '100%' }}>
                            <TextField
                                id="username"
                                className="Input"
                                label="Pseudo"
                                variant="outlined"
                                inputRef={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                                />

                            <TextField
                                id="password"
                                label="Mot de passe"
                                variant="outlined"
                                type="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                                />
                            <Button className="Input" variant="contained" type="submit">Se connecter</Button>
                            <div className="persistCheck">
                                <input
                                    type="checkbox"
                                    id="persist"
                                    onChange={togglePersist}
                                    checked={persist}
                                    />
                                <label htmlFor="persist">Se souvenir de moi</label>
                            </div>
                        </Stack>
                    </form>
                    <p>
                        Besoin d'un compte ? <br />
                        <span className="line">
                            <Link to="/register">S'inscrire</Link>
                        </span>
                    </p>

            </section>
        </div>
    </>
    )
}

export default Login
