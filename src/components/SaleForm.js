import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@material-ui/core';

const SaleForm = ({ item, onSubmit }) => {
  const [salePrice, setSalePrice] = useState(item.salePrice);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      itemId: item.id,
      salePrice: parseFloat(salePrice),
      saleDate: new Date().toISOString(),
    });
  };

  return (
    <Paper style={{ padding: '20px' }}>
      <Typography variant="h6" gutterBottom>
        Registra Vendita
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography>
              Oggetto: {item.title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              type="number"
              label="Prezzo di Vendita"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Registra Vendita
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default SaleForm;