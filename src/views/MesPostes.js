import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Grid, TextField, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';

const MesPostes = () => {
    const [posts, setPosts] = useState([]);
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostContent, setNewPostContent] = useState('');
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const { auth } = useAuth();
    const { user } = auth;

    useEffect(() => {
        
        let isMounted = true;
        const controller = new AbortController();

        const getPosts = async () => {
            try {
                const response = await axiosPrivate.get(`/posts?username=${user}`, {
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
    }, []);

    const handleEditClick = (postId) => {
        // Redirect to the edit page for the selected post
        navigate(`/edit-post/${postId}`);
    };

    const handleCreatePost = async () => {
        // Implement the logic to create a new post
        try {
            const response = await axiosPrivate.post('/posts', {
                title: newPostTitle,
                content: newPostContent,
                username: user, // Replace with your actual username
            });

            // After creating the post, refresh the list of posts
            setNewPostTitle('');
            setNewPostContent('');
            // Push the new post to the posts array
            setPosts([...posts, response.data]);
        } catch (error) {
            console.error('Error creating post:', error);
            navigate('/login', { state: { from: location }, replace: true });
        }
    };

    return (
        <div style={{ marginTop: '16px', marginBottom: '16px' }}>
        <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            {/* Form to create a new post */}
            <TextField
                label="Title"
                variant="outlined"
                style={{ marginBottom: '8px' }}
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
            />
            <TextField
                label="Content"
                variant="outlined"
                multiline
                rows={4}
                style={{ marginBottom: '8px' }}
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
            />
            <Button variant="contained" onClick={handleCreatePost}>
                Create Post
            </Button>
        </div>
        <Grid container spacing={2} >
            {posts.map((post) => (
                <Grid item key={post.post_id} xs={12}>
                    <Card style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
                        <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
                            <Button
                                variant="contained"
                                style={{ marginTop: '8px', maxWidth: '100px' }}
                                onClick={() => handleEditClick(post.post_id)}
                            >
                                Edit
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </div>
    );
};

export default MesPostes;
