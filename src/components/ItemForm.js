import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@material-ui/core';

const ItemForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    quantity: initialData.quantity || 1,
    year: initialData.year || new Date().getFullYear(),
    details: initialData.details || '',
    salePrice: initialData.salePrice || 0,
    desiredPrice: initialData.desiredPrice || 0,
    maxDiscount: initialData.maxDiscount || 0,
    containerId: initialData.containerId || '',
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
        {initialData.id ? 'Modifica Oggetto' : 'Aggiungi Nuovo Oggetto'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="title"
              label="Titolo"
              value={formData.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="description"
              label="Descrizione"
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              type="number"
              name="quantity"
              label="Quantità"
              value={formData.quantity}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type="number"
              name="year"
              label="Anno"
              value={formData.year}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              name="details"
              label="Dettagli"
              value={formData.details}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              type="number"
              name="salePrice"
              label="Prezzo di Vendita"
              value={formData.salePrice}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              type="number"
              name="desiredPrice"
              label="Prezzo Desiderato"
              value={formData.desiredPrice}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              type="number"
              name="maxDiscount"
              label="Sconto Massimo (%)"
              value={formData.maxDiscount}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="containerId"
              label="ID Contenitore"
              value={formData.containerId}
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
    </Paper>
  );
};

export default ItemForm;