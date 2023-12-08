import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Grid } from '@mui/material';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";


const Postes = () => {
    const [posts, setPosts] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getPosts = async () => {
            try {
                const response = await axiosPrivate.get('/posts', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setPosts(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getPosts();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        <Grid container spacing={2}>
            {posts.map((post) => (
                <Grid item key={post.post_id} xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                {post.title}
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                {`Posted by ${post.username} on ${new Date(
                                    post.created_at
                                ).toLocaleString()}`}
                            </Typography>
                            <Typography variant="body2" component="div">
                                {post.content}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default Postes;
