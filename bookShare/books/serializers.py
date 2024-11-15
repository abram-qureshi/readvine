# books/serializers.py

from rest_framework import serializers
from .models import Book

class BookSerializer(serializers.ModelSerializer):
    # Set owner to show a simple field instead of trying to serialize the User object
    owner = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Book
        fields = '__all__'

    def validate_genre(self, value):
        allowed_genres = [
            'Fiction', 'Non-Fiction', 'Fantasy', 'Science Fiction',
            'Biography', 'Mystery', 'Romance', 'Horror', 'Self-Help', 'Historical' , 'Others'
        ]
        if value not in allowed_genres:
            raise serializers.ValidationError("Invalid genre. Please select a valid genre.")
        return value