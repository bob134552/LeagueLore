function champPage(champId, champName) {
  $(".champions").fadeOut();

  $.ajax({
    type: "GET",
    url: `http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/champion/${champId}.json`,
    success: function (data) {
      let champion = data.data[champId];
      let abilityQ = champion.spells[0];
      let abilityW = champion.spells[1];
      let abilityE = champion.spells[2];
      let abilityR = champion.spells[3];
    

      $("#lore-page")
        .html(
          `<div class = "container">
            <img class = "splash" src="http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champId}_0.jpg">
            <p class = "name">${champName}, <span style="text-transform: capitalize;">${champion.title}</span></p></div>
            <div class = "container">
            <div class = "row">
            <div class = "col-xs-12">
            <br>
            <p>Role: ${champion.tags.join(', ')}</p>
            <p>Stats:
            <br>
            Attack: ${champion.info.attack}/10
            <br>
            Defense: ${champion.info.defense}/10
            <br>
            Magic: ${champion.info.magic}/10
            <br>
            Difficulty: ${champion.info.difficulty}/10
            </p>
            <p>Lore:
            <br>${champion.lore}</p>
            <p>Tips when playing ${champName}:
            <br>
            ${champion.allytips.join('<br>')}
            <br><br>
            Tips when playing against ${champName}:
            <br>
            ${champion.enemytips.join('<br>')}
            </p>
            <br>
            <p>Abilities:</p>
            </div>
            </div>
            <div class = "row">
            <div class = "col-xs mx-2"><img src = "http://ddragon.leagueoflegends.com/cdn/10.16.1/img/passive/${champion.passive.image.full}"></div>
            <div class = "col-xs mx-2"><img src = "http://ddragon.leagueoflegends.com/cdn/10.16.1/img/spell/${abilityQ.image.full}"></div>
            <div class = "col-xs mx-2"><img src = "http://ddragon.leagueoflegends.com/cdn/10.16.1/img/spell/${abilityW.image.full}"></div>
            <div class = "col-xs mx-2"><img src = "http://ddragon.leagueoflegends.com/cdn/10.16.1/img/spell/${abilityE.image.full}"></div>
            <div class = "col-xs mx-2"><img src = "http://ddragon.leagueoflegends.com/cdn/10.16.1/img/spell/${abilityR.image.full}"></div>
            </div>
            </div>
            `
        )
        .fadeIn();
    },
    error: function () {},
  });

  let apiKey = "AIzaSyBkNEvkze9pxTOw0Gqj5yCNkYHwCNRYL2s";
  let baseUrl = "https://www.googleapis.com/youtube/v3/search";
  let channelID = "UC2t5bjwHdUX4vM2g8TRDq5g";
  let options = {
    part: "snippet",
    key: apiKey,
    maxResults: 1,
    channelId: channelID,
    q: `${champName}+champion+spotlight`,
  };

  /**$.getJSON(baseUrl, options, function (videoData) {
    console.log(videoData.items);
    let videoUrl = videoData.items[0].id.videoId;
    let videoName = videoData.items[0].snippet.title;
    if (
      videoName.includes(champName) == true
    ) {
      $("#video")
        .html(
          `
        <div class='embed-container'><iframe src='https://www.youtube.com/embed/${videoUrl}' frameborder='0' allowfullscreen></iframe></div>
    `
        )
        .fadeIn();
    }
  });**/
}
