import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Grid, 
  Paper, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  Dialog, 
  DialogContent, 
  IconButton,
  DialogTitle,
  DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
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

  const handleDeleteItem = (itemId) => {
    const updatedItems = items.filter(item => item.id !== itemId);
    setItems(updatedItems);
    setFilteredItems(updatedItems);
    saveItems(updatedItems);
    if (selectedContainer) {
      handleContainerClick(selectedContainer);
    }
  };

  const handleDeleteContainer = (containerId) => {
    const updatedContainers = containers.filter(container => container.id !== containerId);
    setContainers(updatedContainers);
    setFilteredContainers(updatedContainers);
    saveContainers(updatedContainers);

    const updatedItems = items.map(item => 
      item.containerId === containerId ? { ...item, containerId: null } : item
    );
    setItems(updatedItems);
    setFilteredItems(updatedItems);
    saveItems(updatedItems);
  };

  const handleContainerClick = (container) => {
    const itemsInContainer = items.filter(item => item.containerId === container.id);
    setSelectedContainer({ ...container, items: itemsInContainer });
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
            {showItemForm && <ItemForm onSubmit={handleItemSubmit} containers={containers} />}
            <List>
              {filteredItems.map((item) => (
                <ListItem key={item.id} 
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteItem(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText 
                    primary={item.title} 
                    secondary={`Quantità: ${item.quantity}, Contenitore: ${containers.find(c => c.id === item.containerId)?.name || 'Nessuno'}`} 
                    onClick={() => setSelectedItem(item)}
                  />
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
                <ListItem key={container.id} 
                  button 
                  onClick={() => handleContainerClick(container)}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={(e) => { e.stopPropagation(); handleDeleteContainer(container.id); }}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText 
                    primary={container.name} 
                    secondary={`Codice: ${container.code}, Oggetti: ${items.filter(item => item.containerId === container.id).length}`} 
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <ReminderList />
        </Grid>
      </Grid>

      <Dialog 
        open={!!selectedContainer} 
        onClose={() => setSelectedContainer(null)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>{selectedContainer?.name}</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" gutterBottom>
            Codice: {selectedContainer?.code}
          </Typography>
          <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
            Contenuto:
          </Typography>
          {selectedContainer?.items.length === 0 ? (
            <Typography>Nessun oggetto in questo contenitore.</Typography>
          ) : (
            <List>
              {selectedContainer?.items.map(item => (
                <ListItem key={item.id}>
                  <ListItemText 
                    primary={item.title} 
                    secondary={`Quantità: ${item.quantity}, Prezzo: ${item.salePrice}€`} 
                  />
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteItem(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          )}
          <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
            QR Code
          </Typography>
          {selectedContainer && (
            <QRCode value={`https://tuodominio.com/container/${selectedContainer.code}`} size={256} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedContainer(null)} color="primary">
            Chiudi
          </Button>
        </DialogActions>
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