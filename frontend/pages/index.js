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
        minHeight: '100vh',
        paddingTop: '15vh',
    },
    side2: {
        backgroundColor: '#FFFFFF',
        minHeight: '100vh',
        paddingTop: '15vh',
    },
    center: {
        position: 'absolute',
        top: '60%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    alert: {
        position: 'absolute',
        top: '5%',
        width: '90%',
        zIndex: '99',
        transform: 'translate(5%)',
        borderStyle: "outset"
    },
    playerImg:{
        height: '50vh',
        overflowX: 'auto'
    },
    paperPadding: {
        padding: '10px',
        marginLeft: '20px',
        marginRight: '20px'
    },
    selectPadding: {
        width: '95%',
        backgroundColor: 'white',
        zIndex: '50'
    },
    title: {
        display: 'flex',
        justifyContent: 'space-evenly',
        background: 'white',
        minHeight: '10vh'
        
    },
    fightButton: {
        height: '25vh',
        width: '25vh',
        background: '#ce2029',
        color: 'white',
        zIndex: '10',
        boxShadow: '0 0 0 0 rgba(199, 21, 133, 0.5)',
        animation: '$pulse 2s infinite'
    },
    hide: {
        display: 'none'
    },
    circularChart: {
        maxWidth: '25vh',
        zIndex: '5',
    },
    circle: {
        stroke: 'white',
        fill: 'none',
        strokeWidth: '2.8',
        animation: '$progress 6s ease-out forwards',
    
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
    line: {
        position: 'absolute',
        width: '100%',
        overflow:'hidden',
        height: '15%',
        background: 'white'
    },
    line1:{
        zIndex: '15',
        opacity: '0.5',
    },
    line2:{
        zIndex: '10',
        opacity: '0.7',
    },
    line3:{
        zIndex: '5',
    },
    wave:{
        position: 'absolute',
        left: '0',
        width: '200%',
        height: '100%',
        backgroundRepeat: 'repeat no-repeat',
        backgroundPosition: '0 bottom',
        transformOrigin: "center bottom"
    },
    wave1:{
        backgroundSize: '50% 80px',
        backgroundImage: `url("/graphics/1blue.png")`
    }, 
    wave2:{
        backgroundSize: '50% 100px',
        backgroundImage: `url("/graphics/2blue.png")`,
        animation: '$wavy 12s linear infinite',
    }, 
    wave3:{
        backgroundSize: '50% 80px',
        backgroundImage: `url("/graphics/3blue.png")`,
        animation: '$wavy 18s linear infinite'
    }, 
    sffont:{
        fontFamily: 'SFF'
    },
    wavepadding: {
        paddingTop: '15vh',
    },
    rotatingBlue: {
        animation: '$rotate 6s linear'
    },
    turn: {
        transform: 'scaleX(-1)'
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
    "@keyframes wavy":{
        "0%":{
            transform: 'translateX(0) translateZ(0) scaleY(1)'
        },
        "50%":{
            transform: 'translateX(-25%) translateZ(0) scaleY(0.5)'
        },
        "100%":{
            transform: 'translateX(-50%) translateZ(0) scaleY(1)'
        },
    },
    "@keyframes pulse":{
        "0%" :{
        },
        "50%" : {
            boxShadow: '0 0 0 20px rgba(199, 21, 133, 0)'
        },
        "100%" : {
            boxShadow: '0 0 0 0 rgba(199, 21, 133, 0)'
        }
    },
    "@keyframes rotate":{
        "0%" : {
            transform: 'rotateY(360deg)'
        },
        "25%" : {
            transform : 'rotateY(180deg)'
        },
        "50%" : {
            transform : 'rotatey(360deg)'
        },
        "75%" : {
            transform : 'rotateY(180deg)'
        },
        "100%" : {
            transform : 'rotateY(360deg)'
        }
    },
    "@font-face": {
        fontFamily: 'SFF',
        src: `url("/fonts/SFF.otf") format("opentype")`
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
    },
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
    const [turn, setTurn] = useState(false);
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
            const testpercent = 10;
            setFade(800);
            setDisappear(true);
            setRun(true);
            setPercent(testpercent);
            if(testpercent > 50){
                setTurn(true);
            }
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
                    className={`${classes.fightButton} ${classes.center}`} 
                    onClick={fightOnClick}
                >
                    <Typography variant="h3" style={{fontFamily: "'Big Shoulders Stencil Text', cursive"}}>
                        FIGHT!
                    </Typography>
                </Fab>
            </Fade>
            <svg viewBox="0 0 36 36" className={`${classes.center} ${classes.circularChart}`}>
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
            <div className={classes.center}>
                <img src="https://static-cdn.jtvnw.net/emoticons/v1/301702758/2.0" 
                    className={clsx({[classes.rotatingBlue]:run, [classes.turn]: turn})}/>
            </div>
            <Grid container align="center">
                <Grid item xs={12} className={classes.title}>
                    {[...Array(5)].map((x, i) =>        
                        <img 
                            src="https://static-cdn.jtvnw.net/emoticons/v1/301702778/2.0"  
                            style={{alignSelf: 'center', transform: `rotate(${90*i}deg)`}}
                            key={i}
                        />
                    )}  
                    <Typography variant="h2" style={{fontFamily: 'SFF'}}> 
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
                <Grid item xs={12}>
                    <div className={`${classes.line} ${classes.line1}`}>
                        <div className={`${classes.wave} ${classes.wave1}`}></div>
                    </div>
                    <div className={`${classes.line} ${classes.line2}`}>
                        <div className={`${classes.wave} ${classes.wave2}`}></div>
                    </div>
                    <div className={`${classes.line} ${classes.line3}`}>
                        <div className={`${classes.wave} ${classes.wave3}`}></div>
                    </div>
                </Grid>
                <Grid item xs={6} className={classes.side1} >
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
                        <Typography variant='h3' > 
                            {player1 ? player1 : "Player 1"}
                        </Typography>
                    </Paper>
                    <Paper>
                        
                    </Paper>
                </Grid>
                <Grid item xs={6} className={classes.side2}>
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
                        <Typography variant='h3' style={{color: 'white'}}>
                            {player2 ? player2 : "Player 2"}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};