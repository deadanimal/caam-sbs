import os
import datetime, pandas, time
from datetime import timezone
from django.db.models import Count, Q, Sum
from rest_framework.permissions import IsAuthenticated 
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django.core.files.storage import default_storage
from weasyprint import HTML, CSS
from django.template.loader import render_to_string
from django.core.files.base import ContentFile
from django.http import JsonResponse, HttpResponse
import pandas
import json

# import settings
from core.settings import BASE_DIR 

from dispute.models import (
   Dispute 
)

from operations.models import (
   Fpldata,
   Callsign
)

from users.models import CustomUser
from organisations.models import Organisation
from invoice.models import Invoices
from note.models import Note

from dispute.serializers import DisputeSerializer
from note.serializers import NoteSerializer

class DisputeViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Dispute.objects.all()
    serializer_class = DisputeSerializer

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]   

    def get_queryset(self):
        queryset = Dispute.objects.all()
        return queryset

    @action(methods=['POST', 'GET'], detail=False)
    def reject(self, request, *args, **kwargs):
        queryset = Dispute.objects.filter(id=request.data['id'])
        queryset.update(status = "REJECTED")
        return Response(status.HTTP_200_OK)


    @action(methods=['POST', 'GET'], detail=False)
    def submit(self, request, *args, **kwargs):

        init_running_no = 1000
        running_no = init_running_no + 1
        init_running_no = running_no

        orgs = Organisation.objects.filter(cid_id=request.data['cid'])
        temp_obj = {
            "company_name": orgs.values()[0]['name'],
            "created_at_str": datetime.datetime.now().strftime("%d/%m/%Y"),
            'cid' : request.data['cid'],
            'fpl_ids' : request.data['fpl_ids'],
            'remarks' : request.data['remarks'],
            'dispute_no': init_running_no + 1
        }

        serializer = DisputeSerializer(data = temp_obj)
        valid = serializer.is_valid(raise_exception = True)
        serializer.save()

        return Response({'msg':'jokes on u madafaka'})

    @action(methods=['POST', 'GET'], detail=False)
    def getFilteredCID(self, request, *args, **kwargs):
        cid_id = CustomUser.objects.filter(id=request.data['id']).values()[0]['cid_id']
        queryset = Dispute.objects.filter(cid=cid_id) 
        serializer_class = DisputeSerializer(queryset, many=True)
        return Response(serializer_class.data)
    
    @action(methods=['POST', 'GET'], detail=False)
    def getdisputedfpls(self, request, *args, **kwargs):
        queryset = [Fpldata.objects.filter(id=i).values()[0] for i in request.data['fpl_ids']]
        return Response(queryset)

    @action(methods=['POST', 'GET'], detail=False)
    def getdisputedfpls_2(self, request, *args, **kwargs):
        try:
            queryset = [Fpldata.objects.filter(id=i).values()[0] for i in request.data['arch_ids']]
        except Exception as e:
            queryset = [{}]

        return Response(queryset)
    
    @action(methods=['POST', 'GET'], detail=False)
    def assignDispute(self, request, *args, **kwargs):
        queryset = Dispute.objects.filter(id = request.data['id'])
        queryset.update(assign_to = request.data['user'], status = "PROCESSED")
        return Response(status.HTTP_200_OK)

    @action(methods=['POST', 'GET'], detail=False)
    def archive(self, request, *args, **kwargs):
        id_to_archieve = request.data['fpl_id']

        dispute = Dispute.objects.filter(id=request.data['dispute_id']) 

        # fpl_ids
        fpl_list = dispute.values()[0]['fpl_ids']
        fpl_list.remove(id_to_archieve)

        # archive_list
        arch_list = dispute.values()[0]['arch_ids']

        if arch_list is None:
            arch_list = [id_to_archieve]
        else:
            arch_list.append(id_to_archieve)

        dispute.update(fpl_ids = fpl_list, arch_ids = arch_list)
        return Response(dispute.values()[0])


    @action(methods=['POST', 'GET'], detail=False)
    def getfilter(self, request, *args, **kwargs):
        utype = request.data['type']
        queryset = []
        if utype == 'ops':
            queryset = Dispute.objects.filter(assign_to = request.data['email'])
    
        elif utype == 'aln':
            queryset = Dispute.objects.filter(cid = request.data['cid'])
        
        serializer_class = DisputeSerializer(queryset, many = True)
        return Response(serializer_class.data)

    @action(methods=['POST', 'GET'], detail=False)
    def createnote(self, request, *args, **kwargs):

        dispute = Dispute.objects.filter(id=request.data['id']).values()[0]
        orgs = Organisation.objects.filter(cid=dispute['cid']).values()[0]
        inv = Invoices.objects.filter(cid=dispute['cid']).values()
        inv = inv[len(inv)-1]
        print(inv['created_at_str'])
        
        flight = [] # error in flight 
        airline = [] # error in airline assign 
        offset_amount = 0

        disputedFpls = dispute['fpl_ids']
        for i in disputedFpls:
            data = Fpldata.objects.filter(id=i).values()[0]
            if data['error_type'] == 'FLIGHT':
                flight.append(data)
            elif data['error_type'] == 'AIRLINE':
                airline.append(data)

        # credit-debit note base
        temp_obj = {
            'amount': "",
            'remarks': "",
            'cid_id': dispute['cid'],
            'note_type': "",
            'company_name': orgs['name'], 
            'company_address': orgs['address_line_1'],
            'company_email': orgs['email_1'],
            'company_tel': orgs['office_num'],
            'company_fax': orgs['fax_number'],
            'invoice_id': str(inv['id']),
            'invoice_amount': inv['invoice_total'],
            'invoice_period': inv['inv_period'],
            'created_at_str': datetime.datetime.now().strftime("%d/%m/%Y"),
        }


        # process flight error
        for i in flight:
            #offset_amount += (i['amount'] - (float(i['rate'])*float(i['distance']))
            temp = i['amount'] - round(i['dist']*i['rate'],2)
            offset_amount += temp
        
        if offset_amount > 0:
            # create credit note 
            temp_obj['amount'] = offset_amount
            temp_obj['note_type'] = 'CREDIT'
            temp_obj['remarks'] = f"Invoice :{inv['inv_period']} is overcharged due to flight error"

            # generate running no
            count = Note.objects.all().count() + 1
            y = datetime.datetime.now().strftime('%Y')
            temp_obj['note_no'] = f"C{count}/{y}"

    
            serializer_class = NoteSerializer(data = temp_obj)
            valid = serializer_class.is_valid(raise_exception=True) 
            serializer_class.save()

            
        if offset_amount < 0:
            # create debit note
            temp_obj['amount'] = abs(offset_amount)
            temp_obj['note_type'] = 'DEBIT'
            temp_obj['remarks'] = f"Invoice :{inv['inv_period']} is undercharged due to flight error"

            # generate running no
            count = Note.objects.all().count() + 1
            y = datetime.datetime.now().strftime('%Y')
            temp_obj['note_no'] = f"C{count}/{y}"



            serializer_class = NoteSerializer(data = temp_obj)
            valid = serializer_class.is_valid(raise_exception=True) 
            serializer_class.save()

        
        # process airline error
        temp = {}
        wrong_cid = []
        cids = []
        for i in airline:
            callsign = Callsign.objects.filter(callsign__startswith=i['fpl_no'][0:3]).values()
            if len(callsign) > 0:
                cid=callsign[0]['cid_id']
                cids.append(cid)
                if cid != dispute['cid']:
                    wrong_cid.append(i)

            else:
                wrong.append(i)

        cids = set(cids) 
        for i in cids:
            temp[i] = 0
            for j in wrong_cid:
                if Callsign.objects.filter(callsign__startswith=j['fpl_no'][0:3]).values()[0]['cid_id'] == i:
                    temp[i] += j['amount']

        # generate debit from temp for the wrong airline       
        credit = 0
        for i in cids:
            if temp[i] != 0 and i!=dispute['cid']:
                # override base orgs, invs to build the note
                orgs = Organisation.objects.filter(cid=i).values()[0]
                inv = Invoices.objects.filter(cid=i).values()
                inv = inv[len(inv)-1]
                temp_obj = {
                            'amount': temp[i],
                            'remarks': "Wrong Airline",
                            'cid_id': i,
                            'note_type': "DEBIT",
                            'company_name': orgs['name'], 
                            'company_address': orgs['address_line_1'],
                            'company_email': orgs['email_1'],
                            'company_tel': orgs['office_num'],
                            'company_fax': orgs['fax_number'],
                            'invoice_id': str(inv['id']),
                            'invoice_amount': inv['invoice_total'],
                            'invoice_period': inv['inv_period'],
                            'created_at_str': datetime.datetime.now().strftime("%d/%m/%Y"),
                }

                # generate running no
                count = Note.objects.all().count() + 1
                y = datetime.datetime.now().strftime('%Y')
                temp_obj['note_no'] = f"C{count}/{y}"


                serializer_class = NoteSerializer(data = temp_obj)
                valid = serializer_class.is_valid(raise_exception=True) 
                serializer_class.save()

                credit += temp[i]

        # create credit
        if credit > 0:
            dispute = Dispute.objects.filter(id=request.data['id']).values()[0]
            orgs = Organisation.objects.filter(cid=dispute['cid']).values()[0]
            inv = Invoices.objects.filter(cid=dispute['cid']).values()
            inv = inv[len(inv)-1]
            
            temp_obj = {
                'amount': credit,
                'remarks': "Wrong Airline",
                'cid_id': dispute['cid'],
                'note_type': "CREDIT",
                'company_name': orgs['name'], 
                'company_address': orgs['address_line_1'],
                'company_email': orgs['email_1'],
                'company_tel': orgs['office_num'],
                'company_fax': orgs['fax_number'],
                'invoice_id': str(inv['id']),
                'invoice_amount': inv['invoice_total'],
                'invoice_period': inv['inv_period'],
                'created_at_str': datetime.datetime.now().strftime("%d/%m/%Y"),
            }

            # generate running no
            count = Note.objects.all().count() + 1
            y = datetime.datetime.now().strftime('%Y')
            temp_obj['note_no'] = f"C{count}/{y}"

    
            serializer_class = NoteSerializer(data = temp_obj)
            valid = serializer_class.is_valid(raise_exception=True) 
            serializer_class.save()
    

        queryset = Dispute.objects.filter(id=request.data['id'])
        queryset.update(status = "CLOSED")

        return Response(status.HTTP_200_OK)
        
        

