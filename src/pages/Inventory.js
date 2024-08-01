import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper, Button, List, ListItem, ListItemText, Dialog, DialogContent } from '@material-ui/core';
import QRCode from 'qrcode.react';
import ItemForm from '../components/ItemForm';
import ContainerForm from '../components/ContainerForm';
import { saveItems, getItems, saveContainers, getContainers } from '../utils/storage';

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [containers, setContainers] = useState([]);
  const [showItemForm, setShowItemForm] = useState(false);
  const [showContainerForm, setShowContainerForm] = useState(false);
  const [selectedContainer, setSelectedContainer] = useState(null);

  useEffect(() => {
    setItems(getItems());
    setContainers(getContainers());
  }, []);

  const handleItemSubmit = (formData) => {
    const newItems = [...items, { id: Date.now(), ...formData }];
    setItems(newItems);
    saveItems(newItems);
    setShowItemForm(false);
  };

  const handleContainerSubmit = (formData) => {
    const newContainers = [...containers, { id: Date.now(), ...formData }];
    setContainers(newContainers);
    saveContainers(newContainers);
    setShowContainerForm(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Inventario</Typography>
      
      <Grid container spacing={3}>
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
              {items.map((item) => (
                <ListItem key={item.id}>
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
              {containers.map((container) => (
                <ListItem key={container.id} button onClick={() => setSelectedContainer(container)}>
                  <ListItemText primary={container.name} secondary={`Codice: ${container.code}`} />
                </ListItem>
              ))}
            </List>
          </Paper>
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
    </div>
  );
};

export default Inventory;