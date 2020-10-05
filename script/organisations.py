# import csv
import requests
import json
# Reading an excel file using Python 
import xlrd 

# Give the location of the file 
path = ('data/organisation.xlsx')
workbook = xlrd.open_workbook(path)
sheet = workbook.sheet_by_index(0)
# print(sheet)
sheet.cell_value(0, 0) 

for row_index in range(1, sheet.nrows):
    if row_index == 1:
        print('nothing')
    else:
        # print(sheet.row_values(row_index))
        data_ = {
            'cid': sheet.row_values(row_index)[0],
            # 'icode': sheet.row_values(row_index)[1],
            # 'iata': sheet.row_values(row_index)[2],
            'name': sheet.row_values(row_index)[3],
            'email_1': sheet.row_values(row_index)[4],
            'office_num': sheet.row_values(row_index)[5],
            'address_line_1': sheet.row_values(row_index)[6]
        }
        # requests.post('https://caam-sbs-api.pipe.my/v1/organisations/', data=data_)
        print(data_)
  
# print(sheet.row_values(2)) 

