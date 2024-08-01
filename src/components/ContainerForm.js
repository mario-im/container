import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@material-ui/core';
import QRCode from 'qrcode.react';

const ContainerForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    code: initialData.code || '',
    location: initialData.location || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Paper style={{ padding: '20px' }}>
      <Typography variant="h6" gutterBottom>
        {initialData.id ? 'Modifica Contenitore' : 'Aggiungi Nuovo Contenitore'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="name"
              label="Nome Contenitore"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="code"
              label="Codice Contenitore"
              value={formData.code}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="location"
              label="Posizione"
              value={formData.location}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              {initialData.id ? 'Aggiorna' : 'Aggiungi'}
            </Button>
          </Grid>
        </Grid>
      </form>
      {formData.code && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Typography variant="subtitle1" gutterBottom>
            QR Code per il contenitore:
          </Typography>
          <QRCode value={`https://tuodominio.com/container/${formData.code}`} />
        </div>
      )}
    </Paper>
  );
};

export default ContainerForm;