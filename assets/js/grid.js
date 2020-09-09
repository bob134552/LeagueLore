$(function () {
  $("#lore-page").fadeOut();
  $("#video").fadeOut();

  // Get current patch version.
  $.ajax({
    type: "GET",
    url: "https://ddragon.leagueoflegends.com/api/versions.json",
    success: function (patch) {
      console.log("current patch: " + patch[0]);

      // Get champion data.
      $.ajax({
        type: "GET",
        url: `http://ddragon.leagueoflegends.com/cdn/${patch[0]}/data/en_GB/champion.json`,
        success: function (champData) {
          // Build champion icon display.
          function buildGrid() {
            let champArray = Array.from(Object.values(champData.data));
            let el = " ";
            let galleryItems = document.querySelector(".champ-grid").children;
            let prev = document.querySelector(".prev");
            let next = document.querySelector(".next");
            let page = document.querySelector(".page-num");
            let maxItem, pagination;
            let index = 1;
            let windowSize = window.matchMedia("(max-width: 700px)");

            // Set Different amount of items to be displayed based on window size.
            function setMaxItem(windowSize) {
              if (windowSize.matches) {
                maxItem = 20;
                pagination = Math.ceil(champArray.length / maxItem);
                $(next).removeClass("hide");
                $("div.item:nth-child(n+21)").addClass("hide");
              } else {
                maxItem = champArray.length;
                pagination = Math.ceil(champArray.length / maxItem);
                $("div.item").removeClass("hide");
              }
            }

            // Add listener to check window size.
            setMaxItem(windowSize);
            windowSize.addListener(setMaxItem);

            // Display each entry from external json
            for (let i = 0; i < champArray.length; i++) {
              if (i < maxItem) {
                el += `<div class="item"><img onClick="return champPage(this.id, this.name)" id="${champArray[i].id}" name="${champArray[i].name}" src="http://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/${champArray[i].id}.png" alt="${champArray[i].id}"><span class="champ-name">${champArray[i].name}</span></div>`;
                document.getElementById("champ-grid").innerHTML = el;
              } else {
                el += `<div class="item hide"><img onClick="return champPage(this.id, this.name)" id="${champArray[i].id}" name="${champArray[i].name}" src="http://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/${champArray[i].id}.png" alt="${champArray[i].id}"><span class="champ-name">${champArray[i].name}</span></div>`;
                document.getElementById("champ-grid").innerHTML = el;
              }
            }

            //Set up pagination buttons
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

            //Add css class to current images being shown and hide class to images being hidden
            function showItems() {
              for (let i = 0; i < champArray.length; i++) {
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

          buildGrid();
        },
      });
    },
    error: function (jqXHR, exception) {
      var msg = "";
      if (jqXHR.status === 0) {
        msg = "Not connect.\n Verify Network.";
      } else if (jqXHR.status == 404) {
        msg = "Requested page not found. [404]";
      } else if (jqXHR.status == 500) {
        msg = "Internal Server Error [500].";
      } else if (exception === "parsererror") {
        msg = "Requested JSON parse failed.";
      } else if (exception === "timeout") {
        msg = "Time out error.";
      } else if (exception === "abort") {
        msg = "Ajax request aborted.";
      } else {
        msg = "Uncaught Error.\n" + jqXHR.responseText;
      }
      console.log(msg);
    },
  });
});

//Search through images to find specified champion.
function searchChamp() {
  let input = document.getElementById("champ-search");
  let filter = input.value.toUpperCase();
  let champList = document.getElementById("champ-grid");
  let champ = champList.getElementsByClassName("item");
  let text, image;

  for (i = 0; i < champ.length; i++) {
    image = champ[i].getElementsByTagName("img")[0];
    text = image.name;
    if (text.toUpperCase().startsWith(filter)) {
      champ[i].classList.remove("hide");
    } else {
      champ[i].classList.add("hide");
    }
  }
}
