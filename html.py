import pandas.io.formats.style, pandas as pd


def write_to_html_file(df, title='', filename='out.html'):
    '''
    Write an entire dataframe to an HTML file with nice formatting.
    '''

    result = '''
<html>
<head>
    <h2><span id='date'></span></h2>
<style>

    h2 {
        text-align: center;
        line-height: 1.5em;
        font-family: Helvetica, Arial, sans-serif;
    }
    table { 
        margin-left: auto;
        margin-right: auto;
    }

    .wide {
        width: 90%; 
    }

    table {
        border-collapse: collapse;
        border-radius: 5px;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
        overflow: hidden;
        font-family: "Quicksand", sans-serif;
        font-weight: bold;
        font-size: 14px;
    }

    th {
        background: #009578;
        color: #ffffff;
        text-align: left;
    }

    th, td {
        padding: 10px 20px;
        text-align: center;
        font-family: Helvetica, Arial, sans-serif;
        font-size: 90%;
    }

    tr:nth-child(even) {
        background: #eeeeee;
    }

    table tbody tr:hover {
        background-color: #dddddd;
    }


</style>
</head>
<body>
    '''
    result += '<h2> %s </h2>\n' % title
    if type(df) == pd.io.formats.style.Styler:
        result += df.render()
    else:
        result += df.to_html(classes='wide', escape=False)
    result += '''

    <script>
        /* function timedRefresh(timeoutPeriod) {
            setTimeout("location.reload(true);",timeoutPeriod);
        }
        window.onload = timedRefresh(1000); 

        var d = new Date();
        const time = d.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });

        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        document.getElementById('date').innerHTML= days[d.getDay()] + " - " + months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() + " - " + time;

        
    </script>
</body>
</html>
'''
    with open(filename, 'w') as f:
        f.write(result)
