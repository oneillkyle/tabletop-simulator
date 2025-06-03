import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, child } from 'firebase/database';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-game.firebaseapp.com",
  databaseURL: "https://your-game.firebaseio.com",
  projectId: "your-game",
  storageBucket: "your-game.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:example"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const saveCampaignProgress = async (userId, progress) => {
  await set(ref(db, 'campaigns/' + userId), progress);
};

export const loadCampaignProgress = async (userId) => {
  const snapshot = await get(child(ref(db), 'campaigns/' + userId));
  return snapshot.exists() ? snapshot.val() : null;
};
