import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import Reports from './pages/Reports';
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
            <Button color="inherit" component={Link} to="/reports">Report</Button>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/inventory" component={Inventory} />
          <Route path="/reports" component={Reports} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;