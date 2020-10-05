# import csv
import requests
import json
# Reading an excel file using Python 
import xlrd 

# Give the location of the file 
path = ('data/airport.xls')
workbook = xlrd.open_workbook(path)
sheet = workbook.sheet_by_index(0)
sheet.cell_value(0, 0) 

for row_index in range(1, sheet.nrows):
    if row_index == 1:
        print('nothing')
    else:
        # print(sheet.row_values(row_index))
        if sheet.row_values(row_index)[3] == 'Afghanistan':
            country_code = 'AFG'
        elif sheet.row_values(row_index)[3] == 'Austria':
            country_code = 'AUT'
        elif sheet.row_values(row_index)[3] == 'Cyprus':
            country_code = 'CYP'
        elif sheet.row_values(row_index)[3] == 'Egypt':
            country_code = 'EGY'
        elif sheet.row_values(row_index)[3] == 'Ethiopia':
            country_code = 'ETH'
        elif sheet.row_values(row_index)[3] == 'Finland':
            country_code = 'FIN'
        elif sheet.row_values(row_index)[3] == 'France':
            country_code = 'FRA'
        elif sheet.row_values(row_index)[3] == 'Germany':
            country_code = 'DEU'
        elif sheet.row_values(row_index)[3] == 'Iran':
            country_code = 'IRN'
        elif sheet.row_values(row_index)[3] == 'Iraq':
            country_code = 'IRQ'
        elif sheet.row_values(row_index)[3] == 'Italy':
            country_code = 'ITA'
        elif sheet.row_values(row_index)[3] == 'Japan':
            country_code = 'JPN'
        elif sheet.row_values(row_index)[3] == 'Jordan':
            country_code = 'JOR'
        elif sheet.row_values(row_index)[3] == 'Kenya':
            country_code = 'KEN'
        elif sheet.row_values(row_index)[3] == 'Kuwait':
            country_code = 'KWT'
        elif sheet.row_values(row_index)[3] == 'Latvia':
            country_code = 'LVA'
        elif sheet.row_values(row_index)[3] == 'Luxembourg':
            country_code = 'LUX'
        elif sheet.row_values(row_index)[3] == 'Madagascar':
            country_code = 'MDG'
        elif sheet.row_values(row_index)[3] == 'Malaysia':
            country_code = 'MYS'
        elif sheet.row_values(row_index)[3] == 'Mauritius':
            country_code = 'MUS'
        elif sheet.row_values(row_index)[3] == 'Netherlands':
            country_code = 'NLD'
        elif sheet.row_values(row_index)[3] == 'Nigeria':
            country_code = 'NGA'
        elif sheet.row_values(row_index)[3] == 'Papua New Guinea':
            country_code = 'PNG'
        elif sheet.row_values(row_index)[3] == 'Philippines':
            country_code = 'PHL'
        elif sheet.row_values(row_index)[3] == 'Poland':
            country_code = 'POL'
        elif sheet.row_values(row_index)[3] == 'Qatar':
            country_code = 'QAT'
        elif sheet.row_values(row_index)[3] == 'Republic of Korea':
            country_code = 'KOR'
        elif sheet.row_values(row_index)[3] == 'Romania':
            country_code = 'ROU'
        elif sheet.row_values(row_index)[3] == 'Saudi Arabia':
            country_code = 'SAU'
        elif sheet.row_values(row_index)[3] == 'Solomon Islands':
            country_code = 'SLB'
        elif sheet.row_values(row_index)[3] == 'South Africa':
            country_code = 'ZAF'
        elif sheet.row_values(row_index)[3] == 'South Korea':
            country_code = 'PRK'
        elif sheet.row_values(row_index)[3] == 'Spain':
            country_code = 'ESP'
        elif sheet.row_values(row_index)[3] == 'Sweden':
            country_code = 'SWE'
        elif sheet.row_values(row_index)[3] == 'Swaziland':
            country_code = ''
        elif sheet.row_values(row_index)[3] == 'Tanzania':
            country_code = 'RAA'
        elif sheet.row_values(row_index)[3] == 'United Arab Emirates':
            country_code = 'ARE'
        elif sheet.row_values(row_index)[3] == 'United Kingdom':
            country_code = 'GBR'
        elif sheet.row_values(row_index)[3] == 'United States of America':
            country_code = 'USA'
        elif sheet.row_values(row_index)[3] == 'Unknown':
            country_code = '-'
        data_ = {
            'airport_category': sheet.row_values(row_index)[0],
            'icao_code': sheet.row_values(row_index)[1],
            'name': sheet.row_values(row_index)[2],
            'country': sheet.row_values(row_index)[3],
            'country_code': country_code,
            'is_active': True
        }
        requests.post('https://caam-sbs-api.pipe.my/v1/airports/', data=data_)
        print(data_)