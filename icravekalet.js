const icraDegeri = document.querySelector(".icraDeger");
const icraVekalet = document.querySelector("#icraVekaletToplam");
const icraHesaplaButton = document.querySelector(".icraHesapla");

function runEvents() {
  icraHesaplaButton.addEventListener("click", function (e) {
    e.preventDefault();
    icraVekaletHesaplama()
  })};

function icraVekaletHesaplama() {
  const temizDeger = icraDegeri.value.replace(",", ".").replace(/[^\d.]/g, "");
  const deger = parseFloat(temizDeger);

  if (isNaN(deger)) {
    icraVekalet.value = "Geçersiz";
    return;
  }

  let vekaletUcreti = 0;

  const kademeler = [
    { limit: 400000, oran: 0.16 },
    { limit: 400000, oran: 0.15 },
    { limit: 800000, oran: 0.14 },
    { limit: 1200000, oran: 0.11 },
    { limit: 1600000, oran: 0.08 },
    { limit: 3200000, oran: 0.06 },
    { limit: 6400000, oran: 0.04 },
    { limit: Infinity, oran: 0.025 }
  ];

  let kalan = deger;

  for (let i = 0; i < kademeler.length; i++) {
    const kademe = kademeler[i];
    const tutar = Math.min(kalan, kademe.limit);
    vekaletUcreti += tutar * kademe.oran;
    kalan -= tutar;
    if (kalan <= 0) break;
  }

  if (vekaletUcreti < 6000) {
    vekaletUcreti = 6000;
  }

  if(deger<6000){
    vekaletUcreti=deger;
  }

  icraVekalet.value = vekaletUcreti.toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}


document.addEventListener("DOMContentLoaded", runEvents);