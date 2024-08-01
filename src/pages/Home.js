import React from 'react';
import ItemForm from '../components/ItemForm';

const Home = () => {
  const handleSubmit = (formData) => {
    console.log('Dati del form:', formData);
    // Qui in futuro gestirai l'invio dei dati al backend
  };

  return (
    <div>
      <h1>Gestione Inventario</h1>
      <ItemForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Home;