import { getItems } from './storage';

const REMINDER_THRESHOLD_DAYS = 30; // Soglia per gli oggetti in inventario da troppo tempo

export const checkForReminders = () => {
  const items = getItems();
  const currentDate = new Date();
  const reminders = [];

  items.forEach(item => {
    const daysSinceAdded = (currentDate - new Date(item.addedDate)) / (1000 * 60 * 60 * 24);
    if (daysSinceAdded >= REMINDER_THRESHOLD_DAYS) {
      reminders.push({
        itemId: item.id,
        itemName: item.title,
        daysInInventory: Math.floor(daysSinceAdded)
      });
    }
  });

  return reminders;
};