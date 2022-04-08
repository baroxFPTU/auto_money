import { addDoc, getDoc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { convertArrayDocs } from "utils/firebase";
import { collectionRef } from "../../firebase";


function useFirestore(colName = 'expenses') {
  const [snapshot, setSnapshot] = useState(null);
  const colRef = collectionRef(colName);

  useEffect(() => {
    onSnapshot(colRef, (snapshot) => {
     const responseData = convertArrayDocs(snapshot.docs);
      setSnapshot(responseData);
    });
  }, []);

  const add = async (colRefCustom = colRef, data) => {
    if (!data) return;
    try {
      const response = await addDoc(colRefCustom, data);
      if (!response) throw new Error('Cannot add new expense.');
      return response;
    } catch (error) {
      console.log(error.message);
    }
  }

  const update = async (colRefCustom = colRef, data) => {
    if (!data) return;

    try {
      const response = await updateDoc(colRefCustom, data);
      if (!response) throw new Error('Cannot update a budget plan.');
      return response;
    } catch (error) {
      console.log(error.message);
    }
  }

  const getAll = async (colRefCustom = colRef) => {
    const response = await getDocs(colRefCustom);
    const arrayDocs = convertArrayDocs(response.docs);
    return arrayDocs;
  }
  
  return {
    snapshot,
    add,
    update,
    getAll
  };
}

export default useFirestore;