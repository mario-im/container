import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import ReportGenerator from '../components/ReportGenerator';

const Reports = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Report</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ReportGenerator />
        </Grid>
      </Grid>
    </div>
  );
};

export default Reports;