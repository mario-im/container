import React from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { getItems, getContainers, getSales } from '../utils/storage';

const ReportGenerator = () => {
  const items = getItems();
  const containers = getContainers();
  const sales = getSales();

  const totalInventoryValue = items.reduce((total, item) => total + item.salePrice * item.quantity, 0);
  const totalSales = sales.reduce((total, sale) => total + sale.salePrice, 0);
  const profit = totalSales - items.reduce((total, item) => {
    const soldItems = sales.filter(sale => sale.itemId === item.id).length;
    return total + (item.desiredPrice * soldItems);
  }, 0);

  return (
    <Paper style={{ padding: '20px' }}>
      <Typography variant="h6" gutterBottom>Report Generale</Typography>
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Metrica</TableCell>
              <TableCell align="right">Valore</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Totale oggetti in inventario</TableCell>
              <TableCell align="right">{items.reduce((total, item) => total + item.quantity, 0)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Numero di contenitori</TableCell>
              <TableCell align="right">{containers.length}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Valore totale dell'inventario</TableCell>
              <TableCell align="right">{totalInventoryValue.toFixed(2)} €</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Totale vendite</TableCell>
              <TableCell align="right">{totalSales.toFixed(2)} €</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Profitto stimato</TableCell>
              <TableCell align="right">{profit.toFixed(2)} €</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ReportGenerator;