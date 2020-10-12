const LEAGUE_LORE = 'LEAGUE_LORE';
let language = localStorage.getItem(LEAGUE_LORE) || $(`option[id="default"]`).val();

//On change event for language.
$('select[name="dropdown"]').change(function() {
    language = $(this).val();
    localStorage.setItem(LEAGUE_LORE, language);
    $(".champ-grid").html(" ");
    getChampions(buildGrid);
});

//Gets Champions JSON.
function getChampions(cb) {
    $("#lore-page").hide();
    $("#video").hide();

    // Get current patch version.
    $.ajax({
        type: "GET",
        url: "https://ddragon.leagueoflegends.com/api/versions.json",
        success: function(patch) {
            console.log("current patch: " + patch[0]);

            // Get champion data.
            $.ajax({
                type: "GET",
                url: `http://ddragon.leagueoflegends.com/cdn/${patch[0]}/data/${language}/champion.json`,
                success: function(champions) {
                    cb(champions, patch[0]);
                },
            });
        },
    });
};

$( document ).ready(function() {
    if (language) $('select[name="dropdown"]').val(language);
    getChampions(buildGrid);
});

// Build champion icon display.
function buildGrid(champData, patch) {
    let championArray = Array.from(Object.values(champData.data));
    let championNames = [];
    let championList = " ";
    let index = 1;
    let galleryItems = document.querySelector(".champ-grid").children;
    let prev = document.querySelector(".prev");
    let next = document.querySelector(".next");
    let page = document.querySelector(".page-num");
    let windowSize = window.matchMedia("(max-width: 1025px)");
    let maxItem, pagination;

    //Sets maxItem parameter based on window size.
    function setMaxItem(windowSize) {
        if (windowSize.matches) {
            maxItem = 20;
            pagination = Math.ceil(championArray.length / maxItem);
            $(next).removeClass("hide");
            $("div.item:nth-child(n+21)").addClass("hide");
        } else {
            maxItem = championArray.length;
            pagination = Math.ceil(championArray.length / maxItem);
            $("div.item").removeClass("hide");
        }
    }

    // Add listener to check window size.
    setMaxItem(windowSize);
    windowSize.addListener(setMaxItem);


    // Build champion list.
    for (let i = 0; i < championArray.length; i++) {
        championNames.push(championArray[i].name);
        if (i < maxItem) {
            championList += `<div class="item text-md-center"><img onClick="return champPage(this.id, this.alt)" id="${championArray[i].id}" src="http://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${championArray[i].id}.png" alt="${championArray[i].name}"><br><span class="champ-name">${championArray[i].name}</span></div>`;
            document.getElementById("champ-grid").innerHTML = championList;
        } else {
            championList += `<div class="item hide text-md-center"><img onClick="return champPage(this.id, this.alt)" id="${championArray[i].id}" src="http://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${championArray[i].id}.png" alt="${championArray[i].name}"><br><span class="champ-name">${championArray[i].name}</span></div>`;
            document.getElementById("champ-grid").innerHTML = championList;
        }
    }

    //Set up pagination buttons by adding listeners to each
    prev.addEventListener("click", function() {
        index--;
        check(index, pagination, next, prev);
        showItems(championArray, galleryItems, index, maxItem, page);
    });

    next.addEventListener("click", function() {
        index++;
        check(index, pagination, next, prev);
        showItems(championArray, galleryItems, index, maxItem, page);
    });


    window.onload = function() {
        showItems(championArray, galleryItems, index, maxItem, page);
        check(index, pagination, next, prev);
    };

    //Call autocomplete when user searchs for a champion.
    autocomplete(championNames);
}

//Add css class to current images being shown and hide class to images being hidden
function showItems(championArray, galleryItems, index, maxItem, page) {
    for (let i = 0; i < championArray.length; i++) {
        galleryItems[i].classList.add("hide");

        if (i >= index * maxItem - maxItem && i < index * maxItem) {
            galleryItems[i].classList.remove("hide");
        }
        page.innerHTML = index;
    }
}

//Check index to enable or disable next and previous buttons.
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
    let championArray = Array.from(Object.values(champions.data));
    let championName, championID;

    for (i = 0; i < championArray.length; i++) {
        championName = championArray[i].name;
        championID = championArray[i].id;

        //Checks if either the name or id of the element begins with what the user is searching for.
        if (championName.toUpperCase().startsWith(filter) === true ||
            championID.toUpperCase().startsWith(filter) === true) {
            champPage(championID, championName);
            break
        } 
        else {
            $(".results").html(`Sorry, no results for ${input.value}.`).delay(1000).fadeIn("slow");
        }
    }
}

//Removes active class from non relevant names.
function removeActive(x) {
    for (i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
    }
}

//Enables autocomplete when typing in a champions name.
function autocomplete(championNames) {
    const inputElement = document.getElementById("champ-search");
    let currentFocus;

    inputElement.addEventListener("input", function(e) {
        let newNameDiv, activeNames, val = this.value;
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        newNameDiv = document.createElement("div");
        newNameDiv.setAttribute("id", this.id + "autocomplete-list");
        newNameDiv.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(newNameDiv);

        //Creates dropdown item.
        for (i = 0; i < championNames.length; i++) {
            if (championNames[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                activeNames = document.createElement("div");
                activeNames.innerHTML = "<strong>" + championNames[i].substr(0, val.length) + "</strong>";
                activeNames.innerHTML += championNames[i].substr(val.length);
                activeNames.innerHTML += "<input type='hidden' value='" + championNames[i] + "'>";

                activeNames.addEventListener("click", function(e) {
                    inputElement.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                newNameDiv.appendChild(activeNames);
            }
        }
    });

    //Removes div elements when they don't match input or dont match drop down.
    function closeAllLists(elmnt) {
        let x = document.getElementsByClassName("autocomplete-items");
        for (i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inputElement) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    //Add active class to relevant names.
    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }

    //Scroll up and down list.
    inputElement.addEventListener("keydown", function(e) {
        let x = document.getElementById(this.id + "autocomplete-list");
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

    document.addEventListener("click", function(e) {
        closeAllLists(e.target);
    });
}