function getData(cb) {
  let xhr = new XMLHttpRequest();

  xhr.open(
    "GET",
    "http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_GB/champion.json"
  );
  xhr.send();

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      cb(JSON.parse(this.responseText));
    }
  };
}

function buildGrid(champData) {
  let myArray = Array.from(Object.values(champData.data));
  let el = " ";
  let galleryItems = document.querySelector(".champ-grid").children;
  let prev = document.querySelector(".prev");
  let next = document.querySelector(".next");
  let page = document.querySelector(".page-num");
  let maxItem, pagination;
  let index = 1;
  let windowSize = window.matchMedia("(max-width: 700px)");


  function setMaxItem(windowSize) {
    if (windowSize.matches) {
      maxItem = 20;
      pagination = Math.ceil(myArray.length / maxItem);
    } else {
      maxItem = myArray.length;
      pagination = Math.ceil(myArray.length / maxItem);
    }
  }

  setMaxItem(windowSize);
  windowSize.addListener(setMaxItem);

  setInterval(function () {
    console.log(pagination);
  }, 100);

  for (let i = 0; i < myArray.length; i++) {
    if (i < maxItem) {
      el += `<li class="item show"><img id="${myArray[i].id}" name="${myArray[i].name}" src="http://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/${myArray[i].id}.png" alt="${myArray[i].id}"></li>`;
      document.getElementById("champ-grid").innerHTML = el;
    } else {
      el += `<li class="item hide"><img id="${myArray[i].id}" name="${myArray[i].name}" src="http://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/${myArray[i].id}.png" alt="${myArray[i].id}"></li>`;
      document.getElementById("champ-grid").innerHTML = el;
    }
  }
  prev.addEventListener("click", function () {
    index--;
    check();
    showItems();
  });

  next.addEventListener("click", function () {
    index++;
    check();
    showItems();
  });

  function check() {
    if (index == pagination) {
      next.classList.add("disabled");
    } else {
      next.classList.remove("disabled");
    }

    if (index == 1) {
      prev.classList.add("disabled");
    } else {
      prev.classList.remove("disabled");
    }
  }

  function showItems() {
    for (let i = 0; i < myArray.length; i++) {
      galleryItems[i].classList.add("hide");

      if (i >= index * maxItem - maxItem && i < index * maxItem) {
        galleryItems[i].classList.remove("hide");
      }
      page.innerHTML = index;
    }
  }

  window.onload = function () {
    showItems();
    check();
  };
}

getData(buildGrid);
