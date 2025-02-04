const DB_NAME = 'vqardDB';
const DB_VERSION = 1;

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      initializeObjectStores(db);
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const initializeObjectStores = (db: IDBDatabase) => {
  const storeNames = ['Personal', 'Favorites'];
  storeNames.forEach((storeName) => {
    if (!db.objectStoreNames.contains(storeName)) {
      db.createObjectStore(storeName, { keyPath: 'id' });
    }
  });
};

const addTimestamp = (item: any) => ({
  ...item,
  updatedAt: new Date().toISOString(),
});

const runTransaction = (
  storeName: string,
  mode: IDBTransactionMode,
  operation: (store: IDBObjectStore) => void
) => {
  return new Promise<void>((resolve, reject) => {
    openDB().then((db) => {
      const transaction = db.transaction(storeName, mode);
      const store = transaction.objectStore(storeName);

      operation(store);

      transaction.oncomplete = () => resolve(undefined);
      transaction.onerror = () => reject(transaction.error);
    });
  });
};

export const saveToDB = async (storeName: string, item: any) => {
  const itemWithTimestamp = addTimestamp(item);

  await runTransaction(storeName, 'readwrite', (store) => {
    store.put(itemWithTimestamp);
  });

  return itemWithTimestamp;
};

export const getAllFromDB = async (storeName: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    openDB().then((db) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  });
};

export const getByIdFromDB = async (storeName: string, id: string) => {
  return new Promise((resolve, reject) => {
    openDB().then((db) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result ?? null);
      request.onerror = () => reject(request.error);
    });
  });
};

export const deleteFromDB = async (storeName: string, id: string) => {
  await runTransaction(storeName, 'readwrite', (store) => {
    store.delete(id);
  });

  return id;
};

export const findId = async (storeName: string, id: string): Promise<any | null> => {
  try {
    const item = await getByIdFromDB(storeName, id);
    return item ?? null;
  } catch (error) {
    console.error('Error while fetching from IndexedDB:', error);
    return null;
  }
};

export const isIdInDB = async (storeName: string, id: string): Promise<boolean> => {
  const data = await getByIdFromDB(storeName, id);
  return data !== null;
};
