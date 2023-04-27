import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Grid2 from '@mui/material/Unstable_Grid2';
import { IconButton } from '@mui/material';
import { Button } from '@mui/material';
import { Settings } from '@mui/icons-material';
import { Box } from '@mui/material';

export default function Index() {
  return (
    <Box display="flex"
    justifyContent="center"
    alignSelf="center"
    >
      <Grid2 container spacing={2} >

      <Grid2 xs={8} display="flex" justifyContent="right" alignItems="right">
        </Grid2>

        <Grid2 xs={4} display="flex" justifyContent="right" alignItems="right">
          <IconButton>
            <Settings/>
          </IconButton>
        </Grid2>

      </Grid2>
    </Box>
  )
}
