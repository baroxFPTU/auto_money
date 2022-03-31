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

  const add = async (data) => {
    if (!data) return;
    try {
      await addDoc(colRef, data);
    } catch (error) {
      console.log(error);
    }
  }
  
  return {
    snapshot,
    add,
  };
}

export default useFirestore;