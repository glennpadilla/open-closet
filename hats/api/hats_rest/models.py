from django.db import models
from django.urls import reverse

# Create your models here.

class LocationVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True) # locationVO id and Location Id may not match
    def __str__(self):
        return self.import_href

class Hat(models.Model):
    fabric = models.CharField(max_length=200, null=True)  # can be another model
    style = models.CharField(max_length=200, null=True)  # can be another model
    color = models.CharField(max_length=200, null=True)  # can be another model
    picture_url = models.URLField(max_length=200, null=True)
    location = models.ForeignKey(
        LocationVO,
        related_name="hats",
        on_delete=models.PROTECT, #prevent deleting hats when LocationVO deleted
    )
    def get_api_url(self):
        return reverse("api_show_hat", kwargs={"pk": self.pk})
