// // // // // hooks/firebaseConfig.ts
// // // // import { initializeApp } from "firebase/app";
// // // // import { getDatabase, ref, onValue, set } from "firebase/database";

// // // // const firebaseConfig = {
// // // //   apiKey: "AIzaSyBGMZnVoJsBoPovE5WE8m0BEi9_6Eqr8b4",
// // // //   authDomain: "echob-20f88.firebaseapp.com",
// // // //   databaseURL: "https://echob-20f88-default-rtdb.firebaseio.com",
// // // //   projectId: "echob-20f88",
// // // //   storageBucket: "echob-20f88.appspot.com",
// // // //   messagingSenderId: "468445182650",
// // // //   appId: "1:468445182650:web:c459926d13c3fecd06e083",
// // // //   measurementId: "G-5WTBDFQSJZ",
// // // // };

// // // // const app = initializeApp(firebaseConfig);
// // // // const database = getDatabase(app);

// // // // export { database, ref, onValue, set };
// // // import { initializeApp } from "firebase/app"
// // // import { getDatabase, ref, onValue, set } from "firebase/database"
// // // import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"

// // // const firebaseConfig = {
// // //   apiKey: "AIzaSyBGMZnVoJsBoPovE5WE8m0BEi9_6Eqr8b4",
// // //   authDomain: "echob-20f88.firebaseapp.com",
// // //   databaseURL: "https://echob-20f88-default-rtdb.firebaseio.com",
// // //   projectId: "echob-20f88",
// // //   storageBucket: "echob-20f88.appspot.com",
// // //   messagingSenderId: "468445182650",
// // //   appId: "1:468445182650:web:c459926d13c3fecd06e083",
// // //   measurementId: "G-5WTBDFQSJZ",
// // // }

// // // const app = initializeApp(firebaseConfig)
// // // const database = getDatabase(app)
// // // const auth = getAuth(app)

// // // export { database, auth, ref, onValue, set, createUserWithEmailAndPassword, updateProfile }

// // import { initializeApp } from "firebase/app";
// // import { getDatabase, ref, onValue, set } from "firebase/database";
// // import {
// //   getAuth,
// //   createUserWithEmailAndPassword,
// //   updateProfile,
// // } from "firebase/auth";

// // // Firebase config
// // const firebaseConfig = {
// //   apiKey: "AIzaSyBGMZnVoJsBoPovE5WE8m0BEi9_6Eqr8b4",
// //   authDomain: "echob-20f88.firebaseapp.com",
// //   databaseURL: "https://echob-20f88-default-rtdb.firebaseio.com",
// //   projectId: "echob-20f88",
// //   storageBucket: "echob-20f88.appspot.com",
// //   messagingSenderId: "468445182650",
// //   appId: "1:468445182650:web:c459926d13c3fecd06e083",
// //   measurementId: "G-5WTBDFQSJZ",
// // };

// // // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// // const database = getDatabase(app);
// // const auth = getAuth(app);

// // // Export
// // export {
// //   database,
// //   auth,
// //   ref,
// //   onValue,
// //   set,
// //   createUserWithEmailAndPassword,
// //   updateProfile,
// // };
// import { initializeApp } from "firebase/app"
// import {
//   getDatabase,
//   ref,
//   set,
//   get,
//   onValue,
// } from "firebase/database"
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   updateProfile,
//   signInWithEmailAndPassword,
// } from "firebase/auth"

// // ✅ Your actual Firebase config
// const firebaseConfig = {
//   apiKey: "AIzaSyBGMZnVoJsBoPovE5WE8m0BEi9_6Eqr8b4",
//   authDomain: "echob-20f88.firebaseapp.com",
//   databaseURL: "https://echob-20f88-default-rtdb.firebaseio.com",
//   projectId: "echob-20f88",
//   storageBucket: "echob-20f88.appspot.com",
//   messagingSenderId: "468445182650",
//   appId: "1:468445182650:web:c459926d13c3fecd06e083",
//   measurementId: "G-5WTBDFQSJZ",
// }

// // ✅ Initialize Firebase services
// const app = initializeApp(firebaseConfig)
// const database = getDatabase(app)
// const auth = getAuth(app)

// // ✅ Export everything you may need
// export {
//   database,
//   auth,
//   ref,
//   set,
//   get,
//   onValue,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   updateProfile,
// }
import { initializeApp } from "firebase/app"
import {
  getDatabase,
  ref,
  set,
  get,
  onValue,
} from "firebase/database"
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged, // ✅ Add this
  signOut              // ✅ And this
} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBGMZnVoJsBoPovE5WE8m0BEi9_6Eqr8b4",
  authDomain: "echob-20f88.firebaseapp.com",
  databaseURL: "https://echob-20f88-default-rtdb.firebaseio.com",
  projectId: "echob-20f88",
  storageBucket: "echob-20f88.appspot.com",
  messagingSenderId: "468445182650",
  appId: "1:468445182650:web:c459926d13c3fecd06e083",
  measurementId: "G-5WTBDFQSJZ",
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const auth = getAuth(app)

export {
  database,
  auth,
  ref,
  set,
  get,
  onValue,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged, // ✅ Export here
  signOut             // ✅ Export here
}
