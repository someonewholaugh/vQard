export const getItemsFromLS = (key: string): any[] => JSON.parse(localStorage.getItem(key) ?? '[]');

export const getFromLS = (key: string): any[] => getItemsFromLS(key);

export const saveItemsToLS = (key: string, items: any[]): void => {
  localStorage.setItem(key, JSON.stringify(items));
};

export const addToLS = (key: string, newItem: any): void => {
  const items = getItemsFromLS(key);
  items.push(newItem);
  saveItemsToLS(key, items);
};

export const findCardById = (key: string, id: string): any | null => {
  const items = getItemsFromLS(key);
  return items.find((item: any) => item.id === id) ?? null;
};

export const isCardIdInLS = (key: string, id: string): boolean => {
  const items = getItemsFromLS(key);
  return items.some((item: any) => {
    if (typeof item === 'object' && item !== null) {
      return item.id === id;
    }
    return item === id;
  });
};

export const deleteFromLS = (key: string, id: string): void => {
  const items = getItemsFromLS(key);
  const updatedItems = items.filter((item: any) => {
    if (typeof item === 'object' && item !== null) {
      return item.id !== id;
    }
    return item !== id;
  });
  saveItemsToLS(key, updatedItems);
};
