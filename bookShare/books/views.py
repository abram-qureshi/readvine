from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Book
from .serializers import BookSerializer
from django.shortcuts import get_object_or_404
from django.db.models import Q  # Import Q for advanced query filtering
from rest_framework.pagination import PageNumberPagination




@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Ensure only authenticated users can add a book
def add_book(request):
    # Combine data and files into one object to pass to the serializer
    data = request.data.copy()
    data['book_picture'] = request.FILES.get('bookPicture')  # Add book picture from request.FILES if it exists

    # Create the serializer instance
    serializer = BookSerializer(data=data)

    if serializer.is_valid():
        # Assign the owner to the current logged-in user
        serializer.save(owner=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_books(request):
    books = Book.objects.filter(owner=request.user)  # Get books owned by the user
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def book_detail(request, pk):
    try:
        book = get_object_or_404(Book, pk=pk)
    except Book.DoesNotExist:
        return Response({'error': 'Book not found or you do not have permission to access it.'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = BookSerializer(book)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = BookSerializer(book, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def search_books(request):
    query_params = request.query_params

    # Extract search parameters
    title_author_query = query_params.get('title_author', None)
    genre = query_params.get('genre', None)
    availability = query_params.get('availability', None)
    location = query_params.get('location', None)

    # Start with all books
    books = Book.objects.all()

    # Apply filters if provided
    if title_author_query:
        books = books.filter(
            Q(title__icontains=title_author_query) |
            Q(author__icontains=title_author_query)
        )
    if genre:
        books = books.filter(genre__iexact=genre)
    if availability:
        books = books.filter(availability__iexact=availability)
    if location:
        books = books.filter(location__icontains=location)

    # Set a threshold value for the number of books after which we paginate
    BOOK_THRESHOLD = 5

    if books.count() > BOOK_THRESHOLD:
        paginator = PageNumberPagination()
        paginator.page_size = 5  # Number of books per page
        paginated_books = paginator.paginate_queryset(books, request)
        serializer = BookSerializer(paginated_books, many=True)
        return paginator.get_paginated_response(serializer.data)
    else:
        # Return without pagination if the result set is small
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
