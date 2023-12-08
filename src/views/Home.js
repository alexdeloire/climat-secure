import React, { useState, useEffect } from 'react';
import { Typography, Grid, Container } from '@mui/material';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getPosts = async () => {
      try {
        const response = await axiosPrivate.get('/posts', {
          signal: controller.signal,
        });
        isMounted && setPosts(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    getPosts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <Container maxWidth="md">
      <Grid container spacing={4}>
        {/* Partie sur les idées reçues */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Idées reçues sur le réchauffement climatique
          </Typography>
          <Typography>
            {/* Ajoutez ici le contenu sur les idées reçues */}
          </Typography>
        </Grid>

        {/* Partie pour le dernier poste publié */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Dernier Poste Publié
          </Typography>
          {posts.length > 0 ? (
            <Link to={`/post/${posts[0].post_id}`}>
              <Typography variant="h6">{posts[0].title}</Typography>
            </Link>
          ) : (
            <Typography>Aucun poste publié pour le moment.</Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
