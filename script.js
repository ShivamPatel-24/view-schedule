
var fileName = "/schedule/monday.csv"

d3.csv(fileName).then( function(data) {

    console.log(data);

    var table = d3.select('body').append('table');
    var thead = table.append('thead');
    var tbody = table.append('tbody');


    var col_names = Object.keys(data[0])
    console.log(col_names)
    thead.append('tr')
	  .selectAll('th')
	  .data(col_names).enter()
	  .append('th')
	    .text( (c) => {return c});

    var rows = tbody.selectAll('tr')
	  .data(data)
	  .enter()
	  .append('tr');

      var cells = rows.selectAll('td')
	  .data(function (row) {
	    return col_names.map(function (column) {
	      return {column: column, value: row[column]};
	    });
	  })
	  .enter()
	  .append('td')
	    .text(function (d) { return d.value; });

  return table;

});



function date_time(){
    var d = new Date();

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var hours = d.getHours()
    var minutes = d.getMinutes()
    var sec = d.getSeconds()

    if (minutes < 10){ minutes = "0" + minutes }
    if (sec < 10){ sec = "0" + sec }

    var time = hours + ":" + minutes + ":" + sec + " ";
    if(hours > 11){ time += "PM"; } else { time += "AM"; }

    var dateTime = days[d.getDay()] + " - " + months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() + ", " + time;
    
    console.log("Date time:",date_time)
    document.getElementById('date').innerHTML= dateTime;

    setTimeout(date_time,1000);
}

date_time();
