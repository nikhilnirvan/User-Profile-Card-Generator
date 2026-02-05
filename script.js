const DEFAULT_AVATAR = "https://via.placeholder.com/100?text=User";


localStorage.removeItem("profileData");
history.replaceState(null, "", window.location.pathname);


// Inputs
const inputs = {
  name: document.getElementById("name"),
  role: document.getElementById("role"),
  image: document.getElementById("image"),
  bio: document.getElementById("bio"),
  link: document.getElementById("link"),
  size: document.getElementById("sizePreset")
};

// Card elements
const card = document.getElementById("profileCard");
const cardUI = {
  name: document.getElementById("cardName"),
  role: document.getElementById("cardRole"),
  image: document.getElementById("cardImage"),
  bio: document.getElementById("cardBio"),
  link: document.getElementById("cardLink")
};

// ---------- UPDATE UI ----------
function updateCard() {
  cardUI.name.textContent = inputs.name.value || "Your Name";
  cardUI.role.textContent = inputs.role.value || "Your Role";
  cardUI.bio.textContent = inputs.bio.value || "Your bio will appear here.";
  cardUI.link.href = inputs.link.value || "#";
  cardUI.image.src = inputs.image.value || DEFAULT_AVATAR;
cardUI.image.alt = inputs.name.value
  ? `${inputs.name.value}'s profile picture`
  : "Default profile avatar";

  saveToLocalStorage();
  updateURL();
}

// ---------- IMAGE FALLBACK ----------
cardUI.image.onerror = () => {
  cardUI.image.src = DEFAULT_AVATAR;
};
cardUI.image.alt = inputs.name.value
  ? `${inputs.name.value}'s profile picture`
  : "Default profile avatar";

// ---------- LOCAL STORAGE ----------
function saveToLocalStorage() {
  const data = Object.fromEntries(
    Object.entries(inputs).map(([k, v]) => [k, v.value])
  );
  localStorage.setItem("profileData", JSON.stringify(data));
}

function loadFromLocalStorage() {
  const saved = JSON.parse(localStorage.getItem("profileData"));
  if (!saved) return;

  Object.keys(saved).forEach(key => {
    if (inputs[key]) inputs[key].value = saved[key];
  });
}

// ---------- URL PARAMS ----------
function updateURL() {
  const params = new URLSearchParams();
  Object.entries(inputs).forEach(([k, v]) => params.set(k, v.value));
  history.replaceState(null, "", "?" + params.toString());
}

function loadFromURL() {
  const params = new URLSearchParams(window.location.search);
  params.forEach((value, key) => {
    if (inputs[key]) inputs[key].value = value;
  });
}

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

// ---------- INIT ----------
loadFromURL();
loadFromLocalStorage();
updateCard();

Object.values(inputs).forEach(input =>
  input.addEventListener("input", updateCard)
);
