#!/bin/bash

# Aggiornamento package.json
sed -i '' 's/"react-router-dom": "^5.2.0"/"react-router-dom": "^6.10.0"/' package.json
sed -i '' 's/"@material-ui\/core": "^4.12.3"/"@mui\/material": "^5.11.0"/' package.json
sed -i '' 's/"@material-ui\/icons": "^4.11.3"/"@mui\/icons-material": "^5.11.0"/' package.json

# Installazione delle nuove dipendenze
npm install @emotion/react @emotion/styled qrcode.react

# Aggiornamento dei file sorgente
find src -type f -name "*.js" -exec sed -i '' 's/@material-ui\/core/@mui\/material/g' {} +
find src -type f -name "*.js" -exec sed -i '' 's/@material-ui\/icons/@mui\/icons-material/g' {} +

# Aggiornamento di App.js per react-router-dom v6
sed -i '' 's/Switch/Routes/g' src/App.js
sed -i '' 's/<Route exact path="/" component={Home} \/>/<Route path="/" element={<Home \/>} \/>/g' src/App.js
sed -i '' 's/<Route path="\/inventory" component={Inventory} \/>/<Route path="\/inventory" element={<Inventory \/>} \/>/g' src/App.js
sed -i '' 's/<Route path="\/reports" component={Reports} \/>/<Route path="\/reports" element={<Reports \/>} \/>/g' src/App.js

# Aggiunta della funzione handleSearch in Inventory.js
echo "
const handleSearch = (searchTerm) => {
  // Implementa la logica di ricerca qui
  console.log('Searching for:', searchTerm);
};
" >> src/pages/Inventory.js

# Reinstallazione delle dipendenze
rm -rf node_modules
npm install

echo "Aggiornamento completato. Per favore, verifica i cambiamenti e esegui 'npm start' per testare l'applicazione."