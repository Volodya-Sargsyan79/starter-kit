# accounts/views.py
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import Group


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_user(request):
    print('User:', request.user)
    print('Request data:', request.data)

    user = request.user

    if not user.is_superuser and not user.is_staff:
        print('Permission denied')
        return Response({"detail": "You do not have permission to perform this action."}, status=status.HTTP_403_FORBIDDEN)

    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        new_user = serializer.save()
        print('User created:', new_user)

        if user.is_superuser or user.is_staff:
            if 'is_admin' in request.data and request.data['is_admin']:
                admin_group, created = Group.objects.get_or_create(name='Admin')
                new_user.groups.add(admin_group)
                print('Admin group added')

            if 'is_store_owner' in request.data and request.data['is_store_owner']:
                store_owner_group, created = Group.objects.get_or_create(name='Store Owner')
                new_user.groups.add(store_owner_group)
                print('Store Owner group added')

        elif 'is_store_owner' in request.data and request.data['is_store_owner']:
            store_owner_group, created = Group.objects.get_or_create(name='Store Owner')
            new_user.groups.add(store_owner_group)
            print('Store Owner group added for non-admin/staff user')
        else:
            print('Permission denied for creating this type of user')
            return Response({"detail": "You do not have permission to create this type of user."}, status=status.HTTP_403_FORBIDDEN)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    print('Serializer errors:', serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

class OwnerViewFilter(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        owner = get_object_or_404(User, username=pk)
        serializer = UserSerializer(owner)
        return Response(serializer.data)