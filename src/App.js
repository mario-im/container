import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import ItemForm from './components/ItemForm';
import Inventory from './pages/Inventory';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Gestione Inventario
            </Typography>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/inventory">Inventario</Button>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route exact path="/">
            <div className="App-header">
              <h1>Benvenuto nella Gestione Inventario</h1>
              <ItemForm onSubmit={(formData) => console.log('Dati del form:', formData)} />
            </div>
          </Route>
          <Route path="/inventory">
            <Inventory />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;