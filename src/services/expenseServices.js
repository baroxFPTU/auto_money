import { dbFirestore } from '../firebase';
import { doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';

const getExpenseDoc = (uid, expenseId) => doc(dbFirestore, `expenses/${uid}/lists`, expenseId);

export const expenseServices = {
  create: async (uid, newExpense) => {
    const expenseDoc = getExpenseDoc(uid, newExpense?.id);
    return await setDoc(expenseDoc, { ...newExpense, createAt: serverTimestamp() });
  },
  update: async (uid, expenseId, newExpense) => {
    const expenseDoc = getExpenseDoc(uid, expenseId);
    return await updateDoc(expenseDoc, {
      ...newExpense,
      updatedAt: serverTimestamp(),
    });
  },
  delete: async (uid, expenseId) => {
    const expenseDoc = getExpenseDoc(uid, expenseId);
    return await updateDoc(expenseDoc, {
      destroy: true,
    });
  },
};
