const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const data = Object.fromEntries(formData);

  const url = form.id === "signupForm" ? "/api/signup" : "/api/signin";

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!result.success) {
    document.getElementById("error").innerText = result.message;
  } else {
    window.location.href = "/home";
  }
});
