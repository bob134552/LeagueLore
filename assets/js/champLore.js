
function champPage(champId) {
    $(".champions").fadeOut();

    $.ajax({
        type: "GET",
        url: `http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/champion/${champId}.json`,
        success: function (data) {
        
        }
    });
}
