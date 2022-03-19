import pandas as pd
from html import write_to_html_file

a = pd.read_csv("schedule/monday.csv")
 
# to save as html file
# named as "Table"
a.to_html("Table.html")
 
# assign it to a
# variable (string)
# html_file = a.to_html()

write_to_html_file(a, title='', filename='out.html')