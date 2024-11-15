# books/models.py

from django.db import models
from django.utils import timezone
from django.conf import settings  # Import settings to use AUTH_USER_MODEL

class Book(models.Model):
    GENRE_CHOICES = [
        ('Fiction', 'Fiction'),
        ('Non-Fiction', 'Non-Fiction'),
        ('Fantasy', 'Fantasy'),
        ('Science Fiction', 'Science Fiction'),
        ('Biography', 'Biography'),
        ('Mystery', 'Mystery'),
        ('Romance', 'Romance'),
        ('Horror', 'Horror'),
        ('Self-Help', 'Self-Help'),
        ('Historical', 'Historical'),
        ('Others', 'Others'),
    ]

    CONDITION_CHOICES = [
        ('New', 'New'),
        ('Good', 'Good'),
        ('Acceptable', 'Acceptable'),
        ('Worn', 'Worn'),
    ]

    AVAILABILITY_CHOICES = [
        ('Exchange', 'Exchange'),
        ('Lend', 'Lend'),
    ]

    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    genre = models.CharField(max_length=50, choices=GENRE_CHOICES)
    condition = models.CharField(max_length=50, choices=CONDITION_CHOICES)
    availability = models.CharField(max_length=50, choices=AVAILABILITY_CHOICES)
    description = models.TextField(blank=True, null=True)
    book_picture = models.ImageField(upload_to='book_pictures/')
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='books')
    date_added = models.DateTimeField(auto_now_add=True)
    location = models.CharField(max_length=255, blank=True, null=True)  # New field to specify location

    def __str__(self):
        return self.title