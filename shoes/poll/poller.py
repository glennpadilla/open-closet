import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "shoes_project.settings")
django.setup()


from shoes_rest.models import BinVO


def get_bins():
    response = requests.get("http://wardrobe-api:8000/api/bins/")
    binData = json.loads(response.content)

    # BinVO.objects.all().filter(shoes=None).delete()    code to delete bin VO when bin delete

    for bin in binData["bins"]:
        BinVO.objects.update_or_create(
            import_href=bin["href"],
        )


def poll():
    while True:
        print('Shoes poller polling for data')
        try:
            get_bins()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(5)


if __name__ == "__main__":
    poll()
