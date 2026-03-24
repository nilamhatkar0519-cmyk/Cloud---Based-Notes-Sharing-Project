import { auth, db } from "./firebase-config.js";

import {
collection,
getDocs,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const notesList = document.getElementById("notesList");

async function loadNotes(){

const querySnapshot = await getDocs(collection(db,"notes"));

notesList.innerHTML="";

querySnapshot.forEach((docSnap)=>{

const data = docSnap.data();

if(data.userId === auth.currentUser.uid){

notesList.innerHTML += `

<div class="note-card">

<h3>${data.title}</h3>

<p><b>Subject:</b> ${data.subject}</p>

<p>${data.description}</p>

<div class="note-buttons">

<a href="${data.fileURL}" target="_blank">
<button class="download-btn">Download</button>
</a>

<button onclick="deleteNote('${docSnap.id}')" class="delete-btn">
Delete
</button>

</div>

</div>

`;

}

});

}

loadNotes();

window.deleteNote = async function(id){

await deleteDoc(doc(db,"notes",id));

alert("Note deleted");

location.reload();

}
