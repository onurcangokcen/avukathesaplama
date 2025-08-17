const arbDegeri = document.querySelector(".arbDeger");
const arbVekalet = document.querySelector("#arbVekaletSonuc");
const arbHesaplaButton = document.querySelector(".arbHesapla");
const arbSec = document.querySelectorAll("input[name='arbtur']");

function runEvents() {
  arbHesaplaButton.addEventListener("click", function (e) {
    e.preventDefault();
    const seciliArb = arbGetir();

    if (!arbDegeri.value.trim()) {
      arbVekalet.value = "Lütfen değer giriniz";
      return;
    }

    if (seciliArb === "arbisci" || seciliArb === "arbtuketici") {
      arbIsciTuketiciVekaletHesaplama();
    } else if (seciliArb === "arbticari") {
      arbTicariVekaletHesaplama(); 
    } else {
      arbVekalet.value = "Tür seçilmedi";
    }
  });
}

function arbGetir() {
  let secili = null;
  arbSec.forEach(radio => {
    if (radio.checked) {
      secili = radio.value;
    }
  });
  return secili;
}

function arbIsciTuketiciVekaletHesaplama() {
  const temizDeger = arbDegeri.value.replace(",", ".").replace(/[^\d.]/g, "");
  const deger = parseFloat(temizDeger);

  if (isNaN(deger)) {
    arbVekalet.value = "Geçersiz değer";
    return;
  }

  let vekaletUcreti = 0;

  const kademeler = [
    { limit: 300000, oran: 0.06 },
    { limit: 480000, oran: 0.05 },
    { limit: 780000, oran: 0.04 },
    { limit: 1560000, oran: 0.03 },
    { limit: 4680000, oran: 0.02 },
    { limit: 6240000, oran: 0.015 },
    { limit: 12480000, oran: 0.01 },
    { limit: Infinity, oran: 0.005 }
  ];

  let oncekiLimit = 0;
  for (let i = 0; i < kademeler.length; i++) {
    const kademe = kademeler[i];
    const kademeMiktar = Math.min(deger, kademe.limit) - oncekiLimit;
    if (kademeMiktar > 0) {
      vekaletUcreti += kademeMiktar * kademe.oran;
      oncekiLimit = kademe.limit;
    } else {
      break;
    }
  }

  if (vekaletUcreti < 6000) {
    vekaletUcreti = 6000;
  }

   if(deger<6000){
    vekaletUcreti=deger;
  }

  arbVekalet.value = vekaletUcreti.toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function arbTicariVekaletHesaplama() {
   const temizDeger = arbDegeri.value.replace(",", ".").replace(/[^\d.]/g, "");
  const deger = parseFloat(temizDeger);

  if (isNaN(deger)) {
    arbVekalet.value = "Geçersiz değer";
    return;
  }

  let vekaletUcreti = 0;

  const kademeler = [
    { limit: 300000, oran: 0.06 },
    { limit: 480000, oran: 0.05 },
    { limit: 780000, oran: 0.04 },
    { limit: 1560000, oran: 0.03 },
    { limit: 4680000, oran: 0.02 },
    { limit: 6240000, oran: 0.015 },
    { limit: 12480000, oran: 0.01 },
    { limit: Infinity, oran: 0.005 }
  ];

  let oncekiLimit = 0;
  for (let i = 0; i < kademeler.length; i++) {
    const kademe = kademeler[i];
    const kademeMiktar = Math.min(deger, kademe.limit) - oncekiLimit;
    if (kademeMiktar > 0) {
      vekaletUcreti += kademeMiktar * kademe.oran;
      oncekiLimit = kademe.limit;
    } else {
      break;
    }
  }

  if (vekaletUcreti < 9000) {
    vekaletUcreti = 9000;
  }

   if(deger<9000){
    vekaletUcreti=deger;
  }

  arbVekalet.value = vekaletUcreti.toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

document.addEventListener("DOMContentLoaded", runEvents);