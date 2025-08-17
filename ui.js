function ekleSayi(sayi) {
  const giris = document.getElementById("hesapGiris");
  if (giris) {
    giris.value += sayi;
  }
}

function ekleNokta() {
  const giris = document.getElementById("hesapGiris");
  if (!giris) return;

  if (giris.value.includes(".")) return;

  if (giris.value === "") {
    giris.value = "0.";
  } else {
    giris.value += ".";
  }
}

function temizle() {
  const giris = document.getElementById("hesapGiris");
  if (giris) {
    giris.value = "";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const sayilar = document.querySelectorAll(".sayi");
  const temizleBtn = document.getElementById("temizleBtn");

  sayilar.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const sayi = btn.textContent.trim();
      ekleSayi(sayi);
    });
  });

  if (temizleBtn) {
    temizleBtn.addEventListener("click", temizle);
  }

  const input = document.getElementById("hesapGiris");
  if (input) {
    input.addEventListener("input", function () {
      const value = input.value;
      if (value === "") return;

      const regex = /^\d*(\.\d*)?$/;
      if (!regex.test(value)) {
        input.value = value.slice(0, -1);
      }
    });
  }
});

function temizle() {
  const aktifInput = document.activeElement;
  if (
    aktifInput &&
    aktifInput.tagName === "INPUT" &&
    aktifInput.classList.contains("hesapGirisClass")
  ) {
    aktifInput.value = "";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const sayilar = document.querySelectorAll(".sayi");
  const temizleBtn = document.querySelector("#temizleBtn");

  sayilar.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const sayi = btn.textContent.trim();
      ekleSayi(sayi);
    });
  });

  if (temizleBtn) {
    temizleBtn.addEventListener("click", temizle);
  }

  const inputs = document.querySelectorAll("input.hesapGirisClass");
  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      const value = input.value;
      if (value === "") return;

      const regex = /^\d*(\.\d*)?$/;

      if (!regex.test(value)) {
        input.value = value.slice(0, -1);
      }
    });
  });
});