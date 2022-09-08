from rest_framework import serializers
from base import models

class NewUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.NewUser
        fields = '__all__'

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Topic
        fields = '__all__'