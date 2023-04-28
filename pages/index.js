import Grid2 from '@mui/material/Unstable_Grid2';
import { IconButton } from '@mui/material';
import { Button } from '@mui/material';
import { Settings } from '@mui/icons-material';
import { Box } from '@mui/material';
import Timer from '../components/Timer.js';
import { useState, useEffect } from 'react';

export default function Index() {

  const [pomodoro, setPomodoro] = useState(25);
  const [pausaPequena, setPausaPequena] = useState(5);
  const [pausaLarga, setPausaLarga] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [ticking, setTicking] = useState(false);

  const [selector, setSelector] = useState(0);

  const selectOption = (index) => {
    setSelector(index);
  };

  const getTime = (selector) => {
    const type = {
      0: pomodoro,
      1: pausaPequena,
      2: pausaLarga
    }
    return type[selector];
  }

  const timerTicking = () => {
    const minutes = getTime(selector);
    const setMinutes = updateMinutes();

    if(minutes == 0 && seconds == 0){
      alert('Se acabo el tiempo');
    } else if (seconds == 0){
      setMinutes((minute) => minute - 1);
      setSeconds(59);
    } else {
      setSeconds((second) => second - 1);
    }
  }

  const updateMinutes = () => {
    const updateSelection = {
      0: setPomodoro,
      1: setPausaPequena,
      2: setPausaLarga
    }
    return updateSelection[selector];
  };

  useEffect(() => {
    const time = setInterval(() => {if(ticking){timerTicking()}}, 1000);

    return () => {
      clearInterval(time);
    }
  },[seconds, pomodoro, pausaPequena, pausaLarga, ticking]);

  return (
  <Grid2 container spacing={2} columns={3}>

        <Grid2 xs display="flex" justifyContent="right" alignItems="right"></Grid2>

        <Grid2 xs container columns={1}>
          <Grid2 xs={4} display="flex" justifyContent="right" alignItems="right">
            <IconButton size='large'>
              <Settings/>
            </IconButton>
          </Grid2>
          <Grid2 xs display="flex" justifyContent="center" alignItems="center">
             <Timer 
              selector={selector} 
              selectOption={selectOption} 
              getTime={getTime}
              seconds={seconds}
              ticking={ticking}
              setTicking={setTicking}
             />
          </Grid2>

        </Grid2>

        <Grid2 xs display="flex" justifyContent="right" alignItems="right"></Grid2>

      </Grid2>
  )
}

