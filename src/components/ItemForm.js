import React, { useState } from 'react';
import { TextField, Button, Grid, MenuItem } from '@mui/material';

const ItemForm = ({ onSubmit, containers }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    quantity: 1,
    salePrice: 0,
    containerId: '',
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
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="title"
            label="Titolo"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="description"
            label="Descrizione"
            value={formData.description}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            type="number"
            name="quantity"
            label="Quantità"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            type="number"
            name="salePrice"
            label="Prezzo di vendita"
            value={formData.salePrice}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            select
            fullWidth
            name="containerId"
            label="Contenitore"
            value={formData.containerId}
            onChange={handleChange}
            required
          >
            {containers.map((container) => (
              <MenuItem key={container.id} value={container.id}>
                {container.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Aggiungi Oggetto
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ItemForm;