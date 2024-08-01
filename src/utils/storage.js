const ITEMS_STORAGE_KEY = 'inventory_items';
const CONTAINERS_STORAGE_KEY = 'inventory_containers';
const SALES_STORAGE_KEY = 'inventory_sales';

export const saveItems = (items) => {
  localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
};

export const getItems = () => {
  const items = localStorage.getItem(ITEMS_STORAGE_KEY);
  return items ? JSON.parse(items) : [];
};

export const saveContainers = (containers) => {
  localStorage.setItem(CONTAINERS_STORAGE_KEY, JSON.stringify(containers));
};

export const getContainers = () => {
  const containers = localStorage.getItem(CONTAINERS_STORAGE_KEY);
  return containers ? JSON.parse(containers) : [];
};

export const saveSale = (sale) => {
  const sales = getSales();
  sales.push(sale);
  localStorage.setItem(SALES_STORAGE_KEY, JSON.stringify(sales));
};

export const getSales = () => {
  const sales = localStorage.getItem(SALES_STORAGE_KEY);
  return sales ? JSON.parse(sales) : [];
};