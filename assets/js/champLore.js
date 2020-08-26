
function champPage(champId, champName) {
    $(".champions").fadeOut();
    

    $.ajax({
        type: "GET",
        url: `http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/champion/${champId}.json`,
        success: function (data) {

            let champion = data.data[champId];
            $("#lore-page").html(`
            <div>
            <img class="splash" src="http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champId}_0.jpg">
            <div>${champion.lore}</div>
            </div>
            `).fadeIn();
        },
        error:function(){
        }   
    });

    let apiKey = "AIzaSyBhX4xm76nIrGUv-GFZeIuChOO6gQWK-4w"
    let baseUrl = "https://www.googleapis.com/youtube/v3/playlistItems"
    let playlistID = "PLbAFXJC0J5GaVjPNNw_i-oLNKc7bVQcFk"

    let options = {
            part: 'snippet',
            key: apiKey,
            maxResults: 50,
            playlistId: playlistID
    }

    $.getJSON(baseUrl, options, function (videoData) {
            console.log(videoData.items);
        }
    );
}
