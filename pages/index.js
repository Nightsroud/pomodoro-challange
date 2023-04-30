import Grid2 from '@mui/material/Unstable_Grid2';
import { IconButton } from '@mui/material';
import { Button } from '@mui/material';
import { Settings } from '@mui/icons-material';
import { Box } from '@mui/material';
import Timer from '../components/Timer.js';
import { useState, useEffect, useRef } from 'react';
import Alarm from '../components/Alarm.js';
import SettingsModal from '../components/SettingsModal.js';
import React from 'react';

export default function Index() {

  const [pomodoro, setPomodoro] = useState(25);
  const [pausaPequena, setPausaPequena] = useState(5);
  const [pausaLarga, setPausaLarga] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [ticking, setTicking] = useState(false);
  const [usedSecond, setUsedSecond] = useState(0);
  const [timesUp, setTimesUp] = useState(false);

  const [selector, setSelector] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const alarmRef = useRef();
  const pomodoroRef = useRef();
  const pausaPequenaRef = useRef();
  const pausaLargaRef = useRef();

  console.log(pomodoroRef);
  console.log(pausaPequenaRef);
  console.log(pausaLargaRef);
  
  const updateDefaultValues = () => {
    setPomodoro(pomodoroRef.current.value);
    setPausaPequena(pausaPequenaRef.current.value);
    setPausaLarga(pausaLargaRef.current.value);
    setOpen(false);
    setSeconds(0);
    setUsedSecond(0);
  };

  const selectOption = (index) => {
    const switching = usedSecond && selector !== index ? 
    confirm("Estas seguro que quieres cambiar de temporizador?"): false;
    if (switching) {
      reset();
      setSelector(index);
    } else if(!usedSecond){
      setSelector(index);
    }
  };

  const getTime = (selector) => {
    const type = {
      0: pomodoro,
      1: pausaPequena,
      2: pausaLarga
    }
    return type[selector];
  };

  const timeUp = () => {
    reset();
    setTimesUp(true);
    alarmRef.current.play();
  };

  const muteAlarm = () => {
    alarmRef.current.pause();
    alarmRef.current.currentTime = 0;
  };

  const startAlarm = () => {
    setTimesUp(false);
    muteAlarm();
    setTicking((ticking) => !ticking);
  };

  const reset = () =>{
    setTicking(false);
    setSeconds(0);
    setUsedSecond(0);
    updateDefaultValues();
  };

  const timerTicking = () => {
    const minutes = getTime(selector);
    const setMinutes = updateMinutes();

    if(minutes == 0 && seconds == 0){
      timeUp();
    } else if (seconds == 0){
      setMinutes((minute) => minute - 1);
      setSeconds(59);
    } else {
      setSeconds((second) => second - 1);
    }
  };

  const updateMinutes = () => {
    const updateSelection = {
      0: setPomodoro,
      1: setPausaPequena,
      2: setPausaLarga
    }
    return updateSelection[selector];
  };

  useEffect(() => {
    window.onbeforeunload = () => {
			return usedSecond ? "Show waring" : null;
		};
    const time = setInterval(() => {
      if(ticking) {
        setUsedSecond((sec) => sec + 1);
        timerTicking();
      }
    }, 1000);

    return () => {
      clearInterval(time);
    }
  },[seconds, pomodoro, pausaPequena, pausaLarga, ticking]);

  return (
  <Grid2 container spacing={2} columns={3}>

        <Grid2 xs display="flex" justifyContent="right" alignItems="right"></Grid2>

        <Grid2 xs container columns={1}>
          <Grid2 xs={4} display="flex" justifyContent="right" alignItems="right">
            <IconButton size='large' onClick={handleOpen}>
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
              startAlarm={startAlarm}
              timesUp={timesUp}
              muteAlarm={muteAlarm}
              reset={reset}
             />
          </Grid2>
          <Grid2 xs display="flex" justifyContent="center" alignItems="center">
             <Alarm ref={alarmRef}/>
          </Grid2>
          <Grid2 xs display="flex" justifyContent="center" alignItems="center">
             <SettingsModal 
             open={open} 
             handleClose={handleClose}
             pomodoroRef={pomodoroRef}
             pausaPequenaRef={pausaPequenaRef}
             pausaLargaRef={pausaLargaRef}
             updateDefaultValues={updateDefaultValues}
             />
          </Grid2>

        </Grid2>

        <Grid2 xs display="flex" justifyContent="right" alignItems="right"></Grid2>

      </Grid2>
  )
}

