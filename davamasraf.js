const davaDegeri = document.querySelector(".davaDeger");
const davaBasvurmaHarc = document.querySelector("#davaBasvurmaHarc");
const davaPesinHarc = document.querySelector("#davaPesinHarc");
const davaToplamMasraf = document.querySelector("#davaToplamMasraf");
const davaHesaplaBtn = document.querySelector(".davaMasrafHesapla");
const maktuCheckbox = document.querySelector("#maktuCheckBox");
const davaAlert = document.querySelector("#davaAlert");

function runEvents() {
  davaHesaplaBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const secilenMahkeme = mahkemeSec(); // değer alınmalı

    if (!secilenMahkeme) {
      alert("Lütfen bir mahkeme seçiniz.");
      return;
    }

    if (secilenMahkeme === "asliyemah" || secilenMahkeme === "sulhmah" || 
        secilenMahkeme === "tuketicimah" || secilenMahkeme === "fikrimah" || secilenMahkeme === "idaremah") {
      DavaMasrafHesaplaMain();
    } else if (secilenMahkeme === "icramah") {
      icraDavaMasrafHesapla();
    } 
  });
}

function mahkemeSec() {
  const secilenMahkeme = document.querySelector('input[name="mahkeme"]:checked');
  if (secilenMahkeme) {
    return secilenMahkeme.value;
  } else {
    return null; 
  }
}

function showAlert(message) {
  davaAlert.textContent = message;
  davaAlert.classList.remove("d-none");
}

function hideAlert() {
  davaAlert.classList.add("d-none");
}

function DavaMasrafHesaplaMain() {
  const deger = parseFloat(davaDegeri.value.replace(",", "."));

  if (isNaN(deger) || deger <= 0) {
    showAlert("Lütfen geçerli bir dava değeri giriniz.");
    return;
  } else {
    hideAlert();
  }

  if (maktuCheckbox.checked) {

    davaBasvurmaHarc.value = "615.4";
    davaPesinHarc.value = "615.4";
    davaToplamMasraf.value = "1230.8";
    return;
  }



  const basvurmaHarc = 615.4;
  let pesinHarc = deger * 0.0068; 
  if(pesinHarc<615.4) pesinHarc=615.4;
  const toplamMasraf = basvurmaHarc + pesinHarc;

  davaBasvurmaHarc.value = basvurmaHarc.toFixed(2);
  davaPesinHarc.value = pesinHarc.toFixed(2);
  davaToplamMasraf.value = toplamMasraf.toFixed(2);
}

function icraDavaMasrafHesapla(){;
    davaBasvurmaHarc.value = "615.4";
    davaPesinHarc.value = "615.4";
    davaToplamMasraf.value = "1230.8";
}



document.addEventListener("DOMContentLoaded", runEvents);