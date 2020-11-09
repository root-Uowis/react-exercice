import React, { useEffect, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useForm } from "react-hook-form";

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
    const [personsArray2, setpersonsArray2] = useState([])
    const { register, handleSubmit } = useForm();


    const onSubmit = query =>

        axios.get(`http://localhost:4242/person/search/${query.name}`)
            .then((data) => {
                console.log(data.data.results[0]);
                var infos = data.data.results[0];
                if (personsArray2.length == 0) {
                    setpersonsArray2(personsArray2 => personsArray2.concat(infos))
                }else {
                    window.location.reload()
                }
            });


    useEffect(() => {
        (async () => {
            await axios.get(`http://localhost:4242/persons`).then(data => {
                for (let v = 1; v < 10; v++) {
                    axios.get(`http://localhost:4242/person/${v}`).then(data => {
                        for (let v = 0; v < 1; v++) {
                            var infos = data.data
                            setpersonsArray(personsArray => personsArray.concat(infos))
                        }
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
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <br />
                    <Form.Control type="text" name="name" placeholder="Search" ref={register} required />
                </Form.Group>
                <br />
                <Button variant="outline-primary" type="submit">
                    Search
                </Button>
                <br />
                <br />
                <i>refresh for search again</i>
            </Form>
            {personsArray2.length == 0

                ?

                (

                    personsArray.map((l, i) => (
                        <div key={i} className={classes.root}>
                            <br />
                            <br />
                            <Paper className={classes.paper}>
                                <Grid container spacing={5}>
                                    <Grid item lg >
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
                                    </Grid>
                                </Grid>
                            </Paper>
                            <br />
                        </div>
                    )))

                :

                (
                    personsArray2.map((l, i) => (
                        <div key={i} className={classes.root}>
                            <br />
                            <br />
                            <br />
                            <Paper className={classes.paper}>
                                <Grid container spacing={5}>
                                    <Grid item lg >
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
                                    </Grid>
                                </Grid>
                            </Paper>
                            <br />
                        </div>
                    )))
            }
        </Container>
    );

}


export default Home;
