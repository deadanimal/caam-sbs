# import csv
import requests
import json
# Reading an excel file using Python 
import xlrd 

# Give the location of the file 
path = ('data/aircraft.xlsx')
workbook = xlrd.open_workbook(path)
sheet = workbook.sheet_by_index(0)
sheet.cell_value(0, 0) 

for row_index in range(1, sheet.nrows):
    # print(sheet.row_values(row_index))
    data_ = {
        'registration_num': sheet.row_values(row_index)[0],
        'weight_category': sheet.row_values(row_index)[1],
        'actual_weight': sheet.row_values(row_index)[2],
        'model': sheet.row_values(row_index)[3]
    }
    # requests.post('https://caam-sbs-api.pipe.my/v1/aircrafts/', data=data_)
    print(data_)

