const getItemsFromLS = (key: string): any[] => JSON.parse(localStorage.getItem(key) ?? '[]');

export const addToLS = (key: string, newItem: any): void => {
  const items = getItemsFromLS(key);
  items.push(newItem);
  localStorage.setItem(key, JSON.stringify(items));
};

export const getFromLS = (key: string): any[] => getItemsFromLS(key);

export const findCardID = (key: string, id: string | number): any | null => {
  const items = getItemsFromLS(key);
  return items.find((item: any) => item.id === id) ?? null;
};
