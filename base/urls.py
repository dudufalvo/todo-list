from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from base.api import viewsets

app_name='base'
urlpatterns = [
    path('', viewsets.get_routes),
    path('users/', viewsets.user_list),
    path('users/<str:token>/', viewsets.user),
    path('topics/', viewsets.topic_list),
    path('topics/<int:id>/', viewsets.topic),
    path('topics-filter/<str:token>/', viewsets.topics_filter)
]

urlpatterns = format_suffix_patterns(urlpatterns)