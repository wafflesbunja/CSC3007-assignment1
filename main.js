$(document).ready(function() {
    var array = [];
    var object = $("#carparkTable").DataTable();
    var regions = ["west", "national", "east", "central", "south", "north"];
    $.get("https://api.data.gov.sg/v1/environment/psi", function(data) {
      var count = 0;
      for (i in data["items"][0]["readings"]) {
        if (count == 0) {
          for (r in regions) {
            temp = [];
            temp.push(regions[r])
            temp.push(data["items"][0]["readings"][i][regions[r]]);
            array.push(temp);
            // console.log(array)
          }
          count += 1;
        } 
        else {
          for (r in regions) {
            array[regionsSort(regions[r])].push(data["items"][0]["readings"][i][regions[r]]);
          }
        }
      } for (j in array) {object.row.add(array[j]).draw(false);}
    });
  });
  
  function regionsSort(rName) {
    switch (rName) {
      case "west": return 0;
      case "national": return 1;
      case "east": return 2;
      case "central": return 3;
      case "south": return 4;
      case "north": return 5;
      default: return 0;
    }
  }