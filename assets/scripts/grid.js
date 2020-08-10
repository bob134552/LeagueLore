let xhr = new XMLHttpRequest();
let champData;
let champNames;

xhr.open("GET", "http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_GB/champion.json");
xhr.send();

xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        champData = JSON.parse(this.responseText);
    };
}

setTimeout(function() {
    champNames = champData.data;  
    var el = document.getElementById("champ-grid");
    Object.keys(champNames).forEach(key => {
    el.innerHTML += `<img src="http://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/${champNames[key].id}.png" alt="${champNames[key].id}">`;
    });
}, 500);
