import React from 'react';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { Stack } from '@mui/material';
import { VolumeOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#e3f2fd',
    }
  },
});

export default function Timer({ selector, selectOption, getTime, seconds, ticking, startAlarm, timesUp, muteAlarm, reset}) {
    const options = ["Pomodoro", "Pausa Corta", "Pausa Larga"];
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
        <ThemeProvider theme={theme}>
          <Typography variant="h1" color='primary'>{getTime(selector)}:{seconds.toString().padStart(2, "0")}</Typography>
        </ThemeProvider>
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
            <Button variant='outlined' onClick={reset}>Resetear</Button>
          </ThemeProvider>)}
    </Stack>
  )
}
