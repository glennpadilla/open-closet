from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Shoe, BinVO
from common.json import ModelEncoder
import json


class BinVOEncoder(ModelEncoder):
    model = BinVO
    properties = [
        "import_href"
    ]


class ShoeEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "manufacturer",
        "model_name",
        "color",
        "picture_url",
        "id",
        "bin"
    ]
    encoders = {
        "bin": BinVOEncoder(),
    }


@require_http_methods(["DELETE"])
def api_delete_binVO(request, bin_vo_id):
    if request.method == "DELETE":
        try:
            binVO = BinVO.objects.get(import_href=f'/api/bins/{bin_vo_id}/')
            binVO.delete()
            return JsonResponse(binVO, encoder=BinVOEncoder, safe=False)
        except BinVO.DoesNotExist:
            return JsonResponse({"message": "BinVO does not exist"})


@require_http_methods(["GET", "POST"])
def api_shoes(request, bin_vo_id=None):
    if request.method == "GET":
        if bin_vo_id is not None:
            shoes = Shoe.objects.filter(bin=bin_vo_id)
        else:
            shoes = Shoe.objects.all().order_by('bin')
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            bin_href = content["bin"]
            bin = BinVO.objects.get(import_href=bin_href)
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin href"},
                status=400,
            )

        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoeEncoder,
            safe=False,
        )



@require_http_methods(["GET", "DELETE", "PUT"])
def api_shoe(request, pk):
    if request.method == "GET":
        shoe = Shoe.objects.get(id=pk)
        return JsonResponse(
            shoe,
            encoder=ShoeEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Shoe.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    elif request.method == "PUT":
        content = json.loads(request.body)
        try:
            bin_href = content["bin"]
            bin = BinVO.objects.get(import_href=bin_href)
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin_href"},
                status=400,
            )
        Shoe.objects.filter(id=pk).update(**content)
        shoe = Shoe.objects.get(id=pk)
        return JsonResponse(shoe, encoder=ShoeEncoder, safe=False)
