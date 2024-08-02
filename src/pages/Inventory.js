import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper, Button, List, ListItem, ListItemText, Dialog, DialogContent } from '@mui/material';
import QRCode from 'qrcode.react';
import ItemForm from '../components/ItemForm';
import ContainerForm from '../components/ContainerForm';
import SearchBar from '../components/SearchBar';
import SaleForm from '../components/SaleForm';
import ReminderList from '../components/ReminderList';
import { saveItems, getItems, saveContainers, getContainers, saveSale } from '../utils/storage';

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [containers, setContainers] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filteredContainers, setFilteredContainers] = useState([]);
  const [showItemForm, setShowItemForm] = useState(false);
  const [showContainerForm, setShowContainerForm] = useState(false);
  const [selectedContainer, setSelectedContainer] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const loadedItems = getItems();
    const loadedContainers = getContainers();
    setItems(loadedItems);
    setContainers(loadedContainers);
    setFilteredItems(loadedItems);
    setFilteredContainers(loadedContainers);
  }, []);

  const handleItemSubmit = (formData) => {
    const newItem = { id: Date.now(), ...formData };
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    setFilteredItems(updatedItems);
    saveItems(updatedItems);
    setShowItemForm(false);
  };

  const handleContainerSubmit = (formData) => {
    const newContainer = { id: Date.now(), ...formData };
    const updatedContainers = [...containers, newContainer];
    setContainers(updatedContainers);
    setFilteredContainers(updatedContainers);
    saveContainers(updatedContainers);
    setShowContainerForm(false);
  };

  const handleSearch = (searchTerm) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    
    const filteredItems = items.filter(item => 
      item.title.toLowerCase().includes(lowercasedTerm) || 
      item.description.toLowerCase().includes(lowercasedTerm)
    );
    
    const filteredContainers = containers.filter(container => 
      container.name.toLowerCase().includes(lowercasedTerm) || 
      container.code.toLowerCase().includes(lowercasedTerm)
    );

    setFilteredItems(filteredItems);
    setFilteredContainers(filteredContainers);
  };

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
      <Typography variant="h4" gutterBottom>Inventario</Typography>
      <SearchBar onSearch={handleSearch} />
      
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
        
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>Contenitori</Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => setShowContainerForm(true)}
              style={{ marginBottom: '20px' }}
            >
              Aggiungi Contenitore
            </Button>
            {showContainerForm && <ContainerForm onSubmit={handleContainerSubmit} />}
            <List>
              {filteredContainers.map((container) => (
                <ListItem key={container.id} button onClick={() => setSelectedContainer(container)}>
                  <ListItemText primary={container.name} secondary={`Codice: ${container.code}`} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <ReminderList />
        </Grid>
      </Grid>

      <Dialog open={!!selectedContainer} onClose={() => setSelectedContainer(null)}>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            QR Code per {selectedContainer?.name}
          </Typography>
          {selectedContainer && (
            <QRCode value={`https://tuodominio.com/container/${selectedContainer.code}`} size={256} />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedItem} onClose={() => setSelectedItem(null)}>
        <DialogContent>
          <SaleForm item={selectedItem} onSubmit={handleSaleSubmit} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Inventory;