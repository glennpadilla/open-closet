from django.urls import path
from .api_views import api_shoes, api_shoe, api_delete_binVO

urlpatterns = [
    path("bins/<int:bin_vo_id>/", api_delete_binVO, name="api_delete_binVO"),
    path("shoes/", api_shoes, name="shoes"),
    path("bins/<int:bin_vo_id/shoes/", api_shoes, name="api_shoes"),
    path("shoes/<int:pk>/", api_shoe, name="api_shoe")
]
