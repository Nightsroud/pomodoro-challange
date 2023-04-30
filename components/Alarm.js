import React from 'react'

/**
 * Function that creates the Alarm component that triggers once the timer runs out
 */
const Alarm = React.forwardRef((_, ref) =>{
    return (
        <audio ref={ref}>
            <source src='/alarm.mp3' type='audio/mp3'/>
            Su browser no puede reproducir este audio
        </audio>
      )
    }
);

export default Alarm;
