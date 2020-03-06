// import Layout from '../components/Layout';
// import Head from "next/head";
// // import Link from 'next/link';
// import Button from '@material-ui/core/Button';

import Link from '@material-ui/core/Link'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Hidden from '@material-ui/core/Hidden'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles(theme => ({
    toolbar: {
      borderBottom: `1px solid ${theme.palette.divider}`
    },
    toolbarTitle: {
      flex: 1
    },
    mainFeaturedPost: {
      position: 'relative',
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.common.white,
      marginBottom: theme.spacing(4),
      backgroundImage: 'url(https://source.unsplash.com/user/erondu)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    },
    overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,.7)'
    },
    mainFeaturedPostContent: {
      position: 'relative',
      padding: theme.spacing(3),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(6),
        paddingRight: 0
      }
    },
    card: {
      display: 'flex'
    },
    cardDetails: {
      flex: 1
    },
    cardMedia: {
      width: 160
    }
  }))

const Index = (props) => {
    const classes = useStyles();
    const fictionUuid = '1b7df281-ae2a-40bf-ad6a-ac60409a9ce6';
    const featuredPosts = [
        {
          title: 'Featured post',
          date: 'Nov 12',
          description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.'
        },
        {
          title: 'Post title',
          date: 'Nov 11',
          description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.'
        }
      ]
    return (
        <>
          <CssBaseline />
          <Container maxWidth="lg">
            <Toolbar className={classes.toolbar}>
              <Typography
                component="h2"
                variant="h5"
                color="inherit"
                align="center"
                noWrap
                className={classes.toolbarTitle}
              >
                Ficti
              </Typography>
            </Toolbar>
            <main>
              {/* Main featured post */}
              <Paper className={classes.mainFeaturedPost}>
                {/* Increase the priority of the hero background image */}
                {
                  <img
                    style={{ display: 'none' }}
                    src="https://source.unsplash.com/user/erondu"
                    alt="background"
                  />
                }
                <div className={classes.overlay} />
                <Grid container>
                  <Grid item md={6}>
                    <div className={classes.mainFeaturedPostContent}>
                      <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                        Title of a longer featured blog post
                      </Typography>
                      <Typography variant="h5" color="inherit" paragraph>
                        Multiple lines of text that form the lede, informing new readers
                        quickly and efficiently about what&apos;s most interesting in this
                        post&apos;s contents.
                      </Typography>
                      <Link variant="subtitle1" href="#">
                        Continue reading…
                      </Link>
                    </div>
                  </Grid>
                </Grid>
              </Paper>
              {/* End main featured post */}
              {/* Sub featured posts */}
              <Grid container spacing={4}>
                {featuredPosts.map(post => (
                  <Grid item key={post.title} xs={12} md={6}>
                    <CardActionArea component="a" href="#">
                      <Card className={classes.card}>
                        <div className={classes.cardDetails}>
                          <CardContent>
                            <Typography component="h2" variant="h5">
                              {post.title}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                              {post.date}
                            </Typography>
                            <Typography variant="subtitle1" paragraph>
                              {post.description}
                            </Typography>
                            <Typography variant="subtitle1" color="primary">
                              Continue reading...
                            </Typography>
                          </CardContent>
                        </div>
                        <Hidden xsDown>
                          <CardMedia
                            className={classes.cardMedia}
                            image="https://source.unsplash.com/random"
                            title="Image title"
                          />
                        </Hidden>
                      </Card>
                    </CardActionArea>
                  </Grid>
                ))}
              </Grid>
              {/* End sub featured posts */}
            </main>
          </Container>
        </>
      )

    //   return (
    //     <div>
    //         <Head>
    //             <title>Ficti : create your fiction</title>
    //             <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet" />
    //             <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    //         </Head>
    
    //         <Layout>
    //             <Link href="/fictions/1b7df281-ae2a-40bf-ad6a-ac60409a9ce6">
    //                 <a>My Fiction</a>
    //             </Link>
    //             <Button variant="contained" color="primary.main">
    //                 Hello World
    //             </Button>
    //             <Card>
    //                 <CardContent>
    //                     hello
    //                 </CardContent>
    //             </Card>
    //         </Layout>
    //     </div>
    // );
}

export default Index;
