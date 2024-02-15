from django.contrib import admin
from .models import Location, Bin

# Register your models here.

@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ["id", "closet_name", "section_number", "shelf_number"]

@admin.register(Bin)
class BinAdmin(admin.ModelAdmin):
    list_display = ["id", "closet_name", "bin_number", "bin_size"]
