import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Fade from '@material-ui/core/Fade';
import { Alert, AlertTitle } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import champions from '../components/champion.json';
 
const useStyles = makeStyles((theme) => ({
    side1: {
        backgroundColor: '#0C223F',
        paddingBottom: '2vh'
    },
    side2: {
        backgroundColor: '#FFFFFF',
        paddingBottom: '2vh'
    },
    center: {
        position: 'absolute',
        top: '35%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    centerReset: {
        position:'absolute',
        top: '60%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '100',
        backgroundColor: '#2468BF'
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
        zIndex: '30',
        boxShadow: '0 0 0 0 rgba(199, 21, 133, 0.5)',
        animation: '$pulse 2s infinite'
    },
    hide: {
        display: 'none'
    },
    circularChart: {
        maxWidth: '35vh',
        zIndex: '25',
    },
    circle: {
        stroke: '#2468BF',
        fill: 'none',
        strokeWidth: '2.8',
        animation: '$progress 6s ease-out forwards',
    },
    oppositeCircle: {
        stroke: 'white',
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
        paddingTop: '20vh',
    },
    rotatingBlue: {
        animation: '$rotate 6s linear'
    },
    turn: {
        transform: 'scaleX(-1)'
    },
    champCards: {
        height: '55vh',
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
        animation: "$shine 6s linear infinite"
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
    hidingblue:{
        position: 'absolute',
        height: '150px',
        top: '60vh',
        animation: "$slide 6s linear forwards"

    },
    grayOut: {
        opacity: 0.4,
        filter: 'alpha(opacity=40)'
    },
    slideDown: {
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
        "0%":{
            transform: 'rotate(-40deg) rotateY(180deg)'
        },
        "20%": {
            transform: 'rotate(40deg) rotateY(360deg)'
        },
        "40%":{
            transform: ' rotate(-40deg) rotateY(180deg)'
        },
        "60%": {
            transform: ' rotate(40deg) rotateY(360deg)'
        },
        "100%" : {
            transform: 'rotate(0deg) rotateY(180deg)'
        }
    },
    "@keyframes shine" : {
        "50%": {
            backgroundPosition: '200% center'
        }
    },
    "@keyframes slide" : {
        "0%":{
            transform: 'translateX(-50%) translateY(-35%) rotate(-40deg)'
        },
        "20%": {
            transform: 'translateX(-50%) translateY(-35%) rotate(40deg)'
        },
        "40%":{
            transform: 'translateX(-50%) translateY(-35%) rotate(-40deg)'
        },
        "60%": {
            transform: 'translateX(-50%) translateY(-20%) rotate(40deg) '
        },
        "100%" : {
            transform: 'translateX(-50%) translateY(-20%) translateY(70%)'
        }
    },
    "@font-face": {
        fontFamily: 'SFF',
        src: `url("/fonts/SFF.otf") format("opentype")`
    },    
}));

const positions = [
    "Top", "Jung", "Mid", "Bot", "Sup"
]

export default function Index(props){

    const classes= useStyles();

    const champData = champions[0].data;
    const initialState ={
        Top1: {
            champion: "",
            src: "/graphics/portraitbg.jpg"
        },
        Jung1:{
            champion: "",
            src: "/graphics/portraitbg.jpg"
        },
        Mid1: {
            champion: "",
            src: "/graphics/portraitbg.jpg"
        },
        Bot1:{
            champion: "",
            src: "/graphics/portraitbg.jpg"
        },
        Sup1: {
            champion: "",
            src: "/graphics/portraitbg.jpg"
        },
        Top2: {
            champion: "",
            src: "/graphics/portraitbg.jpg"
        },
        Jung2:{
            champion: "",
            src: "/graphics/portraitbg.jpg"
        },
        Mid2: {
            champion: "",
            src: "/graphics/portraitbg.jpg"
        },
        Bot2:{
            champion: "",
            src: "/graphics/portraitbg.jpg"
        },
        Sup2: {
            champion: "",
            src: "/graphics/portraitbg.jpg"
        },
    };

    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [turn, setTurn] = useState(false);
    const [message, setMessage] = useState("");
    const [run, setRun] = useState(false);
    // const [team1, setTeam1] = useState(initialState);
    // const [team2, setTeam2] = useState(initialState);
    const [team, setTeam] = useState(initialState);
    const [selected, setSelected] = useState({});
    const [disappear, setDisappear] = useState(false);
    const [fade, setFade] = useState(0);
    const [percent, setPercent] = useState(50);
    const [currentCard, setCurrentCard] = useState(0);
    const [trigger, setTrigger] = useState(false);
    const isFirstRun = React.useRef(true);

    const handleModalOpen = () => {
        setOpenModal(true);
    };

    const handleModalOpen2 = () =>{
        setDisappear(true);
    };

    const handleModalClose = () => {
        setOpenModal(false);
    };

    const handleModalClose2 = () => {
        setDisappear(false);
    };

    const onCardClick = (team,key) => {
        setCurrentCard(((team-1) * 5) + key);
        handleModalOpen();
    };

    const reset = () => {
        // setTeam1({...initialState});
        // setTeam2({...initialState});
        setTrigger(false)
        setFade(0);
        setDisappear(false);
        setRun(false);
        setTurn(false);
        setPercent(50);
    };

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        const team1string = `${team["Top1"].champion}%2C${team["Jung1"].champion}%2C${team["Mid1"].champion}%2C${team["Bot1"].champion}%2C${team["Sup1"].champion}`;
        const team2string = `${team["Top2"].champion}%2C${team["Jung2"].champion}%2C${team["Mid2"].champion}%2C${team["Bot2"].champion}%2C${team["Sup2"].champion}`;

        fetch(`http://localhost:8088/compare_teams?team_1=${team1string}&team_2=${team2string}`)
            .then(data => {
                return data.json();
            })
            .then(data => {                
                const chance = data.win_chance;
                setPercent(chance);
                if(chance > 50){
                    setTurn(true);
                };
            })
            .catch(err => {
                console.log(err);
            });
    }, [trigger]);  

    const fightOnClick = () => {
        let flag = false;
        Object.keys(team1).map((index)=>{
            if(team1[index].champion === "") {
                flag = true;
            }
        });
        Object.keys(team2).map((index)=>{
            if(team2[index].champion === "") {
                flag = true;
            }
        });
        
        if(flag){
            setOpen(true);
            setMessage("Teams must be filled completely!");
        } else {
            setFade(800);
            setDisappear(true);
            setRun(true);
            setTrigger(prevState=>{ !prevState });
        }
    }

    const onTileClick = (champKey, loadingUrl) => {
        setTeam({...team, [`${positions[currentCard%5]}${(currentCard < 5) ? "1" :"2"}`]: {champion: champKey, src: `/graphics/loading/${loadingUrl}`}});
        setSelected({...selected,[currentCard]: champKey});

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
                            {Object.keys(champData).map((index) =>
                            {
                                const dis =  Object.values(selected).includes(champData[index].key);
                                return (
                                    <Grid item key={index}>
                                        <Button
                                            onClick={()=>onTileClick(champData[index].key, `${index}_0.jpg`)}
                                            disabled={dis}
                                        >
                                            <img 
                                                className={ clsx({[classes.grayOut]: dis })}
                                                src={`/graphics/champion/${champData[index].image.full}`}/>
                                        </Button>
                                    </Grid>
                                )
                            })}
                        </Grid>
                        <div className={classes.gradientBorder}></div>
                    </Paper>
                </Fade>
            </Modal>
            <Modal
                className={classes.modal}
                open={disappear}
                onClose={handleModalClose2}
                closeAfterTransition
                disableEscapeKeyDown
                disableBackdropClick
                disableEnforceFocus
                disableAutoFocus
            >   
                <Fade in={disappear}> 
                    <Grid container>
                        <Grid item xs={12} style={{height: '50vh'}}>
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
                                    style={{height: '100px', width: 'auto'}}
                                    className={clsx({[classes.rotatingBlue]:run, [classes.turn]: turn})}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <img src="https://static-cdn.jtvnw.net/emoticons/v1/302703811/2.0" className={classes.hidingblue}/>
                            <Typography variant="h1" style={{fontFamily: "'Big Shoulders Stencil Text', cursive", color: 'white'}}>
                                {percent}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} style={{paddingTop: '10vh'}}>
                            <Button color="default" onClick={reset} style={{backgroundColor: '#2468BF'}}>
                                <Typography variant="h2" style={{fontFamily: "'Big Shoulders Stencil Text', cursive", color: 'white'}}>
                                    Reset
                                </Typography>
                            </Button>
                        </Grid>
                        
                    </Grid>
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


            <div className={classes.center}>

                    {/* <Typography variant="h1" style={{color: 'white'}}>
                        {percent}
                    </Typography> */}
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
                <Grid item container xs={6} className={`${classes.side1} ${classes.wavepadding}`} >
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
                                <Card className={classes.champCards} style={{backgroundColor: ''}}>
                                    <CardActionArea
                                        onClick={()=>onCardClick(1, key)}
                                    >
                                        <CardHeader title={pos}/>
                                        <CardMedia
                                            style={{height:'70vh'}}
                                            image={team[pos + '1'].src}
                                        >
                                        </CardMedia>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={6} className={`${classes.side2} ${classes.wavepadding}`}>
                    <Grid item xs={12}>
                        <Paper className={classes.paperPadding} style={{backgroundColor: '#0C223F'}}>
                            <Typography variant='h3' style={{color: 'white'}}>
                                Team 2
                            </Typography>
                        </Paper>
                        <Grid item container xs={12} justify="space-evenly" style={{paddingTop: '20px'}}>
                            {positions.map((pos,key) =>(
                                <Grid item key={key}>
                                    <Card className={classes.champCards} style={{backgroundColor: '#0C223F'}}>
                                        <CardActionArea
                                            onClick={()=>onCardClick(2, key)}
                                        >
                                            <CardHeader title={pos} style={{color:"white"}}/>
                                            <CardMedia
                                                style={{height:'70vh'}}
                                                image={team[pos + '2'].src}
                                            >
                                            </CardMedia>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};