function goToLogin(){
    alert("Redirecting to Login Page")
    window.location.href="login.html";
}

function goToSign(){
    alert("Sign in  to  Page")
    window.location.href="Sign.html";
}

function closeModel(){
    document.getElementById("model").style.display="none";
}

signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // login successful
        window.location.gref = "index.html";
    })
    .catch((error) => {
        alert(error.message);
    })
    
