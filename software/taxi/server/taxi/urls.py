from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import TokenRefreshView
from trips.views import LogInView, SignUpView

urlpatterns = [
    path("", LogInView.as_view(), name="log_in"),
    path("admin/", admin.site.urls),
    path("api/sign_up/", SignUpView.as_view(), name="sign_up"),
    path("api/log_in/", LogInView.as_view(), name="log_in"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path(
        "api/trip/",
        include(
            "trips.urls",
            "trip",
        ),
    ),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
