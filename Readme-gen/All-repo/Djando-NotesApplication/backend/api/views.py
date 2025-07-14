from django.shortcuts import render
from rest_framework import generics
from django.contrib.auth.models import User
from .serializers import UserSerializer,NoteSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny
from .models import Note


class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(author=self.request.user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(author=self.request.user)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


# Rest Framework
## Django REST Framework is a tool for building APIs in Django. 
## It helps serialize data, handle authentication, manage permissions, validate input, and create routes for your API endpoints.
## It simplifies working with data and provides features like pagination, error handling, and easy testing for APIs.

# Django built-in User
## django.contrib.auth.models.User is Django's built-in user model used for managing authentication, user profiles, and user-related data. 
## You can customize and extend this model as needed for your application.


# 1. UserSerializer:
# - This serializer is used for serializing and deserializing Django's built-in User model.
# - class Meta: specifies which model (User) and fields (id, username, and password) are included.
# - extra_kwargs customizes field behavior:
#     - The password field is marked as write_only, meaning it will not be exposed in the API response, only used for creation or updates.
# - create(validated_data): is a method used to handle the creation of a new user. It uses create_user() method to create the user.

# 2. NoteSerializer:
# - This serializer is used for serializing and deserializing the Note model.
# - class Meta: specifies the Note model and the fields (id, title, content, created_at, and author) to be included in the serialization.
# - extra_kwargs sets author field as read-only, meaning it won’t accept input and will only display in API responses.


# 1. IsAuthenticated:
# -   This permission class allows access only to authenticated users.
# -   If the user is not authenticated (i.e., not logged in), the request is denied.
# -   Used when you want to restrict access to authenticated users only.

# 2. AllowAny:
# -   This permission class allows access to everyone, regardless of authentication.
# -   It essentially disables any form of authentication check, meaning both authenticated and unauthenticated users have full access.
# -   Used when you want to make a view open to all users, without requiring authentication.