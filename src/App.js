import React from 'react';
import ItemForm from './components/ItemForm';
import './App.css';

function App() {
  const handleSubmit = (formData) => {
    console.log('Dati del form:', formData);
    // Qui in futuro gestirai l'invio dei dati al backend
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestione Inventario</h1>
        <ItemForm onSubmit={handleSubmit} />
      </header>
    </div>
  );
}

export default App;