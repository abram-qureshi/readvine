# books/urls.py

from django.urls import path
from . import views
from .views import search_books


urlpatterns = [
    path('add/', views.add_book, name='add_book'),
    path('userbooks/', views.user_books, name='user_books'),  # New endpoint for user's books
    path('<int:pk>/', views.book_detail, name='book_detail'),  # New detail endpoint
    path('searchBooks/', search_books, name='search_books'),
]
