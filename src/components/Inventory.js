import React, { useState } from 'react';
import { Typography, Grid, Paper, Button, List, ListItem, ListItemText } from '@material-ui/core';
import ItemForm from '../components/ItemForm';
import ContainerForm from '../components/ContainerForm';

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [containers, setContainers] = useState([]);
  const [showItemForm, setShowItemForm] = useState(false);
  const [showContainerForm, setShowContainerForm] = useState(false);

  const handleItemSubmit = (formData) => {
    setItems([...items, { id: Date.now(), ...formData }]);
    setShowItemForm(false);
  };

  const handleContainerSubmit = (formData) => {
    setContainers([...containers, { id: Date.now(), ...formData }]);
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
                <ListItem key={container.id}>
                  <ListItemText primary={container.name} secondary={`Codice: ${container.code}`} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Inventory;