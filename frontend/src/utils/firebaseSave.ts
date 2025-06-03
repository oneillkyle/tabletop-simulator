import { db, doc, getDoc, setDoc } from './firebase';

export async function saveGameState(userId: string, gameState: any) {
  const ref = doc(db, 'games', userId);
  await setDoc(ref, gameState);
}

export async function loadGameState(userId: string): Promise<any> {
  const ref = doc(db, 'games', userId);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}
