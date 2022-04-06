function loadTable(dow) {
    var fileName = "/schedule/" + dow + ".csv"

    d3.csv(fileName).then(function (data) {

        console.log(fileName);

        var col_names = ["Id"].concat(Object.keys(data[0]))

        for (let k in data) {
            data[k]["Id"] = parseInt(k) + 1
            // console.log("data", data[k])
        }

        var table = d3.select('#tble').append('table');
        var thead = table.append('thead');
        var tbody = table.append('tbody');


        // console.log(col_names)
        thead.append('tr')
            .selectAll('th')
            .data(col_names).enter()
            .append('th')
            .text((c) => { return c });

        var rows = tbody.selectAll('tr')
            .data(data)
            .enter()
            .append('tr');

        var cells = rows.selectAll('td')
            .data(function (row) {
                //   console.log(col_names.map(function (column) {
                //     return {column: column, value: row[column]};
                //   }))
                return col_names.map(function (column) {
                    return { column: column, value: row[column] };
                });
            })
            .enter()
            .append('td')
            .text(function (d) { return d.value; })

        return table;

    });

}

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function date_time() {
    var d = new Date();

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var hours = d.getHours()
    var minutes = d.getMinutes()
    var sec = d.getSeconds()

    if (minutes < 10) { minutes = "0" + minutes }
    if (sec < 10) { sec = "0" + sec }

    var time = hours + ":" + minutes + ":" + sec + " ";
    if (hours > 11) { time += "PM"; } else { time += "AM"; }

    var dateTime = days[d.getDay()] + " - " + months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() + ", " + time;

    document.getElementById('date').innerHTML = dateTime;

    setTimeout(date_time, 1000);
}

date_time();

let today = (days[(new Date()).getDay()].toLowerCase());
var df = document.getElementById(today);
df.selected = true


loadTable(today)


function getOption(event) {
    selectElement = document.querySelector('#dayofweek');
    console.log(event.target.value)
    document.getElementById("tble").innerHTML = ""
    loadTable(event.target.value)
}

