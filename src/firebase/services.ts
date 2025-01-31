import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  getDoc,
  getDocs,
  updateDoc,
  serverTimestamp,
  QueryDocumentSnapshot,
  query,
  where,
  documentId,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import { FormData } from '@/types';

const vCardRef = collection(db, 'vcards');

export const addVCard = async (data: FormData): Promise<string> => {
  try {
    const { avatar, ...payload } = data;
    const docRef = await addDoc(vCardRef, { ...payload, createdAt: serverTimestamp() });
    return docRef.id;
  } catch (err) {
    console.error('Failed to add vCard:', err);
    throw new Error('Unable to add vCard. Please try again later.');
  }
};

export const updateVCardById = async (id: string, data: Partial<FormData>): Promise<boolean> => {
  try {
    const docRef = doc(db, 'vcards', id);
    const { avatar, ...payload } = data;
    await updateDoc(docRef, { ...payload, updatedAt: serverTimestamp() });
    return true;
  } catch (err) {
    console.error('Failed to update vCard:', err);
    throw new Error('Unable to update vCard. Please try again later.');
  }
};

export const getAllVCards = async (): Promise<FormData[]> => {
  try {
    const docSnap = await getDocs(vCardRef);
    return docSnap.docs.map((doc: QueryDocumentSnapshot) => ({
      id: doc.id,
      ...doc.data(),
    })) as FormData[];
  } catch (err) {
    console.error('Failed to fetch vCards:', err);
    throw new Error('Unable to fetch vCards. Please try again later.');
  }
};

export const getVCardById = async (id: string): Promise<FormData | object> => {
  try {
    const docRef = doc(vCardRef, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error('Document not found!');
    }

    return { id: docSnap.id, ...docSnap.data() };
  } catch (err) {
    console.error('Failed to fetch vCard by ID:', err);
    throw new Error('Unable to fetch vCard. Please try again later.');
  }
};

export const getStoredVCards = async (
  arr: (string | { id: string })[] | null
): Promise<FormData[]> => {
  try {
    const ids = arr?.map((item) => (typeof item === 'object' ? item.id : item)) ?? [];

    if (ids.length === 0) {
      return [];
    }

    const q = query(vCardRef, where(documentId(), 'in', ids));
    const docSnap = await getDocs(q);

    return docSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as FormData[];
  } catch (err) {
    console.error('Failed to fetch vCards:', err);
    throw new Error('Unable to fetch vCards. Please try again later.');
  }
};

export const deleteVCardById = async (id: string): Promise<boolean> => {
  try {
    const docRef = doc(vCardRef, id);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.error('Failed to delete vCard by ID:', err);
    throw new Error('Unable to delete vCard. Please try again later.');
  }
};
