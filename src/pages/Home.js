import React from 'react';
import { Typography, Grid, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Benvenuto nel Sistema di Gestione Inventario
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper style={{ padding: '20px', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Inventario
            </Typography>
            <Typography paragraph>
              Gestisci il tuo inventario, aggiungi nuovi oggetti e contenitori, e tieni traccia delle quantità.
            </Typography>
            <Button component={Link} to="/inventory" variant="contained" color="primary">
              Vai all'Inventario
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper style={{ padding: '20px', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Vendite
            </Typography>
            <Typography paragraph>
              Registra le vendite, applica sconti e monitora le performance dei tuoi prodotti.
            </Typography>
            <Button component={Link} to="/sales" variant="contained" color="primary">
              Gestisci Vendite
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper style={{ padding: '20px', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Report
            </Typography>
            <Typography paragraph>
              Visualizza report dettagliati sulle tue vendite, l'inventario e le performance dei prodotti.
            </Typography>
            <Button component={Link} to="/reports" variant="contained" color="primary">
              Visualizza Report
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;