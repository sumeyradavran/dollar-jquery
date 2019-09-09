const url =
  "https://cors-anywhere.herokuapp.com/https://www.bloomberght.com/piyasa/intradaydata/dolar";

$(document).ready(fetchData());

$(".btn").click(function() {
  $(".loading").removeClass("hidden");
  $("table").addClass("hidden");
  fetchData();
});

function fetchData() {
  $.getJSON(url, function(result) {
    let apiData = result["SeriesData"].slice(-10);
    generateDateAndTime(apiData);
    let output =
      "<table><thead><tr><th>Date and Time</th><th>Dollar Time</th></thead><tbody>";
    for (let i in apiData) {
      output +=
        "<tr><td>" + apiData[i][0] + "</td><td>" + apiData[i][1] + "</td></tr>";
    }
    output += "</tbody></table>";
    $(".table").html(output);
    $(".loading").addClass("hidden");
    $("table").removeClass("hidden");
  }).fail(function() {
    $(".content").addClass("hidden");
    $(".error").removeClass("hidden");
  });
}

function generateDateAndTime(array) {
  array.map(data => {
    let date = new Date(data[0]).toLocaleDateString("tr-TR");
    let time = new Date(data[0])
      .toLocaleTimeString("tr-TR")
      .toString()
      .slice(0, -3);
    return (data[0] = `${date} ${time}`);
  });
}
