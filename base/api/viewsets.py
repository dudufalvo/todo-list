from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.api.serializers import NewUserSerializer, TopicSerializer
from base.models import NewUser, Topic
from google.oauth2 import id_token
from google.auth.transport import requests

CLIENT_ID = "653126086705-5udde9tgngcjsceutqr0fi3ejm6i48fs.apps.googleusercontent.com"

@api_view(['GET'])
def get_routes(request, format=None):
    '''view that returns all the routes of the api'''
    routes = [
        'users: http://127.0.0.1:8000/api/users/',
        'topics: http://127.0.0.1:8000/api/topics/'
    ]
    return Response(routes)


# users
@api_view(['GET', 'POST'])
def user_list(request, format=None):
    ''' view that gives us the possibility of get a 
        list of all users and/or add new ones'''

    if request.method == 'GET':
        # get all the users on the data base and serialize the data to return it
        users = NewUser.objects.all()
        serializer = NewUserSerializer(users, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        # create a new user and serialize it
        serializer = NewUserSerializer(data=request.data)

        # verifies if the serialized data is valid and, if yes, save it
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def user(request, token, format=None):
    ''' view that manipulates a specific user, selected by it's id,
        in a way that is possible to get it's data, update or delete it'''

    # verifies if the user exists through it's id and return a 404 ERROR if not
    try:
        user = NewUser.objects.get(id_token=token)
    except NewUser.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        # serialize the user and returns it's data
        serializer = NewUserSerializer(user)
        return Response(serializer.data)

    elif request.method == 'PUT':
        # updates the data of an existing user and verifies if it still valid
        serializer = NewUserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        # delete the user and returns a no content error
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# topics
@api_view(['GET', 'POST'])
def topic_list(request, format=None):
    ''' view that gives us the possibility of get a 
        list of all topics and/or add new ones'''

    if request.method == 'GET':
        # get all the topics on the data base and serialize the data to return it
        topics = Topic.objects.all()
        serializer = TopicSerializer(topics, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        # validate the header Authorization and if it's not valid throw an error
        if 'Authorization' not in request.headers:
            return Response(status=status.HTTP_401_UNAUTHORIZED, data={'message': 'No Authorization token given in Headers!'})
        
        # get the token from the header Authorization
        token = request.headers['Authorization']
        
        # verify if the token is valid and if it's not valid throw an error
        try:
            # verify the token inside google
            idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
            userid = idinfo['sub']
            
            # verify if there is a user
            if userid:
                # set the data's user as the one verified
                request.data['user'] = userid

                # create a new question and serialize it with the object request.data
                serializer = TopicSerializer(data=request.data)

        except ValueError:
            return Response(status=status.HTTP_401_UNAUTHORIZED, data={'message': 'Invalid Authorization token given in Headers!'})

        # verifies if the serialized data is valid and, if yes, save it
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def topic(request, id, format=None):
    ''' view that manipulates a specific topic, selected by it's id,
        in a way that is possible to get it's data, update or delete it'''

    # verifies if the topic exists through it's id and return a 404 ERROR if not
    try:
        topic = Topic.objects.get(id=id)
    except Topic.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        # serialize the topic and returns it's data
        serializer = TopicSerializer(topic)
        return Response(serializer.data)

    elif request.method == 'PUT':
        # updates the data of an existing topic and verifies if it still valid
        serializer = TopicSerializer(topic, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        # delete the topic and returns a no content error
        topic.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def topics_filter(request, token, format=None):
    ''' view that, passed a user token, filters all the topics 
    that and returns a array of topics created by this user'''

    if request.method == 'GET':
        # get all the topics on the data base and serialize the data to return it
        topics = Topic.objects.filter(user=token)
        serializer = TopicSerializer(topics, many=True)
        return Response(serializer.data)