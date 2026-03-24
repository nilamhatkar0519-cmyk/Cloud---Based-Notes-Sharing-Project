import { db } from "./firebase-config.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const results = document.getElementById("results");

window.searchNotes = async function(){

const keyword = document.getElementById("searchInput").value.toLowerCase();

const querySnapshot = await getDocs(collection(db,"notes"));

results.innerHTML="";

querySnapshot.forEach((doc)=>{

const data = doc.data();

if(
data.title.toLowerCase().includes(keyword) ||
data.subject.toLowerCase().includes(keyword)
){

results.innerHTML +=`

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
