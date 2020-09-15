//Hide grid.
function champPage(champId, champName) {
  $(".champions").fadeOut();

  //ajax method to get JSON for clicked on champion.
  $.ajax({
    type: "GET",
    url: `http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/champion/${champId}.json`,
    success: function (data) {
      //Declare champion and ability variables.
      let champion = data.data[champId];
      let abilityQ = champion.spells[0];
      let abilityW = champion.spells[1];
      let abilityE = champion.spells[2];
      let abilityR = champion.spells[3];

      //Build up html for clicked on champion and then fade in.
      $("#lore-page")
        .html(
          `<div class = "splash-container">
            <img class = "splash" src="http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champId}_0.jpg">
            <p class = "name">${champName}, <span style="text-transform: capitalize;">${
            champion.title
          }</span></p></div>
            <div class = "container">
            <div class = "row">
            <div class = "col-12">
            <br>
            <p>Role: ${champion.tags.join(", ")}</p>
            <p>Stats:
            <br></p>
            <div class="stats-bar" style="width: ${
              champion.info.attack
            }0%; background: red;">
            <span id="attackbar"> Attack: ${champion.info.attack}/10</span>
            </div>
            <div class="stats-bar" style="width: ${
              champion.info.defense
            }0%; background: green;">
            <span id="defensebar"> Defense: ${champion.info.defense}/10</span>
            </div>
            <div class="stats-bar" style="width: ${
              champion.info.magic
            }0%; background: blue;">
            <span id="magicbar"> Magic: ${champion.info.magic}/10</span>
            </div>
            <div class="stats-bar" style="width: ${
              champion.info.difficulty
            }0%; background: purple;">
            <span id="difficultybar"> Difficulty: ${
              champion.info.difficulty
            }/10</span>
            </div>
            <br>
            <p>Lore:
            <br>${champion.lore}</p>
            <p>Tips when playing ${champName}:
            <br>
            ${champion.allytips.join("<br>")}
            <br><br>
            Tips when playing against ${champName}:
            <br>
            ${champion.enemytips.join("<br>")}
            </p>
            <br>
            <p>Abilities:</p>
            </div>
            </div>
            <div class = "row">
            <div class = "col-xs ml-2" id = "passive-image"><img src = "http://ddragon.leagueoflegends.com/cdn/10.16.1/img/passive/${
              champion.passive.image.full
            }"></div>
            <div class = "col-xs ml-2" id = "q-ability-image"><img src = "http://ddragon.leagueoflegends.com/cdn/10.16.1/img/spell/${
              abilityQ.image.full
            }"></div>
            <div class = "col-xs ml-2" id = "w-ability-image"><img src = "http://ddragon.leagueoflegends.com/cdn/10.16.1/img/spell/${
              abilityW.image.full
            }"></div>
            <div class = "col-xs ml-2" id = "e-ability-image"><img src = "http://ddragon.leagueoflegends.com/cdn/10.16.1/img/spell/${
              abilityE.image.full
            }"></div>
            <div class = "col-xs ml-2" id = "r-ability-image"><img src = "http://ddragon.leagueoflegends.com/cdn/10.16.1/img/spell/${
              abilityR.image.full
            }"></div>
            <div class = "col-12">
            <br>
            <p id = "passive"><strong>${champion.passive.name}</strong><br>${
            champion.passive.description
          }</p>
            <p id = "q-ability" class = "hide"><strong>${
              abilityQ.name
            }</strong><br>${abilityQ.description}</p>
            <p id = "w-ability" class = "hide"><strong>${
              abilityW.name
            }</strong><br>${abilityW.description}</p>
            <p id = "e-ability" class = "hide"><strong>${
              abilityE.name
            }</strong><br>${abilityE.description}</p>
            <p id = "r-ability" class = "hide"><strong>${
              abilityR.name
            }</strong><br>${abilityR.description}</p>
            </div>
            </div>
            </div>
            `
        )
        .fadeIn();

      //Tabs to switch ability descriptions.
      $("#passive-image img").click(function () {
        $("#passive").removeClass("hide");
        $("#q-ability").addClass("hide");
        $("#w-ability").addClass("hide");
        $("#e-ability").addClass("hide");
        $("#r-ability").addClass("hide");
      });
      $("#q-ability-image img").click(function () {
        $("#passive").addClass("hide");
        $("#q-ability").removeClass("hide");
        $("#w-ability").addClass("hide");
        $("#e-ability").addClass("hide");
        $("#r-ability").addClass("hide");
      });
      $("#w-ability-image img").click(function () {
        $("#passive").addClass("hide");
        $("#q-ability").addClass("hide");
        $("#w-ability").removeClass("hide");
        $("#e-ability").addClass("hide");
        $("#r-ability").addClass("hide");
      });
      $("#e-ability-image img").click(function () {
        $("#passive").addClass("hide");
        $("#q-ability").addClass("hide");
        $("#w-ability").addClass("hide");
        $("#e-ability").removeClass("hide");
        $("#r-ability").addClass("hide");
      });
      $("#r-ability-image img").click(function () {
        $("#passive").addClass("hide");
        $("#q-ability").addClass("hide");
        $("#w-ability").addClass("hide");
        $("#e-ability").addClass("hide");
        $("#r-ability").removeClass("hide");
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
    success: function (videoData) {
      console.log(videoData.items);

      //Check that video retrieved contains the champions name to avoid using wrong video.
      let videoUrl = videoData.items[0].id.videoId;
      let videoName = videoData.items[0].snippet.title;
      if (videoName.includes(champName) == true) {
        $("#video")
          .html(
            `
        <div class='embed-container'><iframe src='https://www.youtube.com/embed/${videoUrl}' frameborder='0' allowfullscreen></iframe></div>
        `
          )
          .fadeIn();
      }
    },
  });
}
