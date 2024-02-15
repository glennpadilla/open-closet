import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hats_project.settings")
django.setup()

# Import models from hats_rest, here.
# from hats_rest.models import Something
from hats_rest.models import LocationVO

def poll():
    while True:
        print('Hats poller polling for data')
        try:
            # Write your polling logic, here

            response = requests.get("http://wardrobe-api:8000/api/locations/")
            locationsData = json.loads(response.content)

            # LocationVO.objects.all().filter(hats=None).delete()    code to delete location VO when location delete

            for location in locationsData["locations"]:
                LocationVO.objects.update_or_create(
                    import_href=location["href"],    #so far only one attribute LocationVO href
                )
            # for locationVO in locationVOList:
            #     if locationVO.__str__() not in hrefList:
            #         # locVO = LocationVO.objects.get(import_href=locationVO.__str__())
            #         del locationVO
                # for index, location in enumerate(locationsData["locations"]):
                #     if locationVO["import_href"] == location["href"]:
                #         break
                #     if index == len(locationsData["locations"])-1:
                #         del locationVO
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(5)


if __name__ == "__main__":
    poll()
