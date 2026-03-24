// 🔥 IMPORTS (ALL AT TOP)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { 
  getFirestore, 
  collection, 
  addDoc, 
  query, 
  onSnapshot 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// 🔥 FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyBMdR3yJVmR7LhUdYWp_UhmNnntB8njdn4",
  authDomain: "cloud-notes-sharing-system.firebaseapp.com",
  projectId: "cloud-notes-sharing-system",
  storageBucket: "cloud-notes-sharing-system.firebasestorage.app",
  messagingSenderId: "311839980901",
  appId: "1:311839980901:web:4687b397ba8a1affbd758c",
  measurementId: "G-NP8S2EJ537"
};


// 🔥 INITIALIZE FIREBASE
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// 🔥 SIGNUP
window.signup = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const fullname = document.getElementById("fullname").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Signup successful");

      // OPTIONAL: Save name in localStorage
      localStorage.setItem("userName", fullname);

      // ✅ Redirect to dashboard
      window.location.href = "dashboard.html";
    })
    .catch(err => alert(err.message));
};


// 🔥 LOGIN
window.login = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Login successful");
      window.location.replace("dashboard.html"); // ✅ VERY IMPORTANT
    })
    .catch(err => alert(err.message));
};

// 🔥 LOGOUT
window.logout = function () {
  signOut(auth).then(() => {
    window.location.replace("login.html");
  });
};


// 🔥 AUTH STATE CHECK
onAuthStateChanged(auth, user => {

  const authSection = document.getElementById("authSection");
  const notesSection = document.getElementById("notesSection");

  // Only run if elements exist
  if (authSection && notesSection) {
    if (user) {
      authSection.style.display = "none";
      notesSection.style.display = "block";
      loadNotes();
    } else {
      authSection.style.display = "block";
      notesSection.style.display = "none";
    }
  }

});


// 🔥 ADD NOTE
window.addNote = async function () {
  const text = document.getElementById("noteInput").value;

  if (!text) return alert("Write something!");

  await addDoc(collection(db, "notes"), {
    text: text,
    created: Date.now()
  });

  document.getElementById("noteInput").value = "";
};


// 🔥 LOAD NOTES (REAL-TIME)
function loadNotes() {
  const q = query(collection(db, "notes"));

  onSnapshot(q, snapshot => {
    const list = document.getElementById("notesList");
    list.innerHTML = "";

    snapshot.forEach(doc => {
      const li = document.createElement("li");
      li.textContent = doc.data().text;
      list.appendChild(li);
    });
  });
}