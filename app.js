document.addEventListener("DOMContentLoaded", () => {
  
  fetch("/head.html")
    .then(res => res.text())
    .then(data => {
      const header1 = document.getElementById("header-placeholder");
      if (header1) header1.innerHTML = data;
    });


  fetch("../head.html")
    .then(res => res.text())
    .then(data => {
      const header2 = document.getElementById("header2-placeholder");
      if (header2) header2.innerHTML = data;
    });

 
  fetch("cards.html")
    .then(res => res.text())
    .then(data => {
      const cards = document.getElementById("cards-placeholder");
      if (cards) cards.innerHTML = data;
    });

  const doldurGunler = (id) => {
    const select = document.getElementById(id);
    if (!select) return;
    const fragment = document.createDocumentFragment();
    for (let i = 1; i <= 31; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      fragment.appendChild(option);
    }
    select.appendChild(fragment);
  };
  doldurGunler("gunSelect");
  doldurGunler("cikisGun");


  const doldurYilSelect = (id) => {
    const select = document.getElementById(id);
    if (!select) return;
    select.innerHTML = '<option value="" disabled selected>Yıl</option>';
    const fragment = document.createDocumentFragment();
    for (let yil = 2025; yil >= 1950; yil--) {
      const option = document.createElement("option");
      option.value = yil;
      option.textContent = yil;
      fragment.appendChild(option);
    }
    select.appendChild(fragment);
  };
  doldurYilSelect("girisYil");
  doldurYilSelect("cikisYil");
});

function filterItems() {
  const input = document.getElementById('headerSearch');
  if (!input) return;

  const filter = input.value.toLowerCase(); // küçük harf duyarsız

  // Önce tüm vurguları kaldır
  document.querySelectorAll('.highlight').forEach(el => el.classList.remove('highlight'));

  if (filter === "") return;

  // Tarayacağımız öğeler
  const elements = document.querySelectorAll(
    '.card-title, .card-text, li, p, a, h1, h2, h3, h4, h5, h6'
  );

  elements.forEach(el => {
    // input ve buton metinlerini hariç tut
    if (el.id === 'headerSearch') return;
    if (el.tagName === 'BUTTON') return;

    if (el.textContent.toLowerCase().includes(filter)) {
      el.classList.add('highlight');
    }
  });
}