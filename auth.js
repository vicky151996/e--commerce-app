// SIGNUP
function signup() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
    alert("Please fill all fields");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // check if user exists
  const exists = users.find(u => u.username === username);
  if (exists) {
    alert("User already exists!");
    return;
  }

  users.push({ username, password });

  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup successful!");
  window.location.href = "login.html";
}


// LOGIN
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    alert("Login successful!");
    window.location.href = "index.html"; // your main app
  } else {
    alert("Invalid username or password");
  }
}
