import React from 'react';
import { Modal } from '@mui/material';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import { Stack } from '@mui/material';
import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Divider } from '@mui/material';
import {TextField} from '@mui/material';
import { Button } from '@mui/material';

export default function SettingsModal({ open, handleClose, pomodoroRef, pausaPequenaRef, pausaLargaRef, updateDefaultValues}) {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "33%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: "15px",
    p: 4,
  };

  const inputs = [
    {
      value: "Pomodoro",
      ref: pomodoroRef,
      defaultValue: 25
    },
    {
      value: "Pausa Pequeña",
      ref: pausaPequenaRef,
      defaultValue: 5
    },
    {
      value: "Pausa Larga",
      ref: pausaLargaRef,
      defaultValue: 15
    }
  ];

  return (
    <Modal open={open} onClose={handleClose} keepMounted={true}>
      <Box sx={style}>
        <Stack
          direction="column"
          spacing={2}
        >
          <Stack 
          direction="row"
          display="flex"
          justifyContent="space-between"
          spacing={2}
          > 
            <Typography variant="h6" component="h1">Ajustes de Tiempo</Typography>
            <IconButton onClick={handleClose}>
                <Close/>
            </IconButton>
          </Stack>
          <Divider variant="middle" />
          <Stack 
          direction="row"
          display="flex"
          justifyContent="space-between"
          spacing={2}
          >
            {inputs.map((input, index) => (
              <div key={index}>
                <Typography variant="subtitle1" component="h1">{input.value}</Typography>
                <TextField id="outlined-basic" variant="outlined" type="number" defaultValue={input.defaultValue} inputRef={input.ref}/>
              </div>
            ))}
          </Stack>
          <Stack 
          direction="row"
          display="flex"
          justifyContent="center"
          spacing={2}
          >
            <Button variant="contained" color="success" sx={{width: "100%"}} onClick={updateDefaultValues}>Guardar</Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  )
}
