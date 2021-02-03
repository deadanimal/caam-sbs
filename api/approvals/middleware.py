import json
from .serializers import (
    ApprovalSerializer
)

class ApprovalMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        return response

    # def process_request(self, request):
    #     return print('process_request')

    def process_view(self, request, view_func, view_args, view_kwargs):

        path = request.path.rsplit('/')[2] if request.path.rsplit('/')[2] != '' else ''

        # get the module based on request.path
        switcher = {
            'rates': 'RA',
            'callsigns': 'CS',
            'aircrafts': 'AC',
            'airports': 'AP',
            'routes': 'RO',
            'exemptions': 'EX',
        }
        module = switcher.get(path, 'Invalid argument')
        print('module:' + module)
        
        if module is not 'Invalid argument':

            # convert byte string into json format
            if request.body:
                body_unicode = request.body.decode('utf-8')
                body_data = json.loads(body_unicode)

            # print important request
            # print('path: ' + request.path)
            # print('path in rsplit')
            # print(request.path.rsplit('/'))
            # print('method: ' + request.method)

            if request.method == 'POST':
                data = {
                    'type': module,
                    'description': 'Create new data in ' + path,
                    'status': 'NA',
                    'json_data': str(body_data)
                }
                serializer = ApprovalSerializer(data=data)
                if serializer.is_valid():
                    serializer.save()
                else: print(serializer.errors)

            elif request.method == 'PUT' or request.method == 'PATCH':
                data = {
                    'type': module,
                    'description': 'Update data in ' + path + ' (id = ' + body_data['id'] + ')',
                    'status': 'NA',
                    'json_data': str(body_data)    
                }
                serializer = ApprovalSerializer(data=data)
                if serializer.is_valid():
                    serializer.save()
                else: print(serializer.errors)

            elif request.method == 'DELETE':
                data = {
                    'type': module,
                    'description': 'Delete data in ' + path + ' (id = ' + request.path.rsplit('/')[3] + ')',
                    'status': 'NA',
                }
                serializer = ApprovalSerializer(data=data)
                if serializer.is_valid():
                    serializer.save()
                else: print(serializer.errors)

        return print('process_view')

    # def process_response(self, request, response):
    #     return print('process_response')