const davaDegeri = document.querySelector(".asliyeDavaDeger");
const davaVekalet = document.querySelector("#asliyeDavaVekaletSonuc");
const davaHesaplaButton = document.querySelector(".asliyeDavaHesapla");
const mahkemeSec = document.querySelectorAll("input[name='mahkeme']");

function runEvents() {
  davaHesaplaButton.addEventListener("click", function (e) {
    e.preventDefault();
    const seciliMahkeme = mahkemeGetir();

     if (!davaDegeri.value.trim()) {
      davaVekalet.value = "Lütfen değer giriniz";
      return;
    }

    if (seciliMahkeme === "asliyemah") {
      asliyeDavaVekaletHesaplama();
    }
    else if (seciliMahkeme === "icramah") {
      icraDavaVekaletHesaplama();
    }
    else if(seciliMahkeme === "sulhmah"){
      sulhDavaVekaletHesaplama();
    }
     else if(seciliMahkeme === "tuketicimah"){
      tuketiciDavaVekaletHesaplama();
    }
     else if(seciliMahkeme === "fikrimah"){
      fikrisinaiDavaVekaletHesaplama();
     }
      else if(seciliMahkeme === "idaremah"){
      idareMahDavaHesaplama();
     }
      else {
      davaVekalet.value = "Tür seçilmedi";
    }
  });
}

function mahkemeGetir() {
  let secili = null;
  mahkemeSec.forEach(radio => {
    if (radio.checked) {
      secili = radio.value;
    }
  });
  return secili;
}

function asliyeDavaVekaletHesaplama() {
  const temizDeger = davaDegeri.value.replace(",", ".").replace(/[^\d.]/g, "");
  const deger = parseFloat(temizDeger);

  if (isNaN(deger)) {
    davaVekalet.value = "Geçersiz";
    return;
  }

  let vekaletUcreti = 0;

  if (deger <= 30000) {

    vekaletUcreti = deger;

  } else {

    const kademeler = [
      { limit: 400000, oran: 0.16 },
      { limit: 400000, oran: 0.15 },
      { limit: 800000, oran: 0.14 },
      { limit: 1200000, oran: 0.11 },
      { limit: 1600000, oran: 0.08 },
      { limit: 2000000, oran: 0.05 },
      { limit: 2400000, oran: 0.03 },
      { limit: 2800000, oran: 0.02 },
      { limit: 11600000, oran: 0.01 }
    ];

    let kalan = deger;
    for (let i = 0; i < kademeler.length; i++) {
      const kademe = kademeler[i];
      const tutar = Math.min(kalan, kademe.limit);
      vekaletUcreti += tutar * kademe.oran;
      kalan -= tutar;
      if (kalan <= 0) break;
    }

    if (vekaletUcreti < 30000) {
      vekaletUcreti = 30000;
    }
  }

  davaVekalet.value = new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(vekaletUcreti);
}

function icraDavaVekaletHesaplama() {
  const temizDeger = davaDegeri.value.replace(",", ".").replace(/[^\d.]/g, "");
  const deger = parseFloat(temizDeger);

  if (isNaN(deger)) {
    davaVekalet.value = "Geçersiz";
    return;
  }

  let vekaletUcreti = 0;

  if (deger <= 12000) {
      vekaletUcreti = deger;    
  }
  else {
    vekaletUcreti = 12000;
  }
  
  davaVekalet.value = new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(vekaletUcreti);
}

function sulhDavaVekaletHesaplama() {
  const temizDeger = davaDegeri.value.replace(",", ".").replace(/[^\d.]/g, "");
  const deger = parseFloat(temizDeger);

  if (isNaN(deger)) {
    davaVekalet.value = "Geçersiz";
    return;
  }

  let vekaletUcreti = 0;

  if (deger <= 30000) {

    vekaletUcreti = deger;
  } else {

    const kademeler = [
      { limit: 400000, oran: 0.16 },
      { limit: 400000, oran: 0.15 },
      { limit: 800000, oran: 0.14 },
      { limit: 1200000, oran: 0.11 },
      { limit: 1600000, oran: 0.08 },
      { limit: 2000000, oran: 0.05 },
      { limit: 2400000, oran: 0.03 },
      { limit: 2800000, oran: 0.02 },
      { limit: 11600000, oran: 0.01 }
    ];

    let kalan = deger;
    for (let i = 0; i < kademeler.length; i++) {
      const kademe = kademeler[i];
      const tutar = Math.min(kalan, kademe.limit);
      vekaletUcreti += tutar * kademe.oran;
      kalan -= tutar;
      if (kalan <= 0) break;
    }

    if (vekaletUcreti < 30000) {
      vekaletUcreti = 30000;
    }
  }

  davaVekalet.value = new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(vekaletUcreti);
}

function tuketiciDavaVekaletHesaplama() {
  const temizDeger = davaDegeri.value.replace(",", ".").replace(/[^\d.]/g, "");
  const deger = parseFloat(temizDeger);

  if (isNaN(deger)) {
    davaVekalet.value = "Geçersiz";
    return;
  }

  let vekaletUcreti = 0;

  if (deger <= 15000) {

    vekaletUcreti = deger;
  } else {

    const kademeler = [
      { limit: 400000, oran: 0.16 },
      { limit: 400000, oran: 0.15 },
      { limit: 800000, oran: 0.14 },
      { limit: 1200000, oran: 0.11 },
      { limit: 1600000, oran: 0.08 },
      { limit: 2000000, oran: 0.05 },
      { limit: 2400000, oran: 0.03 },
      { limit: 2800000, oran: 0.02 },
      { limit: 11600000, oran: 0.01 }
    ];

    let kalan = deger;
    for (let i = 0; i < kademeler.length; i++) {
      const kademe = kademeler[i];
      const tutar = Math.min(kalan, kademe.limit);
      vekaletUcreti += tutar * kademe.oran;
      kalan -= tutar;
      if (kalan <= 0) break;
    }

    if (vekaletUcreti < 15000) {
      vekaletUcreti = 15000;
    }
  }

  davaVekalet.value = new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(vekaletUcreti);
}

function fikrisinaiDavaVekaletHesaplama() {
  const temizDeger = davaDegeri.value.replace(",", ".").replace(/[^\d.]/g, "");
  const deger = parseFloat(temizDeger);

  if (isNaN(deger)) {
    davaVekalet.value = "Geçersiz";
    return;
  }

  let vekaletUcreti = 0;

  if (deger <= 40000) {

    vekaletUcreti = deger;
  } else {

    const kademeler = [
      { limit: 400000, oran: 0.16 },
      { limit: 400000, oran: 0.15 },
      { limit: 800000, oran: 0.14 },
      { limit: 1200000, oran: 0.11 },
      { limit: 1600000, oran: 0.08 },
      { limit: 2000000, oran: 0.05 },
      { limit: 2400000, oran: 0.03 },
      { limit: 2800000, oran: 0.02 },
      { limit: 11600000, oran: 0.01 }
    ];

    let kalan = deger;
    for (let i = 0; i < kademeler.length; i++) {
      const kademe = kademeler[i];
      const tutar = Math.min(kalan, kademe.limit);
      vekaletUcreti += tutar * kademe.oran;
      kalan -= tutar;
      if (kalan <= 0) break;
    }

    if (vekaletUcreti < 40000) {
      vekaletUcreti = 40000;
    }
  }

  davaVekalet.value = new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(vekaletUcreti);
}

function idareMahDavaHesaplama() {
  const temizDeger = davaDegeri.value.replace(",", ".").replace(/[^\d.]/g, "");
  const deger = parseFloat(temizDeger);

  if (isNaN(deger)) {
    davaVekalet.value = "Geçersiz";
    return;
  }

  let vekaletUcreti = 0;

  if (deger <= 40000) {

    vekaletUcreti = deger;
  } else {

    const kademeler = [
      { limit: 400000, oran: 0.16 },
      { limit: 400000, oran: 0.15 },
      { limit: 800000, oran: 0.14 },
      { limit: 1200000, oran: 0.11 },
      { limit: 1600000, oran: 0.08 },
      { limit: 2000000, oran: 0.05 },
      { limit: 2400000, oran: 0.03 },
      { limit: 2800000, oran: 0.02 },
      { limit: 11600000, oran: 0.01 }
    ];

    let kalan = deger;
    for (let i = 0; i < kademeler.length; i++) {
      const kademe = kademeler[i];
      const tutar = Math.min(kalan, kademe.limit);
      vekaletUcreti += tutar * kademe.oran;
      kalan -= tutar;
      if (kalan <= 0) break;
    }

    if (vekaletUcreti < 40000) {
      vekaletUcreti = 40000;
    }
  }

  davaVekalet.value = new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(vekaletUcreti);
}




document.addEventListener("DOMContentLoaded", runEvents);