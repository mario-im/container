import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper, Button, List, ListItem, ListItemText, Dialog, DialogContent } from '@mui/material';
import QRCode from 'qrcode.react';
import ItemForm from '../components/ItemForm';
import ContainerForm from '../components/ContainerForm';
import SearchBar from '../components/SearchBar';
import SaleForm from '../components/SaleForm';
import { saveItems, getItems, saveContainers, getContainers, saveSale } from '../utils/storage';

const Inventory = () => {
  // ... (stato precedente)
  const [selectedItem, setSelectedItem] = useState(null);

  // ... (funzioni precedenti)

  const handleSaleSubmit = (saleData) => {
    saveSale(saleData);
    const updatedItems = items.map(item => 
      item.id === saleData.itemId 
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setItems(updatedItems);
    setFilteredItems(updatedItems);
    saveItems(updatedItems);
    setSelectedItem(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* ... (contenuto precedente) */}
      
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>Oggetti</Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => setShowItemForm(true)}
              style={{ marginBottom: '20px' }}
            >
              Aggiungi Oggetto
            </Button>
            {showItemForm && <ItemForm onSubmit={handleItemSubmit} />}
            <List>
              {filteredItems.map((item) => (
                <ListItem key={item.id} button onClick={() => setSelectedItem(item)}>
                  <ListItemText primary={item.title} secondary={`Quantità: ${item.quantity}`} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        
        {/* ... (contenuto dei contenitori) */}
      </Grid>

      {/* ... (Dialog per QR Code) */}

      <Dialog open={!!selectedItem} onClose={() => setSelectedItem(null)}>
        <DialogContent>
          <SaleForm item={selectedItem} onSubmit={handleSaleSubmit} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Inventory;