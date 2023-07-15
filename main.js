const login = document.querySelector(".login-link");
const register = document.querySelector(".register-link");
const forgot = document.querySelector(".forgot-link");
const close = document.querySelector(".close")

const loginSection = document.querySelector(".login");
const registerSection = document.querySelector(".register");
const forgotSection = document.querySelector(".forgot");

register.addEventListener("click", () =>{
    loginSection.style.display = "none";
    registerSection.style.display ="flex"
})


login.addEventListener("click", () =>{
    registerSection.style.display ="none"
    loginSection.style.display = "flex";
})

forgot.addEventListener("click", () =>{
    loginSection.style.display = "none";
    forgotSection.style.display ="flex"
    
})

close.addEventListener("click", () =>{
    forgotSection.style.display ="none"
    loginSection.style.display = "flex";
})







// i  Captured the form submission 
let signUp = document.getElementById('register-form');
signUp.addEventListener("submit", async (event) => {
  event.preventDefault(); // prevent form submission and page refresh

  // this is to get user input from the form
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Validate email, password, and BVN
  if (!validateEmail(email)) {
    displayMessage(
      "error",
      "Invalid email. Please enter a valid email address."
    );
    return;
  }
  if (!validatePassword(password)) {
    displayMessage(
      "error",
      "Invalid password. Password must be at least 8 characters long."
    );
    return;
  }
  if (!validateBvn(bvn)) {
    displayMessage("error", "Invalid BVN. Please enter a valid BVN.");
    return;
  }

  //and creates an object with the user's sign-up data
  const userData = {
    username: username,
    email: email,
    password: password
  };

  try {
    // sends a POST request to the backend API endpoint
    const response = await fetch("the api url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    // handles the response from the backend
    if (response.ok) {
      //  if sign-up is successful
      const data = await response.json();
      displayMessage("success", data.message);
    } else {
      // if sign-up fails
      const errorData = await response.json();
      displayMessage("error", errorData.message);
    }
  } catch (error) {
    console.error("Error sending sign-up request:", error);
    displayMessage("error", "An error occurred");
  }
});

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}
function validatePassword(password) {
  return password.length >= 8;
}


//   message for users after submitting
function displayMessage(type, message) {
  const messageContainer = document.getElementById("message");
  messageContainer.innerHTML = "";

  const messageElement = document.createElement("p");
  messageElement.classList.add(type);
  messageElement.textContent = message;

  messageContainer.appendChild(messageElement);
}


