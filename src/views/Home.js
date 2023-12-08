import { Link } from "react-router-dom";
import { Container, Typography } from "@mui/material";

const Home = () => {
    return (
        <div>

            <Container sx={{ paddingTop: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Bienvenue
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
            </Container>
        </div>
    );
};

export default Home;
