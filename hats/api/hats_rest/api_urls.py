from django.urls import re_path, path

from .api_views import api_list_hats, api_show_hat, api_delete_locationVO


urlpatterns = [ #path to delete location VO using pk(location_vo_id) to match import_href of location VO
    path("locations/<int:location_vo_id>/", api_delete_locationVO, name="api_delete_locationVO"),   #create path for deleting location VO:
    path("hats/", api_list_hats, name="api_list_hats"),
    path("locations/<int:location_vo_id>/hats/", api_list_hats, name="api_list_hats"),
    path("hats/<int:pk>/", api_show_hat, name="api_show_hat"),
]
