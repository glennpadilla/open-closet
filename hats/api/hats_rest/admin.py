from django.contrib import admin
from .models import Hat, LocationVO

# Register your models here.

@admin.register(Hat)
class HatAdmin(admin.ModelAdmin):
    list_display = ["id", "fabric", "style", "color", "picture_url", "location"]

@admin.register(LocationVO)
class LocationVOAdmin(admin.ModelAdmin):
    list_display = ["id", "import_href"]
