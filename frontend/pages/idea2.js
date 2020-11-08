import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import AutoComplete from '@material-ui/lab/AutoComplete'; 
import Fade from '@material-ui/core/Fade';
import { Alert, AlertTitle } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import champions from '../components/champion.json';
import { useGet } from '../utils/hooks/useGet';
import { useFetch } from '../utils/hooks/useFetch';
 
const useStyles = makeStyles((theme) => ({
    side1: {
        backgroundColor: '#0C223F',
    },
    side2: {
        backgroundColor: '#FFFFFF',
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
    champCards: {
        height: '75vh',
        width: '8vw',
    },
    gradientBorder: {
        position: 'absolute',
        display: 'block',
        top: '-50%',
        left: '-50%',
        zIndex: '-9',
        height: '200%',
        width: '200%',
        transform: 'rotate(-45deg)',
        overflow: 'hidden',
        background: 'linear-gradient(to right, #fff 20%, #00000000 40%, #0C223F 50%, #0C223F 55%, #00000000 70%, #fff 100%)',
        backgroundSize: '200% auto',
        animation: "$shine 3s linear infinite"
    },
    modal: {
        display: 'flex',
        padding: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'center',
        textAlign:'center',
    },
    paperModal: {
        width: '90vw', 
        maxHeight: '90vh', 
        overflowY: 'scroll',
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
    "@keyframes shine" : {
        "50%": {
            backgroundPosition: '200% center'
        }
    },
    "@font-face": {
        fontFamily: 'SFF',
        src: `url("/fonts/SFF.otf") format("opentype")`
    },

    //potentially add keyframes for rotating blues at the top
    
}));

const positions = [
    "Top", "Jung", "Mid", "Bot", "Sup"
]

export default function Index(props){

    const classes= useStyles();

    const champData = champions[0].data;
    const initialState ={
        Top: {
            champion: "",
            src: "/graphics/portraitbg.jpg"
        },
        Jung:{
            champion: "",
            src: "/graphics/portraitbg.jpg"
        },
        Mid: {
            champion: "",
            src: "/graphics/portraitbg.jpg"
        },
        Bot:{
            champion: "",
            src: "/graphics/portraitbg.jpg"
        },
        Sup: {
            champion: "",
            src: "/graphics/portraitbg.jpg"
        },
    };

    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [turn, setTurn] = useState(false);
    const [message, setMessage] = useState("");
    const [run, setRun] = useState(false);
    const [team1, setTeam1] = useState(initialState);
    const [team2, setTeam2] = useState(initialState);
    const [chosen, setChosen] = useState([]);
    const [disappear, setDisappear] = useState(false);
    const [fade, setFade] = useState(0);
    const [percent, setPercent] = useState(50);

    const [currentCard, setCurrentCard] = useState(0);

    const handleModalOpen = () => {
        setOpenModal(true);
    }

    const handleModalClose = () => {
        setOpenModal(false);
    }

    const onCardClick = (team,key) => {
        setCurrentCard(((team-1) * 0) + key);
        handleModalOpen();
    }


    const fightOnClick = () => {
        if(player1 === "" || player2 === "") {
            setOpen(true);
            setMessage("Must select a Player!");
        } 
        else if (player1 === player2) {
            setOpen(true);
            setMessage("Players cannot be the same!");
        } else {
            const testpercent = 90;
            setFade(800);
            setDisappear(true);
            setRun(true);
            setPercent(testpercent);
            if(testpercent > 50){
                setTurn(true);
            }
        }
    }

    const onTileClick = (champKey, loadingUrl) => {
        console.log(champKey);
        if(currentCard < 5 ) {
            setTeam1({...team1, [positions[currentCard%5]]: {champion: champKey, src: `/graphics/loading/${loadingUrl}`}});
        }  else {
            setTeam2({...team2, [positions[currentCard%5]]: {champion: champKey, src: `/graphics/loading/${loadingUrl}`}});
        }

        handleModalClose();
    }

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
            <Modal
                className={classes.modal}
                open={openModal}
                onClose={handleModalClose}
                closeAfterTransition
            >
                <Fade in={openModal}>
                    <Paper className={classes.paperModal}>
                        <Grid container justify="center">
                            {Object.keys(champData).map((index) =>(
                                <Grid item key={index}>
                                    <Button
                                        size="medium"
                                        onClick={()=>onTileClick(champData[index].key, `${index}_0.jpg`)}
                                    >
                                        <img src={`/graphics/champion/${champData[index].image.full}`}/>
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                        <div className={classes.gradientBorder}></div>
                    </Paper>
                </Fade>
            </Modal>
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
                        OUTDRAFTED
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
                <Grid container item xs={12} className={classes.wavepadding}>

                </Grid>

                <Grid item container xs={6} className={classes.side1} style={{paddingTop: '20px'}}>
                    <Grid item xs={12}>
                        <Paper className={classes.paperPadding}>
                            <Typography variant='h3'> 
                                Team 1
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item container xs={12} justify="space-evenly" style={{paddingTop: '20px'}}>
                        {positions.map((pos,key) =>(
                            <Grid item key={key}>
                                <Card className={classes.champCards}>
                                    <CardActionArea
                                        onClick={()=>onCardClick(1, key)}
                                    >
                                        <CardHeader title={pos}/>
                                        <CardMedia
                                            style={{height:'70vh'}}
                                            image={team1[pos].src}
                                        >
                                        </CardMedia>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={6} className={classes.side2}>
                    <Grid item xs={12}>
                        <Paper className={classes.paperPadding} style={{backgroundColor: '#0C223F'}}>
                            <Typography variant='h3' style={{color: 'white'}}>
                                Team 2
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};