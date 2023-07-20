# ToDo
----------
-[x] Move the relevant files to a backend/ folder.

-[x] Upload files to dockerhub.

-[x] runserver, makemigrations and migrate in Dockerfile.

## - Further improvement:

### DEV:

- Stricter terms for the API data.
- Adapt the Dockerfile to run migrations and similar
- Fix the localhost: axios issue.

- Easy one click button from react where I can wipe the database, and another which previews the database tables.

- Admins and subadmins, and customers.

### SECURITY:

- Are these volumes in the backend: really needed ?
 29     volumes:
 30       - ./backendbase:/app/backendbase
 31       - ./betterAirbnb:/app/betterAirbnb

- Ask chatGPT: I meant automated tests, such as a test that uses Django APi to write to the db, delete from the db, and edit.

- Ask chatGPT: to create a githook for files bigger than 40mb or so.

- React test suite.

- Probably write tests in whatever the equivalent of selenium is in JS.

- No network on the `dockerImages/docker-compose.yml`. As this is only for testing and live, we don't need a custom network here.

from django.test import TestCase
from myproject.models import MyModel

class MyModelTestCase(TestCase):
    def test_create_record(self):
        MyModel.objects.create(name="Test Record")
        self.assertEqual(MyModel.objects.count(), 1)

    def test_update_record(self):
        record = MyModel.objects.create(name="Test Record")
        record.name = "Updated Record"
        record.save()
        self.assertEqual(record.name, "Updated Record")

    def test_delete_record(self):
        record = MyModel.objects.create(name="Test Record")
        record.delete()
        self.assertEqual(MyModel.objects.count(), 0)

```

- Write tests so that I can automate the process.


-----------
