const DEFAULT_AVATAR = "https://via.placeholder.com/100?text=User";

// Inputs
const inputs = {
  name: document.getElementById("name"),
  role: document.getElementById("role"),
  image: document.getElementById("image"),
  bio: document.getElementById("bio"),
  link: document.getElementById("link"),
  size: document.getElementById("sizePreset")
};

// Card UI
const card = document.getElementById("profileCard");
const cardUI = {
  name: document.getElementById("cardName"),
  role: document.getElementById("cardRole"),
  image: document.getElementById("cardImage"),
  bio: document.getElementById("cardBio"),
  link: document.getElementById("cardLink")
};

// Update card
function updateCard() {
  cardUI.name.textContent = inputs.name.value || "Your Name";
  cardUI.role.textContent = inputs.role.value || "Your Role";
  cardUI.bio.textContent =
    inputs.bio.value || "Your bio will appear here.";
  cardUI.link.href = inputs.link.value || "#";

  const imageUrl = inputs.image.value.trim();
  cardUI.image.src = imageUrl ? imageUrl : DEFAULT_AVATAR;
}

// Image fallback
cardUI.image.onerror = () => {
  cardUI.image.src = DEFAULT_AVATAR;
};

// Size preset
inputs.size.addEventListener("change", () => {
  card.className = `card ${inputs.size.value}`;
});

// Theme toggle
document.getElementById("themeToggle").onclick = () =>
  document.body.classList.toggle("light");

// Download
function download(type) {
  html2canvas(card, { scale: 2 }).then(canvas => {
    const link = document.createElement("a");
    link.download = `profile.${type}`;
    link.href =
      type === "jpg"
        ? canvas.toDataURL("image/jpeg", 0.95)
        : canvas.toDataURL("image/png");
    link.click();
  });
}


document.getElementById("downloadPng").onclick = () => download("png");
document.getElementById("downloadJpg").onclick = () => download("jpg");

// Reset (keeps size preset)
document.getElementById("resetProfile").onclick = () => {
  inputs.name.value = "";
  inputs.role.value = "";
  inputs.image.value = "";
  inputs.bio.value = "";
  inputs.link.value = "";

  cardUI.image.src = DEFAULT_AVATAR;
  updateCard();
};

// Input listeners
Object.values(inputs).forEach(input =>
  input.addEventListener("input", updateCard)
);

// Initial render
updateCard();
