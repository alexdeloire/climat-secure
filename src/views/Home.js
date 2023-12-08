import React, { useState, useEffect } from 'react';
import { Typography, Grid, Container, Card, CardContent } from '@mui/material';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const Home = () => {
  const [post, setPost] = useState({});
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getPost = async () => {
      try {
        const response = await axiosPrivate.get('/posts/one', {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setPost(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    getPost();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <Container maxWidth="xd">
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom className='title-home'>
            Idées reçues sur le réchauffement climatique
          </Typography>
          <Typography align='justify' className='contenair-about' >
            {`Les idées reçues sur le réchauffement climatique sont souvent ancrées dans la société,
            créant parfois une confusion sur la réalité des changements climatiques.
            L'une de ces croyances répandues est l'idée que le réchauffement climatique est
            simplement un phénomène naturel attribuable aux cycles solaires. Cependant, 
            la prépondérance des preuves scientifiques indique que les activités humaines,
            telles que les émissions de gaz à effet de serre, jouent un rôle majeur dans
            l'augmentation des températures globales. Une autre idée fausse courante est que
            les variations climatiques naturelles rendent insignifiantes les contributions humaines
            au changement climatique. En réalité, la rapidité du réchauffement observé au cours des
            dernières décennies dépasse de loin les fluctuations historiques, soulignant l'influence 
            significative des activités anthropiques. Ainsi, démystifier ces idées reçues est crucial 
            pour promouvoir une compréhension précise du réchauffement climatique et encourager des actions 
            visant à atténuer ses effets néfastes.`}
          </Typography>
        </Grid>

        {/* Partie pour le dernier poste publié */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom className='title-home'>
            Dernier Poste Publié
          </Typography>
          {post ? (
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
          ) : (
            <Typography>Aucun poste publié pour le moment.</Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
