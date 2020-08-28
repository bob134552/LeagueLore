function champPage(champId, champName) {
  $(".champions").fadeOut();

  $.ajax({
    type: "GET",
    url: `http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/champion/${champId}.json`,
    success: function (data) {
      let champion = data.data[champId];
      $("#lore-page")
        .html(
          `<div class = "container">
            <img class = "splash" src="http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champId}_0.jpg">
            <br><br>
            <div class = "row">
            <div>${champion.lore}</div>
            </div>
            </div>
            `
        )
        .fadeIn();
    },
    error: function () {},
  });

  let apiKey = "AIzaSyBhX4xm76nIrGUv-GFZeIuChOO6gQWK-4w";
  let baseUrl = "https://www.googleapis.com/youtube/v3/search";
  let channelID = "UC2t5bjwHdUX4vM2g8TRDq5g";

  let options = {
    part: "snippet",
    key: apiKey,
    maxResults: 1,
    channelId: channelID,
    q: `${champName}+champion+spotlight`
  };

  $.getJSON(baseUrl, options, function (videoData) {
          console.log(videoData.items[0].snippet);
      }
  );
}