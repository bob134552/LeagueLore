let language = $(`option[name="default"]`).val();

$('select[name="dropdown"]').change(function () {
    language = $(this).val();
    $(".champ-grid").html(" ");
    getData(buildGrid);
});



function getData(cb) {
    $("#lore-page").hide();
    $("#video").hide();

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
                    cb(champions, patch[0]);
                },
            });
        },
    });
};

$(document).ready(getData(buildGrid));

// Build champion icon display.
function buildGrid(champData, patch) {
    let champArray = Array.from(Object.values(champData.data));
    let champAutoArray = champArray.map(({ name }) => name);;
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

    //Call autocomplete when user searchs for a champion.
    autocomplete(document.getElementById("champ-search"), champAutoArray);
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

function check(index, pagination, next, prev) {
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
function searchChamp(champions) {
    let input = document.getElementById("champ-search");
    let filter = input.value.toUpperCase();
    let champArray = Array.from(Object.values(champions.data));
    let textName, textID;

    for (i = 0; i < champArray.length; i++) {
        textName = champArray[i].name;
        textID = champArray[i].id;

        //Checks if either the name or id of the element begins with what the user is searching for.
        if (
            textName.toUpperCase().startsWith(filter) ||
            textID.toUpperCase().startsWith(filter)
        ) {
            champPage(textID, textName);
        } else {
            $(".results").html(`Sorry, no results for ${input.value}.`).fadeIn("slow");
        }
    }
}


function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        a = document.createElement("div");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);


        for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("div");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

                b.addEventListener("click", function (e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });

    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) { //down key press
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) { //up key press
            currentFocus--;
            addActive(x);
        } else if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
    });

    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}