import React, { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText, Paper } from '@mui/material';
import { checkForReminders } from '../utils/reminderSystem';

const ReminderList = () => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    setReminders(checkForReminders());
  }, []);

  return (
    <Paper style={{ padding: '20px' }}>
      <Typography variant="h6" gutterBottom>Promemoria</Typography>
      {reminders.length > 0 ? (
        <List>
          {reminders.map((reminder) => (
            <ListItem key={reminder.itemId}>
              <ListItemText
                primary={reminder.itemName}
                secondary={`In inventario da ${reminder.daysInInventory} giorni`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>Nessun promemoria al momento.</Typography>
      )}
    </Paper>
  );
};

export default ReminderList;