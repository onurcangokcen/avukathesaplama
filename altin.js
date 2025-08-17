let gramAltin = null;

document.addEventListener("DOMContentLoaded", () => {
  axios.get('https://finans.truncgil.com/v4/today.json')
    .then(response => {
      const data = response.data;
      gramAltin = data["gram-altin"] || data["GRA"];

      if (!gramAltin) {
        alert("Gram altın bilgisi bulunamadı.");
        return;
      }

      document.querySelector("#gramAlis").textContent = gramAltin.Buying;
      document.querySelector("#gramSatis").textContent = gramAltin.Selling;
    })
    .catch(err => {
      alert("Veri alınırken hata oluştu.");
      console.error(err);
    });
});

const inputMiktar = document.querySelector("#hesapGiris");
const btnHesapla = document.querySelector("#altinHesapla");
const sonucOutput = document.querySelector(".altinSonuc");
const islemSec = document.querySelectorAll("input[name='currencyDirection']");

function runEvents() {
  btnHesapla.addEventListener("click", function (e) {
    e.preventDefault();
    const secilenislem = islemGetir()
    if(secilenislem === "gramAltinToTl"){
    gramAltinToTL();
    }
    else if(secilenislem === "tlToGramAltin"){
     tlToGramAltin()
    }
    else if (secilenislem === "ceyrekAltinToTl"){
      ceyrekAltinToTl()
    }
     else if (secilenislem === "tlToCeyrekAltin"){
      tlToCeyrekAltin()
    }
    else if (secilenislem === "yarimAltinToTl"){
      yarimAltinToTl()
    }
     else if (secilenislem === "tlToYarimAltin"){
      tlToYarimAltin()
    }
     else if (secilenislem === "tamAltinToTl"){
      tamAltinToTl()
    }
    else if (secilenislem === "tlToTamAltin"){
      tlToTamAltin()
    }
  });
}



function islemGetir() {
  let secili = null;
  islemSec.forEach(radio => {
    if (radio.checked) {
      secili = radio.value;
    }
  });
  return secili;
}

// BUNLARI ASLINDA TEK FONKSİYONDA DA İF VEREREK YAPABİLİRDİM AMA BU ŞEKİLDE YAPMAYI BU SEFERLİK TERCİH ETTİM.

function gramAltinToTL() {
  const temizDeger = inputMiktar.value.replace(",", ".").replace(/[^\d.]/g, "");
  const deger = parseFloat(temizDeger);

  if (isNaN(deger)) {
    sonucOutput.textContent = "Geçersiz"
    return;
  }

  if (!gramAltin) {
    sonucOutput.textContent = "Altın verisi henüz yüklenmedi.";
    return;
  }

  const katsayi = gramAltin.Selling;
  const karsilik = deger * katsayi;

  sonucOutput.value = karsilik.toFixed(2) ;
}

function tlToGramAltin() {
  const temizDeger = inputMiktar.value.replace(",", ".").replace(/[^\d.]/g, "");
  const deger = parseFloat(temizDeger);

  if (isNaN(deger)) {
    sonucOutput.textContent = "Geçersiz";
    return;
  }

  if (!gramAltin) {
    sonucOutput.textContent = "Altın verisi henüz yüklenmedi.";
    return;
  }

  const katsayi = gramAltin.Buying;
  const karsilik = deger / katsayi;

  sonucOutput.value = karsilik.toFixed(2);
}

 function ceyrekAltinToTl()  {

 const temizDeger = inputMiktar.value.replace(",", ".").replace(/[^\d.]/g, "");
 const deger = parseFloat(temizDeger);

  if (isNaN(deger)) {
    sonucOutput.textContent = "Geçersiz";
    return;
  }

  if (!gramAltin) {
    sonucOutput.textContent = "Altın verisi henüz yüklenmedi.";
    return;
  }

  const katsayi = gramAltin.Selling;
  const karsilik = deger*katsayi*1.75;

  sonucOutput.value = karsilik.toFixed(2);

 }

 function tlToCeyrekAltin()  {

  const temizDeger = inputMiktar.value.replace(",", ".").replace(/[^\d.]/g, "");
 const deger = parseFloat(temizDeger);

  if (isNaN(deger)) {
    sonucOutput.textContent = "Geçersiz";
    return;
  }

  if (!gramAltin) {
    sonucOutput.textContent = "Altın verisi henüz yüklenmedi.";
    return;
  }

  const katsayi = gramAltin.Buying;
  const karsilik = deger/katsayi/1.75;

  sonucOutput.value = karsilik.toFixed(2);

 }

  function yarimAltinToTl()  {

 const temizDeger = inputMiktar.value.replace(",", ".").replace(/[^\d.]/g, "");
 const deger = parseFloat(temizDeger);

  if (isNaN(deger)) {
    sonucOutput.textContent = "Geçersiz";
    return;
  }

  if (!gramAltin) {
    sonucOutput.textContent = "Altın verisi henüz yüklenmedi.";
    return;
  }

  const katsayi = gramAltin.Selling;
  const karsilik = deger*katsayi*3.5;

  sonucOutput.value = karsilik.toFixed(2);

 }

 function tlToYarimAltin()  {

  const temizDeger = inputMiktar.value.replace(",", ".").replace(/[^\d.]/g, "");
 const deger = parseFloat(temizDeger);

  if (isNaN(deger)) {
    sonucOutput.textContent = "Geçersiz";
    return;
  }

  if (!gramAltin) {
    sonucOutput.textContent = "Altın verisi henüz yüklenmedi.";
    return;
  }

  const katsayi = gramAltin.Buying;
  const karsilik = deger/katsayi/3.5;

  sonucOutput.value = karsilik.toFixed(2);

 }

  function tamAltinToTl()  {

 const temizDeger = inputMiktar.value.replace(",", ".").replace(/[^\d.]/g, "");
 const deger = parseFloat(temizDeger);

  if (isNaN(deger)) {
    sonucOutput.textContent = "Geçersiz";
    return;
  }

  if (!gramAltin) {
    sonucOutput.textContent = "Altın verisi henüz yüklenmedi.";
    return;
  }

  const katsayi = gramAltin.Selling;
  const karsilik = deger*katsayi*7;

  sonucOutput.value = karsilik.toFixed(2);

 }

 function tlToTamAltin()  {

 const temizDeger = inputMiktar.value.replace(",", ".").replace(/[^\d.]/g, "");
 const deger = parseFloat(temizDeger);

  if (isNaN(deger)) {
    sonucOutput.textContent = "Geçersiz";
    return;
  }

  if (!gramAltin) {
    sonucOutput.textContent = "Altın verisi henüz yüklenmedi.";
    return;
  }

  const katsayi = gramAltin.Buying;
  const karsilik = deger/katsayi/7;

  sonucOutput.value = karsilik.toFixed(2);

 }


document.addEventListener("DOMContentLoaded", runEvents);


