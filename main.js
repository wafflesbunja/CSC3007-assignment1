fetch("https://api.data.gov.sg/v1/environment/psi").then((d)=>{
    return d.json();
}).then((data)=>{
    var temp = [];
    readings = data.items[0].readings
    timestamp = new Date(data.items[0].update_timestamp).toLocaleString()
    for (const key in readings) {
      temp.push({
            metric: key,
            national: readings[key].national,
            central: readings[key].central,
            west: readings[key].west,
            east: readings[key].east,
            north: readings[key].north,
            south: readings[key].south,
        })
    }
    $("#timeStamp").text("Last updated: " + timestamp);
    $("#carparkTable").show();
    $("#carparkTable").DataTable({
        data: temp,
        columns: [
            { data: 'metric' },
            { data: 'national' },
            { data: 'central' },
            { data: 'west' },
            { data: 'east' },
            { data: 'north' },
            { data: 'south' }
        ],
        lengthMenu:  [10, 20, 30, 50]
    });
});

