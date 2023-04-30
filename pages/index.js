import { IconButton } from '@mui/material';
import { Stack } from '@mui/material';
import { Settings } from '@mui/icons-material';
import { Box } from '@mui/material';
import Timer from '../components/Timer.js';
import { useState, useEffect, useRef } from 'react';
import Alarm from '../components/Alarm.js';
import SettingsModal from '../components/SettingsModal.js';
import React from 'react';

/**
 * 
 * @returns Principal aplication window
 */
export default function Index() {

  const [pomodoro, setPomodoro] = useState(25);
  const [pausaPequena, setPausaPequena] = useState(5);
  const [pausaLarga, setPausaLarga] = useState(15);
  const [originalPomodoro, setOriginalPomodoro] = useState(25);
  const [originalPausaPequena, setOriginalPausaPequena] = useState(5);
  const [originalPausaLarga, setOriginalPausaLarga] = useState(15);
  const [seconds, setSeconds] = useState(0);
  const [ticking, setTicking] = useState(false);
  const [usedSecond, setUsedSecond] = useState(0);
  const [timesUp, setTimesUp] = useState(false);
  const [originalTime, setOriginalTime] = useState(25);

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
  
  /**
   * Function used to set numerical values of the timer using settings modal, also resets timer
   */
  const updateDefaultValues = () => {
    setPomodoro(pomodoroRef.current.value);
    setPausaPequena(pausaPequenaRef.current.value);
    setPausaLarga(pausaLargaRef.current.value);
    setOriginalPomodoro(pomodoroRef.current.value);
    setOriginalPausaPequena(pausaPequenaRef.current.value);
    setOriginalPausaLarga(pausaLargaRef.current.value);
    setOpen(false);
    setSeconds(0);
    setUsedSecond(0);
    setOriginalTime(getOriginalTime());
  };

  /**
   * Function used to warn the user in case they switch timer in the middle of the countdown
   * Timer is reset in case user switches
   * @param {Number} index 
   */
  const selectOption = (index) => {
    const switching = usedSecond && selector !== index ? 
    confirm("Estas seguro que quieres cambiar de temporizador?"): false;
    if (switching) {
      setSelector(index);
      reset();
    } else if(!usedSecond){
      setSelector(index);
    }
  };

  /**
   * Function used to get time values from any of the three available variables
   * @returns Number
   */
  const getTime = () => {
    const type = {
      0: pomodoro,
      1: pausaPequena,
      2: pausaLarga
    }
    return type[selector];
  };

  /**
   * Function used to get start time values from any of the three available variables
   * @returns Number
   */
  const getOriginalTime = () => {
    const type = {
      0: originalPomodoro,
      1: originalPausaPequena,
      2: originalPausaLarga
    }
    return type[selector];
  };

  /**
   * Function used to reset timer state once time is up as well as play the alarm
   */
  const timeUp = () => {
    reset();
    setTimesUp(true);
    alarmRef.current.play();
  };

  /**
   * Function used to mute the alarm
   */
  const muteAlarm = () => {
    alarmRef.current.pause();
    alarmRef.current.currentTime = 0;
  };

  /**
   * Function to setup the alarm, resets values
   */
  const startAlarm = () => {
    setTimesUp(false);
    muteAlarm();
    setTicking((ticking) => !ticking);
  };

  /**
   * Function to reset timer minutes, seconds and state values
   */
  const reset = () =>{
    setTicking(false);
    setSeconds(0);
    setUsedSecond(0);
    updateDefaultValues();
  };

  /**
   * Function that deducts seconds and minutes from the timer when needed
   */
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

  /**
   * Function that selects which update method to use
   * @returns Set Method for minute values
   */
  const updateMinutes = () => {
    const updateSelection = {
      0: setPomodoro,
      1: setPausaPequena,
      2: setPausaLarga
    }
    return updateSelection[selector];
  };

  /**
   * Function from react library used to make the timer actually tick
   * and update minutes and seconds values
   */
  useEffect(() => {
    window.onbeforeunload = () => {
			return usedSecond ? "Show waring" : null;
		};
    const time = setInterval(() => {
      if(ticking) {
        setOriginalTime(getOriginalTime());
        setUsedSecond((sec) => sec + 1);
        timerTicking();
      }
    }, 1000);

    return () => {
      clearInterval(time);
    }
  },[seconds, pomodoro, pausaPequena, pausaLarga, ticking, originalTime]);

  return (
    <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
       <IconButton size='large' onClick={handleOpen}>
              <Settings/>
      </IconButton>
      <Timer
        originalTime={originalTime}
        selectOption={selectOption} 
        getTime={getTime}
        seconds={seconds}
        ticking={ticking}
        startAlarm={startAlarm}
        timesUp={timesUp}
        muteAlarm={muteAlarm}
        reset={reset}
        />
        <Alarm ref={alarmRef}/>
        <SettingsModal 
        open={open} 
        handleClose={handleClose}
        pomodoroRef={pomodoroRef}
        pausaPequenaRef={pausaPequenaRef}
        pausaLargaRef={pausaLargaRef}
        updateDefaultValues={updateDefaultValues}
        />
      </Stack>
  )
}

