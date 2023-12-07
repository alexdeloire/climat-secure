import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { AppBar, Button, Container, IconButton, Toolbar, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

const Home = () => {
    const logout = useLogout();

    const signOut = async () => {
        await logout();
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Home
                    </Typography>
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>
                    <Button color="inherit" onClick={signOut}>
                        Sign Out
                    </Button>
                </Toolbar>
            </AppBar>
            <Container sx={{ paddingTop: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Welcome to Your Home Page
                </Typography>
                <Typography variant="body1" paragraph>
                    You are logged in!
                </Typography>
                <Link to="/editor" style={{ marginRight: 16 }}>
                    Go to the Editor page
                </Link>
                <Link to="/admin" style={{ marginRight: 16 }}>
                    Go to the Admin page
                </Link>
                <Link to="/lounge" style={{ marginRight: 16 }}>
                    Go to the Lounge
                </Link>
                <Link to="/linkpage" style={{ marginRight: 16 }}>
                    Go to the link page
                </Link>
                <div className="flexGrow"></div>
                <Typography variant="h6" gutterBottom>
                    Your Pseudo
                </Typography>
                <textarea
                    placeholder="Write your post here..."
                    style={{ width: "100%", minHeight: 100, padding: 8 }}
                />
            </Container>
        </div>
    );
};

export default Home;
