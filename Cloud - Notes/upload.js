import { auth, db, storage } from "./firebase-config.js";

import { collection, addDoc } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { ref, uploadBytes, getDownloadURL } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";


const uploadBtn = document.getElementById("uploadBtn");

uploadBtn.addEventListener("click", async () => {

const title = document.getElementById("title").value;
const subject = document.getElementById("subject").value;
const description = document.getElementById("description").value;

const file = document.getElementById("file").files[0];

if(!file){
alert("Please select a file");
return;
}

// Upload to Firebase Storage
const storageRef = ref(storage, "notes/" + file.name);

await uploadBytes(storageRef, file);

// Get file URL
const url = await getDownloadURL(storageRef);


// myNotes code is here 
await addDoc(collection(db,"notes"),{
title:title,
subject:subject,
description:description,
fileURL:url,
fileName:file.name,
userId:auth.currentUser.uid
});

alert("Notes uploaded successfully!");

window.location.href = "mynotes.html";

});


// shared notes page is here
const shareEmail = document.getElementById("shareEmail").value;

await addDoc(collection(db,"notes"),{

title:title,
subject:subject,
description:description,
fileURL:url,
fileName:file.name,
userId:auth.currentUser.uid,

sharedWith:[shareEmail]

});
