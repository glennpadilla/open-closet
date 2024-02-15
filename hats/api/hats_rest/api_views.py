from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Hat, LocationVO
from common.json import ModelEncoder
import json

# Create your views here.

class LocationVODetailEncoder(ModelEncoder):
    model = LocationVO
    properties = ["import_href"]

class HatsListEncoder(ModelEncoder):
    model = Hat
    properties = ["id", "fabric", "style", "color", "picture_url", "location"]
    encoders = {"location": LocationVODetailEncoder()}

class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = ["id", "fabric", "style", "color", "picture_url", "location"]
    encoders = {"location": LocationVODetailEncoder()}


@require_http_methods(["DELETE"])
def api_delete_locationVO(request, location_vo_id):
    if request.method == "DELETE":
        try:
            locationVO = LocationVO.objects.get(import_href=f'/api/locations/{location_vo_id}/')
            locationVO.delete()
            return JsonResponse(locationVO, encoder=LocationVODetailEncoder, safe=False)
        except LocationVO.DoesNotExist:
            return JsonResponse({"message": "LocationVO does not exist"})


@require_http_methods(["GET", "POST"])
def api_list_hats(request, location_vo_id=None):  # pk from path used as location_vo_id
    if request.method == "GET":
        if location_vo_id is not None:          # using path: location/<int:pk>/hats/
            hats = Hat.objects.filter(location=location_vo_id)
        else:
            hats = Hat.objects.all().order_by('location')  #no locationVOid then using path: hats/
        return JsonResponse(
            {"hats":hats},
            encoder=HatsListEncoder,
        )
    else: #POST
        content = json.loads(request.body)
        try:
            location_href = content["location_href"]
            location = LocationVO.objects.get(import_href=location_href)
            del content["location_href"]
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location_href"},
                status=400,
            )
        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )

@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_hat(request, pk):    #pk from path is matched with hat id
    if request.method == "GET":
        hat = Hat.objects.get(id=pk)
        return JsonResponse(hat, encoder=HatDetailEncoder, safe=False)
    elif request.method == "DELETE":
        count, _ = Hat.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count>0})
    elif request.method == "PUT":
        content = json.loads(request.body)
        try:
            location_href = content["location_href"]
            location = LocationVO.objects.get(import_href=location_href)
            del content["location_href"]
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location_href"},
                status=400,
            )
        Hat.objects.filter(id=pk).update(**content)
        hat = Hat.objects.get(id=pk)
        return JsonResponse(hat, encoder=HatDetailEncoder, safe=False)
