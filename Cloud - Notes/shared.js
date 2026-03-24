import { auth, db } from "./firebase-config.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const sharedList = document.getElementById("sharedList");

async function loadSharedNotes(){

const querySnapshot = await getDocs(collection(db,"notes"));

querySnapshot.forEach((doc)=>{

const data = doc.data();

if(data.sharedWith === auth.currentUser.email){

sharedList.innerHTML +=`

<div class="note-card">

<h3>${data.title}</h3>

<p><b>Subject:</b> ${data.subject}</p>

<p>${data.description}</p>

<a href="${data.fileURL}" target="_blank">
<button class="download-btn">Download</button>
</a>

</div>

`;

}

});

}

loadSharedNotes();
