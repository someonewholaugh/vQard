import { addDoc, collection, getDocs, QuerySnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { FormData } from '@/types';

const ref = collection(db, 'vcards');

export const addVCard = async (data: FormData): Promise<string> => {
  try {
    const { avatar, ...payload } = data;
    const docRef = await addDoc(ref, { 
      ...payload, 
      createdAt: serverTimestamp() 
    });
    return docRef.id;
  } catch (error) {
    console.error('Failed to add vCard:', error);
    throw new Error('Unable to add vCard. Please try again later.');
  }
};

export const getVCard = async (): Promise<QuerySnapshot> => {
  try {
    return await getDocs(ref);
  } catch (error) {
    console.error('Failed to fetch vCards:', error);
    throw new Error('Unable to fetch vCards. Please try again later.');
  }
};
