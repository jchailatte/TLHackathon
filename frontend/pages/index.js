import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

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
        padding: '10px'
    }
}));


export default function Index(props){

    const classes= useStyles();

    // const winRate = useGet("localhost:8080/compare",
    //     {
    //         player_a: "DoubleLift",
    //         player_b: "Tactical"
    //     }
    // );

    return(
        <Grid container align="center">
            <Grid item xs={12}>

            </Grid>
            <Grid item xs={6} className={classes.side1}>
                <img
                    src="/graphics/doublelift.png"
                    className={classes.playerImg}
                />
                <Paper className={classes.paperPadding}>
                    <Typography variant='h3'> 
                        DoubleLift
                    </Typography>
                    
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <img
                    src="/graphics/tactical.png"
                    className={classes.playerImg}
                />
                <Paper className={classes.paperPadding} style={{backgroundColor: '#0C223F'}}>
                    <Typography variant='h3' style={{color: 'white'}} >
                        Tactical
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};