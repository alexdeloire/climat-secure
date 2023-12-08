import { useRef, useState, useEffect } from "react";
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import { Link } from "react-router-dom";
import { TextField, Button, Stack } from '@mui/material'; // Import Material-UI components
import { useNavigate } from "react-router-dom/dist";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expression régulière pour l'email
const REGISTER_URL = '/auth/signup';
const LOGIN_URL = '/auth/token';

const Register = () => {
    const { setAuth } = useAuth();

    const userRef = useRef();
    const emailRef = useRef();
    const errRef = useRef();

    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
    
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = EMAIL_REGEX.test(email); // Validation de l'email
        const v3 = PWD_REGEX.test(pwd);
        if (!v1 || !v2 || !v3) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const data = {
                username: user,
                password: pwd,
                email: email
            }
            const response = await axios.post(REGISTER_URL,
                JSON.stringify(data),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }


        // login
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
            setAuth({ user, pwd, roles, accessToken });
            navigate('/');
        } catch (err) {
            navigate('/login');
        }

    }

    return (
        <>
            <Button component={Link} to="/" sx={{ color: "white" }}>Accueil </Button>
            <div className='centre'>
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Inscrivez-vous</h1>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2} direction="column" sx={{ width: '100%' }}>
                            <TextField
                                id="username"
                                label="Pseudo"
                                variant="outlined"
                                inputRef={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                inputProps={{
                                    onFocus: () => setUserFocus(true),
                                    onBlur: () => setUserFocus(false),
                                }}
                                value={user}
                                required
                                />
                            {!userFocus && user && !validName && (
                                <p id="uidnote" className={"instructions"}>
                                    {user.length < 4 || user.length > 24 ?
                                        ("Doit être entre 4 et 24 caractères.") :
                                        ("Doit commencer par une lettre et ne peut contenir que des lettres,des chiffres, des tirets et des traits de soulignement.")
                                    }
                                </p>
                            )}
                            
                            <TextField
                                id="email"
                                label="Email"
                                autoComplete="off"
                                inputRef={emailRef}
                                onChange={(e) => setEmail(e.target.value)}
                                inputProps={{
                                    onFocus: () => setEmailFocus(true),
                                    onBlur: () => setEmailFocus(false),
                                }}
                                value={email}
                                required
                                />
                            {!emailFocus && email && !validEmail && (
                                <p id="emailnote" className={"instructions"}>
                                    Doit être une adresse email valide.
                                </p>
                            )}

                            <TextField
                                id="password"
                                label="Mot de passe"
                                variant="outlined"
                                type="password"
                                onChange={(e) => setPwd(e.target.value)}
                                inputProps={{
                                    onFocus: () => setPwdFocus(true),
                                    onBlur: () => setPwdFocus(false),
                                }}
                                value={pwd}
                                required
                                />


                            {!pwdFocus && pwd && !validPwd && (
                                <p id="pwdnote" className={"instructions"}>
                                    {pwd.length < 8 || pwd.length > 24 ?
                                        ("Doit être entre 8 et 24 caractères.") :
                                        ("Doit inclure des lettres majuscules et minuscules, un chiffre et un caractère spécial.")}
                                </p>
                            )}


                            <TextField
                                id="confirm_pwd"
                                label="Confirm Password"
                                variant="outlined"
                                type="password"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                inputProps={{
                                    onFocus: () => setMatchFocus(true),
                                    onBlur: () => setMatchFocus(false),
                                }}
                                value={matchPwd}
                                required
                                />

                            {!matchFocus && matchPwd && !validMatch && (
                                <p id="confirmnote" className={"instructions"}>
                                    Doit correspondre au premier champ de saisie du mot de passe.
                                </p>
                            )}

                            <Button disabled={!validName || !validEmail || !validPwd || !validMatch} variant="contained" type="submit">S'inscrire</Button>
                        </Stack>
                    </form>
                    <p>
                        Déjà inscrit?<br />
                        <span className="line">
                            <Link to="/login">Se connecter</Link>
                        </span>
                    </p>
                </section>
            </div>
        </>
    )
}

export default Register;
