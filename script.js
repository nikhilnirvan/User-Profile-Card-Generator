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

// ---------- UPDATE CARD ----------
function updateCard() {
  cardUI.name.textContent = inputs.name.value || "Your Name";
  cardUI.role.textContent = inputs.role.value || "Your Role";
  cardUI.bio.textContent =
    inputs.bio.value || "Your bio will appear here.";
  cardUI.link.href = inputs.link.value || "#";

  const imageUrl = inputs.image.value.trim();

  if (imageUrl) {
    cardUI.image.src = imageUrl;
    cardUI.image.dataset.fallback = "false";
  } else {
    cardUI.image.src = DEFAULT_AVATAR;
  }

  cardUI.image.alt = inputs.name.value
    ? `${inputs.name.value}'s profile picture`
    : "Default profile avatar";
}

// ---------- IMAGE FALLBACK ----------
cardUI.image.onerror = () => {
 if (cardUI.image.dataset.fallback !== "true") {
    cardUI.image.dataset.fallback = "true";
    cardUI.image.src = DEFAULT_AVATAR;
  }
};

// ---------- SIZE PRESET ----------
inputs.size.addEventListener("change", () => {
  card.className = `card ${inputs.size.value}`;
});

// ---------- THEME ----------
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light");
});

// ---------- DOWNLOAD ----------
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

// ---------- RESET (UI ONLY) ----------
document.getElementById("resetProfile").addEventListener("click", () => {
  Object.values(inputs).forEach(input => (input.value = ""));
  card.className = "card square";
  cardUI.image.src = DEFAULT_AVATAR;
  updateCard();
});

// ---------- INIT ----------
updateCard();

Object.values(inputs).forEach(input =>
  input.addEventListener("input", updateCard)
);
