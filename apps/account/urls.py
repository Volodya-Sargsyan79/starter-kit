from django.urls import path
from .views import create_user, UserListCreateView, OwnerViewFilter

urlpatterns = [
    path('users/', UserListCreateView.as_view(), name='user-list-create'),
    path('users/add-store-owner/', create_user, name='create_user'),
    path('users/<str:pk>/', OwnerViewFilter.as_view()),
]