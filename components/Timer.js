import React from 'react';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { Stack } from '@mui/material';
import { VolumeOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { CircularProgress } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#e3f2fd',
    }
  },
});

/**
 * Timer component, it contains the three buttons the timer and the start, stop and restart buttons
 * @param {int} originalTime
 * @param {function} selectOption
 * @param {function} getTime
 * @param {int} seconds
 * @param {boolean} ticking
 * @param {function} startAlarm
 * @param {boolean} timesUp
 * @param {function} muteAlarm
 * @param {function} restart
 * @returns Timer component
 */
export default function Timer({originalTime, selectOption, getTime, seconds, ticking, startAlarm, timesUp, muteAlarm, reset}) {
  const options = ["Pomodoro", "Pausa Corta", "Pausa Larga"];

    /**
   * Function that calclulates the percentage done by the timer
   * @param {int} originalTime 
   * @param {int} usedTime 
   * @returns Rounded percentil calculation for circular progress bar
   */
  const calcPercentage = (originalTime, usedTime) => {
    if (originalTime-usedTime !== 0) {
      const percentage = Math.round((originalTime-usedTime)*100/originalTime);
      return percentage;
    } else {
      return 0;
    }
  };

  return (
    
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        {options.map((option, index) => (
          <ThemeProvider key={index} theme={theme}>
            <Button size='small' key={index} onClick={() => selectOption(index)}>{option}</Button>
          </ThemeProvider>
        ))}
        </Stack>
        {ticking ? 
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <ThemeProvider theme={theme}>
              <CircularProgress variant="determinate" value={calcPercentage(originalTime, getTime())} size="100%" thickness={1.5}/>
              <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography variant="h1" component="div" color='primary'>{getTime()}:{seconds.toString().padStart(2, "0")}</Typography>
              </div>
            </ThemeProvider>
          </div>
          : <ThemeProvider theme={theme}>
              <Typography variant="h1" color='primary'>{getTime()}:{seconds.toString().padStart(2, "0")}</Typography>
            </ThemeProvider>}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Button sx={{color: 'theme.palette.primary.light'}} variant='contained' onClick={startAlarm}>{ticking? "Detener" : "Empezar"}</Button>
          {timesUp && (
            <IconButton size='large' onClick={muteAlarm}>
              <VolumeOff/>
            </IconButton>)}
        </Stack>
        {ticking && (
          <ThemeProvider theme={theme}>
            <Button variant='outlined' onClick={reset}>Reiniciar</Button>
          </ThemeProvider>)}
    </Stack>
  )
}
