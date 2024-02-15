from django.contrib import admin
from .models import Shoe, BinVO


@admin.register(Shoe)
class ShoeAdmin(admin.ModelAdmin):
    list_display = ["id", "manufacturer", "model_name", "color", "picture_url", "bin"]


@admin.register(BinVO)
class BinVOAdmin(admin.ModelAdmin):
    list_display = ["id", "import_href"]
