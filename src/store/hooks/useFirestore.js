import {
  addDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { convertArrayDocs } from 'utils/firebase';
import { collectionRef, dbFirestore } from '../../firebase';

function useFirestore(colName = 'expenses') {
  const user = useSelector((state) => state.auth.user);
  const [snapshot, setSnapshot] = useState(null);
  const colRef = collectionRef(colName);

  useEffect(() => {
    onSnapshot(colRef, (snapshot) => {
      const responseData = convertArrayDocs(snapshot.docs);
      setSnapshot(responseData);
    });
  }, []);

  const getDocRef = (docId) => {
    if (!docId && !user.uid) return null;
    return doc(dbFirestore, `expenses/${user?.uid}/lists`, docId);
  };

  const add = async (colRefCustom = colRef, data) => {
    if (!data) return;
    try {
      const response = await addDoc(colRefCustom, data);
      if (!response) throw new Error('Cannot add new expense.');
      return response;
    } catch (error) {
      console.log(error.message);
    }
  };

  const update = async (colRefCustom = colRef, data) => {
    if (!data) return;

    try {
      const response = await updateDoc(colRefCustom, data);
      if (!response) throw new Error('Cannot update a budget plan.');
      return response;
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAll = async (colRefCustom = colRef) => {
    const response = await getDocs(colRefCustom);
    const arrayDocs = convertArrayDocs(response.docs);
    return arrayDocs;
  };

  const getByKeyword = async (colRefCustom = colRef, keyword) => {
    // STILL error, not work
    const q = query(
      colRefCustom,
      where('data.currentTitle', '>=', keyword).where('data.currentTitle', '<=', keyword + '\uf8ff')
    );
    const response = await getDocs(q);
    const arrayDocs = convertArrayDocs(response.docs);
    console.log('🚀 ~ file: useFirestore.js:60 ~ getAll ~ arrayDocs:', arrayDocs);
    return arrayDocs;
  };

  const getById = async (docId = null) => {
    if (!docId) return;
    const docRef = getDocRef(docId);
    const response = await getDoc(docRef);
    return response;
  };

  return {
    snapshot,
    add,
    update,
    getAll,
    getById,
    getDocRef,
    getByKeyword,
  };
}

export default useFirestore;
