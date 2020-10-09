//Hide grid.
function champPage(champId, champName) {
    $(".champions").fadeOut();
    $("div.callout-text").fadeOut();

    // Get current patch version.
    $.ajax({
        type: "GET",
        url: "https://ddragon.leagueoflegends.com/api/versions.json",
        success: function(patch) {
            //ajax method to get JSON for clicked on champion.
            $.ajax({
                type: "GET",
                url: `http://ddragon.leagueoflegends.com/cdn/${patch[0]}/data/${language}/champion/${champId}.json`,
                success: function(data) {
                    //Declare champion and ability variables.
                    let champion = data.data[champId];
                    let abilityQ = champion.spells[0];
                    let abilityW = champion.spells[1];
                    let abilityE = champion.spells[2];
                    let abilityR = champion.spells[3];

                    //Build up html for clicked on champion and then fade in.
                    $("#lore-page")
                        .html(
                            `
               <h1 class="text-center name">${champName},<br><span style="text-transform: capitalize;">${
                            champion.title
                            }</span>
               </h1>
            <img class = "splash" src="http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champId}_0.jpg" alt="${champName}">
            <div class = "row">
            <div class = "col-12">
            <br>
            <p><span class="stat-title">Role:</span><br> ${champion.tags.join(", ")}</p>
            <p class="stat-title">Stats:
            <br></p>
            <div class="stats-bar" style="width: ${
                            champion.info.attack
                            }0%; background: red;">
            <span id="attackbar"> ATK: ${champion.info.attack}/10</span>
            </div>
            <div class="stats-bar" style="width: ${
                            champion.info.defense
                            }0%; background: green;">
            <span id="defensebar"> DEF: ${champion.info.defense}/10</span>
            </div>
            <div class="stats-bar" style="width: ${
                            champion.info.magic
                            }0%; background: blue;">
            <span id="magicbar"> MAG: ${champion.info.magic}/10</span>
            </div>
            <div class="stats-bar" style="width: ${
                            champion.info.difficulty
                            }0%; background: purple;">
            <span id="difficultybar"> DIF: ${
                            champion.info.difficulty
                            }/10</span>
            </div>
            <br>
            <p class="stat-title">Lore:</p>
            <br><p>${champion.lore}</p>
            <p>Tips when playing ${champName}:
            <br>
            ${champion.allytips.join("<br>")}
            <br><br>
            Tips when playing against ${champName}:
            <br>
            ${champion.enemytips.join("<br>")}
            </p>
            <br>
            <p class="stat-title">Abilities:</p>
            </div>
            </div>

            <div class = "container">
            <div class = "row">
            <div class = "col-xs-12 ml-2" id = "passive-image"><img src = "http://ddragon.leagueoflegends.com/cdn/${
                            patch[0]
                            }/img/passive/${champion.passive.image.full}" alt="${champName} passive"><p id = "passive"><strong>${champion.passive.name}</strong><br>${
                            champion.passive.description
                            }</p></div><br>
            <div class = "col-xs-12 ml-2" id = "q-ability-image"><img src = "http://ddragon.leagueoflegends.com/cdn/${
                            patch[0]
                            }/img/spell/${abilityQ.image.full}" alt="${champName} q"><p id = "q-ability"><strong>${
                            abilityQ.name
                            }</strong><br>${abilityQ.description}</p></div><br>
            <div class = "col-xs-12 ml-2" id = "w-ability-image"><img src = "http://ddragon.leagueoflegends.com/cdn/${
                            patch[0]
                            }/img/spell/${abilityW.image.full}" alt="${champName} w"><p id = "w-ability"><strong>${
                            abilityW.name
                            }</strong><br>${abilityW.description}</p></div><br>
            <div class = "col-xs-12 ml-2" id = "e-ability-image"><img src = "http://ddragon.leagueoflegends.com/cdn/${
                            patch[0]
                            }/img/spell/${abilityE.image.full}" alt="${champName} e"><p id = "e-ability"><strong>${
                            abilityE.name
                            }</strong><br>${abilityE.description}</p></div><br>
            <div class = "col-xs-12 ml-2" id = "r-ability-image"><img src = "http://ddragon.leagueoflegends.com/cdn/${
                            patch[0]
                            }/img/spell/${abilityR.image.full}" alt="${champName} r"><p id = "r-ability"><strong>${
                            abilityR.name
                            }</strong><br>${abilityR.description}</p></div>
            <br>
            </div>
            `
                        )
                        .fadeIn();
                },
            });
        },
    });



    //Declare varaibles for ajax method.
    let apiKey = "AIzaSyBkNEvkze9pxTOw0Gqj5yCNkYHwCNRYL2s";
    let baseUrl = "https://www.googleapis.com/youtube/v3/search";
    let channelID = "UC2t5bjwHdUX4vM2g8TRDq5g";
    let options = {
        part: "snippet",
        key: apiKey,
        maxResults: 1,
        channelId: channelID,
        q: `${champName} champion spotlight`,
    };

    //Call videoData from youtube API using variables.
    $.ajax({
        type: "GET",
        url: baseUrl,
        data: options,
        success: function(videoData) {
            console.log(videoData.items);

            //Check that video retrieved contains the champions name to avoid using wrong video.
            let videoUrl = videoData.items[0].id.videoId;
            let videoName = videoData.items[0].snippet.title;
            if (videoName.includes(champName) == true) {
                $("#video")
                    .html(
                        `<div class="container">
                        <div class="text-center stat-title"><h2><u>${champName} Champion Spotlight</u></h2></div><br>
                        <div class='embed-container'><iframe src='https://www.youtube.com/embed/${videoUrl}' frameborder='0' allowfullscreen></iframe></div>
                        </div>
                        `
                    )
                    .fadeIn();
            }
        },
    });

    //Refresh to grid on back browser button.
    window.addEventListener('popstate', () => {
        location.reload();
    }, false);
}