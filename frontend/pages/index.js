import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AutoComplete from '@material-ui/lab/AutoComplete'; 

import { useGet } from '../utils/hooks/useGet';

const useStyles = makeStyles((theme) => ({
    side1: {
        backgroundColor: '#0C223F',
        minHeight: '100vh'
    },
    side2: {
        backgroundColor: '#FFFFFF',
        minHeight: '100vh'
    },
    playerImg:{
        height: '60vh',
        overflowX: 'auto'
    },
    paperPadding: {
        padding: '10px',
        marginLeft: '20px',
        marginRight: '20px'
    },
    selectPadding: {
        width: '95%',
        backgroundColor: 'white'
    },
    title: {
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    fightButton: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: '20vh',
        width: '20vh',
        background: 'radial-gradient(red, #0C223F)',
        color: 'white'
    },
    disappear: {
        display: 'none'
    }
    
}));

const players = [
    {
        value: "DoubleLift",
        label: "DoubleLift"
    },
    {
        value: "Tactical",
        label: "Tactical"
    },
    {
        value: "CoreJJ",
        label: "CoreJJ"
    },
    {
        value: "Test",
        label: "Test"
    }
]

export default function Index(props){

    const classes= useStyles();

    const defaultProps = {
        options: players,
        getOptionLabel: (option) => option.label,
    };

    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");
    const [image1, setImage1] = useState("/graphics/default.png");
    const [image2, setImage2] = useState("/graphics/default.png");

    const handleChange2 = (event) => {
        setPlayer2(event.target.value);
    };

    // const winRate = useGet("localhost:8080/compare",
    //     {
    //         player_a: player1,
    //         player_b: player2
    //     }
    // );

    return(
        <React.Fragment>
            <Fab className={classes.fightButton} size="large">
                <Typography variant="h4">
                    Fight!
                </Typography>
            </Fab>
            <Grid container align="center">
                <Grid item xs={12} className={classes.title}>
                    {[...Array(5)].map((x, i) =>        
                        <img 
                            src="https://static-cdn.jtvnw.net/emoticons/v1/301702778/2.0"  
                            style={{alignSelf: 'center', transform: `rotate(${90*i}deg)`}}
                            key={i}
                        />
                    )}  
                    <Typography variant="h2"> 
                        League Fighters
                    </Typography>
                    {[...Array(5)].map((x, i) =>         
                        <img 
                            src="https://static-cdn.jtvnw.net/emoticons/v1/301702778/2.0"  
                            style={{alignSelf: 'center', transform: `rotate(${90*i}deg)`}}
                            key={i}
                        />
                    )}            
                </Grid>
                <Grid item xs={6} className={classes.side1}>
                    <AutoComplete
                        id="player1"
                        options={players}
                        getOptionLabel={option => typeof option === 'string' ? option : option.label}
                        value={player1}
                        onChange={(event, newValue) => {setPlayer1(newValue.value)}}
                        renderInput={(params) => 
                            <TextField 
                                {...params} 
                                placeholder="Player 1" 
                                variant="outlined" 
                                margin="normal" 
                                className={classes.selectPadding}/>
                        }
                    ></AutoComplete>
                    <img
                        src={image1}
                        className={classes.playerImg}
                    />
                    <Paper className={classes.paperPadding}>
                        <Typography variant='h3'> 
                            {player1 ? player1 : "Player 1"}
                        </Typography>
                        
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <AutoComplete
                        id="player2"
                        options={players}
                        getOptionLabel={option => typeof option === 'string' ? option : option.label}
                        value={player2}
                        onChange={(event, newValue) => {setPlayer2(newValue.value)}}
                        renderInput={(params) => 
                            <TextField 
                                {...params} 
                                placeholder="Player 2" 
                                variant="outlined" 
                                margin="normal" 
                                className={classes.selectPadding}/>
                        }
                    ></AutoComplete>
                    <img
                        src={image2}
                        className={classes.playerImg}
                    />
                    <Paper className={classes.paperPadding} style={{backgroundColor: '#0C223F'}}>
                        <Typography variant='h3' style={{color: 'white'}} >
                            {player2 ? player2 : "Player 2"}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

        </React.Fragment>
    );
};