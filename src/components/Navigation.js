import { Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { AppBar, Toolbar, Button, IconButton } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router";


const Layout = () => {
    const { auth } = useAuth();
    const user = auth?.user;

    const navigate = useNavigate();

    const logout = useLogout();

    const signOut = async () => {
        await logout();
    }

    return (
        <>
            <AppBar position="static" className="navbar">
                <Toolbar>
                    <Button color="inherit" onClick={() => navigate('/')}>
                        Accueil
                    </Button>


                    <Button color="inherit" onClick={() => navigate('/game')}>
                        Découverte
                    </Button>

                    <Button color="inherit" onClick={() => navigate('/postes')}>
                        Postes
                    </Button>

                    {user ? 
                        <>
                            <IconButton color="inherit">
                                <AccountCircle />
                            </IconButton>
                            <Button color="inherit" onClick={signOut}>
                                Déconnexion
                            </Button>
                        </>
                    :
                    <Link to="/login">
                            <Button sx={{ color: "white" }}>Se Connecter</Button>
                        </Link>
                    }
                </Toolbar>
            </AppBar>
            <Outlet />
        </>
    )
}

export default Layout
