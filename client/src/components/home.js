import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));


const Home = () => {
    const [personsArray, setpersonsArray] = useState([])
    useEffect(() => {
        (async () => {
            await axios.get(`http://localhost:4242/persons`).then(data => {
                console.log(data.data.results);
                for (let v = 1; v < 9; v++) {
                    axios.get(`http://localhost:4242/person/${v}`).then(data => {
                        for (let v = 0; v < 1; v++) {
                            var infos = data.data
                            console.log(data.data)
                            setpersonsArray(personsArray => personsArray.concat(infos))
                        }
                        console.log(personsArray)
                    }).catch(error => {
                        console.log(error)
                    })
                }

            }).catch(error => {
                console.log(error)
            })
        })();
    }, []);




    const classes = useStyles()
    return (
        <Container>
            {
                personsArray.map((l, i) => (
                    <div key={i} className={classes.root}>
                        <br />
                        <br />
                        <br />
                        <Paper className={classes.paper}>
                            <Grid container spacing={5}>
                                <Grid item lg >
                                    {/* <ButtonBase className={classes.image}>
                                        <img className={classes.img} alt="complex" src={l.sprites.front_default} />
                                    </ButtonBase> */}
                                </Grid>
                                <Grid item lg container >
                                    <Grid item sm>
                                        <Typography gutterBottom variant="subtitle1">
                                            {l.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {'Height : ' + l.height + 'cm'}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {'Mass : ' + l.mass + ' kilos'}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {'Hair color : ' + l.hair_color}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {'Skin color : ' + l.skin_color}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {'Eye color : ' + l.eye_color}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {'Birth year : ' + l.birth_year}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {'Gender : ' + l.gender}
                                        </Typography>
                                    </Grid>

                                    <Grid item>
                                        <Typography variant="subtitle1"></Typography>
                                    </Grid>
                                </Grid>
                                {/* <Grid item>
                                    <Button variant="outline-dark" href={`/article/${l}`}> See More</Button>
                                </Grid> */}
                            </Grid>
                        </Paper>
                        <br />
                    </div>
                ))
            }
        </Container>
    );

}


export default Home;
