const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");
const signUpName = document.getElementById("signup-name");
const signUpEmail = document.getElementById("signup-email");
const signUpPassword = document.getElementById("signup-password");
const signupButton = document.getElementById("signupButton");
const signInEmail = document.getElementById("signInEmail");
const signInPassword = document.getElementById("signInPassword");
const signinButton = document.getElementById("signinButton");
const signinEmailP = document.getElementById("signin-email");
const signinPasswordP = document.getElementById("signin-password");
const messageBox = document.getElementById("messageBox");
const messageBoxSignin = document.getElementById("messageBoxSignin");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

signupButton.addEventListener("click", (event) => {
  event.preventDefault();
  const signupInputName = document.getElementById("signupInputName").value;
  const signupInputEmail = document.getElementById("signupInputEmail").value;
  const signupInputPassword = document.getElementById(
    "signupInputPassword"
  ).value;
  const namePattern = /^[A-Za-z\s]+$/;
  let valid = true;
  if (signupInputName.length < 3 || !namePattern.test(signupInputName)) {
    signUpName.style.display = "block";
    signUpName.innerHTML = "Please enter a valid name";
    valid = false;
  } else {
    signUpName.style.display = "none";
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(signupInputEmail)) {
    signUpEmail.style.display = "block";
    signUpEmail.innerHTML = "Please enter a valid email";
    valid = false;
  } else {
    signUpEmail.style.display = "none";
  }
  if (signupInputPassword.length < 8) {
    signUpPassword.style.display = "block";
    signUpPassword.innerHTML = "Password must be at least 8 characters";
    valid = false;
  } else {
    signUpPassword.style.display = "none";
  }
  if (valid) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    console.log(users);
    let existingUser = users.find((user) => user.email === signupInputEmail);

    if (existingUser) {
      messageBox.style.display = "block";
      messageBox.style.color = "red";
      messageBox.innerHTML = "Email already exists!";
    } else {
      let newUser = {
        name: signupInputName,
        email: signupInputEmail,
        password: signupInputPassword,
      };

      users.push(newUser);

      localStorage.setItem("users", JSON.stringify(users));

      messageBox.style.display = "block";
      messageBox.style.color = "green";
      messageBox.innerHTML = "Account created successfully!";
    }
  }
});

signinButton.addEventListener("click", (event) => {
  event.preventDefault();
  const signInEmail = document.getElementById("signInEmail").value;
  const signInPassword = document.getElementById("signInPassword").value;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let valid = true;
  if (!emailPattern.test(signInEmail)) {
    signinEmailP.style.display = "block";
    signinEmailP.innerHTML = "Please enter a valid email";
    valid = false;
  } else {
    signinEmailP.style.display = "none";
  }
  if (signInPassword.length < 8) {
    signinPasswordP.style.display = "block";
    signinPasswordP.innerHTML = "Password must be at least 8 characters";
    valid = false;
  } else {
    signinPasswordP.style.display = "none";
  }

  if (valid) {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    let existingUser = users.find((user) => user.email === signInEmail);

    if (!existingUser || existingUser.password !== signInPassword) {
      console.log("sad");
      messageBoxSignin.style.display = "block";
      messageBoxSignin.style.color = "red";
      messageBoxSignin.innerHTML = "User not found!";
    }else
    {
      // alert("Welcome "+existingUser.name);
      console.log(existingUser.name);
      localStorage.setItem("userName", existingUser.name);
      window.location.href = "../home.html";
    }

  }
});
