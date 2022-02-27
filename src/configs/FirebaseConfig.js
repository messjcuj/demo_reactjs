
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAW7zVdlwhYW2bNThbDi-BLjiqhLVdKSlM",
  authDomain: "demoreactjs-2af95.firebaseapp.com",
  projectId: "demoreactjs-2af95",
  storageBucket: "demoreactjs-2af95.appspot.com",
  messagingSenderId: "768268736781",
  appId: "1:768268736781:web:fdbae44efce928e08cf844",
  measurementId: "G-2QV3EGJSW9"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);