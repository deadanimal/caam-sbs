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

from note.serializers import NoteSerializer
from invoice.serializers import InvoiceSerializer

from note.models import Note
from users.models import CustomUser
from organisations.models import Organisation
from invoice.models import Invoices

class NoteViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer 
    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]   

    # display all for hod, finance, ops, apt
    def get_queryset(self):
        queryset = Note.objects.all()
        return queryset

    # user specific display for airline
    @action(methods=['POST', 'GET'], detail=False)
    def getfiltered(self, request, *args, **kwargs):
        cid_id = CustomUser.objects.filter(id=request.data['user_id']).values()[0]['cid_id']
        queryset = Note.objects.filter(cid_id=cid_id) 
        serializer_class = NoteSerializer(queryset, many=True)
        return Response(serializer_class.data)

    @action(methods=['POST', 'GET'], detail=False)
    def submit(self, request, *args, **kwargs):
        data = request.data
        orgs = Organisation.objects.filter(cid=data['cid_id']).values()[0]
        inv = Invoices.objects.last()

        temp_obj = {
            'amount': data['amount'],
            'remarks': data['remarks'],
            'cid_id': data['cid_id'],
            'note_type': data['note_type'],
            'company_name': orgs['name'], 
            'company_address': orgs['address_line_1'],
            'company_email': orgs['email_1'],
            'company_tel': orgs['office_num'],
            'company_fax': orgs['fax_number'],
            'invoice_id': str(inv.id),
            'invoice_amount': inv.invoice_total,
            'invoice_period': inv.inv_period,
            'created_at_str': datetime.datetime.now().strftime("%d/%m/%Y"),
        }

        serializer_class = NoteSerializer(data = temp_obj)
        valid = serializer_class.is_valid(raise_exception=True) 
        serializer_class.save()
        return Response(status.HTTP_200_OK)

    @action(methods=['POST', 'GET'], detail=False)
    def downloadpdf(self, request, *args, **kwargs):
        note = Note.objects.filter(id = request.data['id']).values()[0]   
        print(note)

        file_name = "note.pdf"
        data_loaded = {}
        css_file = 'https://pipeline-project.sgp1.digitaloceanspaces.com/mbpp-elatihan/css/template.css' 

        # data to populate pdf

        current_date = datetime.datetime.now().strftime("%d/%m/%Y")
        correct_amount = note['invoice_amount'] - note['amount']

        org = {
            "company_name": note['company_name'],    
            "company_email": note['company_email'],
            "office_num": note['company_tel'],
            "fax_number": note['company_fax']
        }

        notes = {
            "note_type": note['note_type'],
            "id": note['id'],
            "created_at_str": note['created_at_str'],
            "cid_id": note['cid_id'],
            "amount": note['amount'],
        }

        inv = {
           "invoice_no": note['invoice_id'],
           "invoice_period": note['invoice_period'],
           "invoice_total": note['invoice_amount']
        }

        html_string = render_to_string('credit-debit.html', {"inv": inv, "note":notes, "org": org, "current_date": current_date, "correct_amount": correct_amount})

        css_path = f"{BASE_DIR}/templates/custom.css"

        pdf = HTML(string=html_string).write_pdf(stylesheets=[CSS(css_path)])
        response = HttpResponse(pdf, content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="' + file_name +'"'
        return response

