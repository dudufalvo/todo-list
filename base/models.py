from django.db import models
from django.db import models
from django.db.models.deletion import CASCADE
from django.utils.translation import gettext_lazy as _

# Create your models here.
class NewUser(models.Model):
    id_token = models.CharField(primary_key=True, max_length=150, unique=True)
    username = models.CharField(max_length=150)
    email = models.EmailField(_('email address'), unique=True)
    image = models.CharField(max_length=150)

    def __str__(self):
        return self.username

class Topic(models.Model):
    user = models.ForeignKey(NewUser, on_delete=CASCADE)
    body = models.TextField(max_length=100)
    created = models.CharField(max_length=100)
    updated = models.CharField(max_length=100)
    level = models.IntegerField(default=1)

    def __str__(self):
        return self.body[0:50]