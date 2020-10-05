import csv
import requests
import json

with open('air_sel.csv', mode='r') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    line_count = 0
    for row in csv_reader:
        if line_count == 0:
            # print(f'Column names are {", ".join(row)}')
            line_count += 1
        # print(f'\tworks in the {row["Email Address"]}')
        account = {
            'email': row["Email Address"],
            'username': row["Email Address"],
            'password1': 'airselrfid1234',
            'password2': 'airselrfid1234'
        }
        line_count += 1
        #print(json.dumps(account))
        requests.post('https://airsel-rfid-api.pipe.my/auth/registration/', data=account)
    print(f'Processed {line_count} lines.')