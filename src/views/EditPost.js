import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const EditPost = () => {
    const { post_id } = useParams();
    const [post, setPost] = useState({});
    const [editedTitle, setEditedTitle] = useState('');
    const [editedContent, setEditedContent] = useState('');
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Fetch the specific post based on post_id
        const fetchPost = async () => {
            try {
                const response = await axiosPrivate.get(`/posts/${post_id}`);
                setPost(response.data);
                setEditedTitle(response.data.title);
                setEditedContent(response.data.content);
            } catch (error) {
                console.error('Error fetching post:', error);
                navigate('/login', { state: { from: location }, replace: true });
            }
        };

        fetchPost();
    }, [axiosPrivate, post_id]);

    const handleUpdatePost = async () => {
        // Implement the logic to update the post
        try {
            await axiosPrivate.put(`/posts/${post_id}`, {
                title: editedTitle,
                content: editedContent,
            });

            // After updating the post, navigate back to the post list page
            navigate('/mes-postes');
        } catch (error) {
            console.error('Error updating post:', error);
            navigate('/login', { state: { from: location }, replace: true });
        }
    };

    const handleDeletePost = async () => {
        // Implement the logic to delete the post
        try {
            await axiosPrivate.delete(`/posts/${post_id}`);

            // After deleting the post, navigate back to the post list page
            navigate('/mes-postes');
        } catch (error) {
            console.error('Error deleting post:', error);
            navigate('/login', { state: { from: location }, replace: true });
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '16px' }}>
            <h2>Edit Post</h2>
            <TextField
                label="Title"
                variant="outlined"
                fullWidth
                style={{ marginBottom: '8px' }}
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
            />
            <TextField
                label="Content"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                style={{ marginBottom: '8px' }}
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
            />
            <Button
                variant="contained"
                style={{ marginBottom: '8px' }}
                onClick={handleUpdatePost}
            >
                Update
            </Button>
            <Button
                variant="outlined"
                color="error"
                onClick={handleDeletePost}
            >
                Delete
            </Button>
        </div>
    );
};

export default EditPost;
