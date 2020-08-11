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

function writeToDocument(champData) {
  let myArray = Array.from(Object.values(champData.data));
  let el = " ";
  for (let i = 0; i < Math.min(myArray.length, 20); i++) {
    el += `<img id="${myArray[i].name}" src="http://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/${myArray[i].id}.png" alt="${myArray[i].id}">`;
    document.getElementById("champ-grid").innerHTML = el;
  }
}

getData(writeToDocument);