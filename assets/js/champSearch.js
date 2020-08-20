function searchChamp() {
  let input = document.getElementById("champ-search");
  let filter = input.value.toUpperCase();
  let champList = document.getElementById("champ-grid");
  let champ = champList.getElementsByTagName("li");
  let text, image;

  for (i = 0; i < champ.length; i++) {
    image = champ[i].getElementsByTagName("img")[0];
    text = image.name;
    if (text.toUpperCase().indexOf(filter) > -1) {
      champ[i].classList.remove("hide");
    } else {
      champ[i].classList.add("hide");
    }
  }
}
