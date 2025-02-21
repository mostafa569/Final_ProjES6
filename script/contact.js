document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("userName") === null) {
      window.location.href = "index.html";
    }
  });


  setTimeout(() => {
    localStorage.removeItem("userName");
}, 5 * 60 * 1000);

const Name = document.getElementById("Name");

Name.innerHTML = `Welcome ${localStorage.getItem("userName")}`;