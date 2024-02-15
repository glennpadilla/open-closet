from django.db import models
from django.urls import reverse


class BinVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    def __str__(self):
        return self.import_href

class Shoe(models.Model):
    manufacturer = models.CharField(max_length=200)
    model_name = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    picture_url = models.URLField(null=True)
    bin = models.ForeignKey(
        BinVO,
        related_name="shoes",
        on_delete=models.PROTECT
    )
    def get_api_url(self):
        return reverse("api_shoe", kwargs={"pk": self.pk})
