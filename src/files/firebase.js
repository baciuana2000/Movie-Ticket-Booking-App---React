import firebase from "firebase";
import "firebase/database";
var firebaseConfig = {
  apiKey: "AIzaSyDA2HWCTinb6dT7X98nhcQ3_nnshuAOcAw",
  authDomain: "licenta-ca04e.firebaseapp.com",
  projectId: "licenta-ca04e",
  storageBucket: "licenta-ca04e.appspot.com",
  messagingSenderId: "991944936450",
  appId: "1:991944936450:web:8ea30584462726d1616b1b",
};
// Initialize Firebase
var fire = firebase.initializeApp(firebaseConfig);

export default fire;
