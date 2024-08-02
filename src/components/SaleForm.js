import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

const SaleForm = ({ item, onSubmit }) => {
  const [salePrice, setSalePrice] = useState(item?.salePrice || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item) {
      onSubmit({
        itemId: item.id,
        salePrice: parseFloat(salePrice),
        saleDate: new Date().toISOString(),
      });
    }
  };

  if (!item) return <Typography>Nessun oggetto selezionato</Typography>;

  return (
    <form onSubmit={handleSubmit}>
      <Typography>Oggetto: {item.title}</Typography>
      <TextField
        label="Prezzo di vendita"
        type="number"
        value={salePrice}
        onChange={(e) => setSalePrice(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Registra Vendita
      </Button>
    </form>
  );
};

export default SaleForm;