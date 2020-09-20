let language = $(`option[name="default"]`).val();

$('select[name="dropdown"]').change(function() {
    language= $(this).val();
    $(".champ-grid").html(" ");
    getData(language);
});



function getData(language) {
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
                url: `http://ddragon.leagueoflegends.com/cdn/${patch[0]}/data/${language}/champion.json`,
                success: function (champions) {
                    buildGrid(champions, patch[0]);
                },
            });
        },
    });
};

$(document).ready(getData(language));

// Build champion icon display.
function buildGrid(champData, patch) {
    let champArray = Array.from(Object.values(champData.data));
    let el = " ";
    let index = 1;
    let galleryItems = document.querySelector(".champ-grid").children;
    let prev = document.querySelector(".prev");
    let next = document.querySelector(".next");
    let page = document.querySelector(".page-num");
    let windowSize = window.matchMedia("(max-width: 700px)");
    let maxItem, pagination;

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
            el += `<div class="item"><img onClick="return champPage(this.id, this.name)" id="${champArray[i].id}" name="${champArray[i].name}" src="http://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${champArray[i].id}.png" alt="${champArray[i].id}"><span class="champ-name">${champArray[i].name}</span></div>`;
            document.getElementById("champ-grid").innerHTML = el;
        } else {
            el += `<div class="item hide"><img onClick="return champPage(this.id, this.name)" id="${champArray[i].id}" name="${champArray[i].name}" src="http://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${champArray[i].id}.png" alt="${champArray[i].id}"><span class="champ-name">${champArray[i].name}</span></div>`;
            document.getElementById("champ-grid").innerHTML = el;
        }
    }
    //Set up pagination buttons
    prev.addEventListener("click", function () {
        index--;
        check(index, pagination, next, prev);
        showItems(champArray, galleryItems, index, maxItem, page);
    });

    next.addEventListener("click", function () {
        index++;
        check(index, pagination, next, prev);
        showItems(champArray, galleryItems, index, maxItem, page);
    });


    window.onload = function () {
        showItems(champArray, galleryItems, index, maxItem, page);
        check(index, pagination, next, prev);
    };
}

//Add css class to current images being shown and hide class to images being hidden
function showItems(champArray, galleryItems, index, maxItem, page) {
    for (let i = 0; i < champArray.length; i++) {
        galleryItems[i].classList.add("hide");

        if (i >= index * maxItem - maxItem && i < index * maxItem) {
            galleryItems[i].classList.remove("hide");
        }
        page.innerHTML = index;
    }
}

function check(index, pagination, next, prev, page) {
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

//Search through images to find specified champion.
function searchChamp() {
    let input = document.getElementById("champ-search");
    let filter = input.value.toUpperCase();
    let champList = document.getElementById("champ-grid");
    let champ = champList.getElementsByClassName("item");
    let textName, textID, image;

    for (i = 0; i < champ.length; i++) {
        image = champ[i].getElementsByTagName("img")[0];
        textName = image.name;
        textID = image.id;

        //Checks if either the name or id of the element begins with what the user is searching for.
        if (
            textName.toUpperCase().startsWith(filter) ||
            textID.toUpperCase().startsWith(filter)
        ) {
            champ[i].classList.remove("hide");
            $(".pagination").add("hide");
        } else {
            champ[i].classList.add("hide");
        }
    }
}
