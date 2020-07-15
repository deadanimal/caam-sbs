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

# Operations app
from operations.views import (
    ChargeViewSet,
    CallsignViewSet,
    RateViewSet,
    RouteViewSet,
    UploadViewSet
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

uploads_router = router.register(
    'uploads', UploadViewSet
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

# Payments
from payments.views import (
    InvoiceViewSet,
    PaymentViewSet,
    ReceiptViewSet,
    ReminderViewSet
)

invoice_router = router.register(
    'invoices', InvoiceViewSet
)

payments_router = router.register(
    'payments', PaymentViewSet
)

receipts_router = router.register(
    'receipts', ReceiptViewSet
)

reminders_router = router.register(
    'reminders', ReminderViewSet
)



urlpatterns = [
    url(r'v1/', include(router.urls)),
    url(r'auth/', include('rest_auth.urls')),
    url(r'auth/registration/', include('rest_auth.registration.urls')),

    url('auth/obtain/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    url('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    url('auth/verify/', TokenVerifyView.as_view(), name='token_verify')
]