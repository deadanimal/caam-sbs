from datetime import datetime, timedelta

from django.conf import settings
from django.conf.urls import include, url
from django.contrib.gis import admin

from rest_framework import routers
from rest_framework_extensions.routers import NestedRouterMixin

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

from users.views import (
    MyTokenObtainPairView
)

class NestedDefaultRouter(NestedRouterMixin, routers.DefaultRouter):
    pass

router = NestedDefaultRouter()

# Aircrafts app
from aircrafts.views import (
    AircraftViewSet
)

aircrafts_router = router.register(
    'aircrafts', AircraftViewSet
)

# Airports app
from airports.views import (
    AirportViewSet
)

airports_router = router.register(
    'airports', AirportViewSet
)

# Approvals app
from approvals.views import (
    ApprovalViewSet
)

approvals_router = router.register(
    'approvals', ApprovalViewSet
)

# Operations app
from operations.views import (
    ChargeViewSet,
    CallsignViewSet,
    RateViewSet,
    RouteViewSet,
    FileUploadViewSet,
    FpldataViewSet,
    FpldataHistoryViewSet
)

charges_router = router.register (
    'charges', ChargeViewSet
)

callsigns_router = router.register(
    'callsigns', CallsignViewSet
)

rates_router = router.register(
    'rates', RateViewSet
)

routes_router = router.register(
    'routes', RouteViewSet
)

file_uploads_router = router.register(
    'file-uploads', FileUploadViewSet
)

fpldata_router = router.register(
    'fpldatas', FpldataViewSet
)

fpldatahistory_router = router.register(
    'fpldatas-history', FpldataHistoryViewSet
)

# Organisations app
from organisations.views import (
    OrganisationViewSet
)

organisations_router = router.register(
    'organisations', OrganisationViewSet
)

# Users app
from users.views import (
    CustomUserViewSet
)

users_router = router.register(
    'users', CustomUserViewSet
)

# Countries app
from countries.views import (
    CountryViewSet
)

countries_router = router.register(
    'countries', CountryViewSet
)

# Audit Trails app
from audittrails.views import (
    AuditTrailViewSet
)

audittrails_router = router.register(
    'audit-trails', AuditTrailViewSet
)

# Invoices app
from invoice.views import (
    InvoiceViewSet
)

invoice_router = router.register(
    'invoices', InvoiceViewSet
)

# Payment app
from payments.views import (
    PaymentViewSet
)

# Dispute app
from dispute.views import (
    DisputeViewSet
)

dispute_router = router.register(
    'dispute', DisputeViewSet
)

# Payment app
from payments.views import (
    PaymentViewSet
)

# Note app
from note.views import (
   NoteViewSet 
)

note_router = router.register(
    'note', NoteViewSet 
)

# Payment app
from payments.views import (
    PaymentViewSet, DepositsViewSet
)


deposites_router = router.register(
    'deposits', DepositsViewSet
)


payment_router = router.register(
    'payments', PaymentViewSet
)

# Account app

# statement
from accounts.views import (
    StatementViewSet
)

statement_router = router.register(
    'statements', StatementViewSet
)

from accounts.views import (
    LedgerViewSet
)

ledger_router = router.register(
    'ledgers', LedgerViewSet
)

urlpatterns = [
    url(r'v1/', include(router.urls)),
    url(r'auth/', include('rest_auth.urls')),
    url(r'auth/registration/', include('rest_auth.registration.urls')),#reg

    url('auth/obtain/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    url('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    url('auth/verify/', TokenVerifyView.as_view(), name='token_verify')
]
