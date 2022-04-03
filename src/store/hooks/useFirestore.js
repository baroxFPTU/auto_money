import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { collectionRef, dbFirestore } from "../../firebase";


function useFirestore(colName) {
  const [snapshot, setSnapshot] = useState(null);
  const colRef = collectionRef(colName);

  useEffect(() => {
    onSnapshot(colRef, (snapshot) => {
      const responseData = [];

      snapshot.docs.forEach(doc => {
        responseData.push(doc.data());
      });

      setSnapshot(responseData);
    });
  }, []);

  const add = async (colRefCustom = null, data) => {
    if (!data) return;
    try {
      const response = await addDoc(colRefCustom || colRef, data);
      if (!response) throw new Error('Cannot add new expense.');

      return response;
    } catch (error) {
      console.log(error.message);
    }
  }
  
  return {
    snapshot,
    add,
  };
}

export default useFirestore;