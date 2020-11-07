import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AutoComplete from '@material-ui/lab/AutoComplete'; 
import Fade from '@material-ui/core/Fade';
import { Alert, AlertTitle } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


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
    alert: {
        position: 'absolute',
        top: '5%',
        width: '90%',
        zIndex: '20',
        transform: 'translate(5%)',
        borderStyle: "outset"
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
        height: '25vh',
        width: '25vh',
        background: '#ce2029',
        color: 'white',
        zIndex: '10'
    },
    hide: {
        display: 'none'
    },
    circularChart: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '25vh',
        zIndex: '5',
    },
    circle: {
        stroke: 'white',
        fill: 'none',
        strokeWidth: '2.8',
        animation: '$progress 5s ease-out forwards',
    
    },
    oppositeCircle: {
        stroke: '#0C223F',
        fill: 'none',
        strokeWidth: '2.8',
    },
    circlebg: {
        fill: 'none',
        stroke: '#eee',
        strokeWidth: '3.8'
    },
    "@keyframes progress": {
        "0%": {
            strokeDasharray: '25 100'
        },
        "25%":{
            strokeDasharray: '75 100'
        },
        "50%": {
            strokeDasharray: '25 100'
        },
        "75%": {
            strokeDasharray: '75 100'
        },
    },
    //potentially add keyframes for rotating blues at the top
    
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
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [run, setRun] = useState(false);
    const [image1, setImage1] = useState("/graphics/default.png");
    const [image2, setImage2] = useState("/graphics/default.png");
    const [disappear, setDisappear] = useState(false);
    const [fade, setFade] = useState(0);
    const [percent, setPercent] = useState(50);

    const fightOnClick = () => {
        if(player1 === "" || player2 === "") {
            setOpen(true);
            setMessage("Must select a Player!");
        } 
        else if (player1 === player2) {
            setOpen(true);
            setMessage("Players cannot be the same!");
        } else {
            setFade(800);
            setDisappear(true);
            setRun(true);
            setPercent(10);
        }
    }

    // const winRate = useGet("localhost:8080/compare",
    //     {
    //         player_a: player1,
    //         player_b: player2
    //     }
    // );

    return(
        <React.Fragment>
            <Fade in={open}>
                <Alert
                    severity="warning"
                    action={
                        <IconButton size="small" onClick={()=>{setOpen(false)}}>
                            <CloseIcon/>
                        </IconButton>
                    }
                    className={classes.alert}
                >
                    <AlertTitle>Warning</AlertTitle>
                    {message}
                </Alert>
            </Fade>
            <Fade in={!disappear} timeout={fade}>
                <Fab 
                    className={classes.fightButton} 
                    onClick={fightOnClick}
                >
                    <Typography variant="h4">
                        Fight!
                    </Typography>
                </Fab>
            </Fade>
            <svg viewBox="0 0 36 36" className={classes.circularChart}>
                <path className={classes.circlebg}
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path className={classes.oppositeCircle}
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                    className={clsx({[classes.circle]:run})}
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#444"
                    strokeWidth="1"
                    strokeDasharray={`${percent}, 100`}
                />
            </svg>
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
                        disableClearable
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
                        disableClearable
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