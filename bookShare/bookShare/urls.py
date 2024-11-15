from django.contrib import admin
from django.urls import path, include
from . import views  # Import the home view
from django.conf.urls.static import static  # Add this import
from django.conf import settings



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),  # Include user API endpoints
    path('api/books/', include('books.urls')),  # Include the books app API URLs
    path('', views.home, name='home'),  # Add a root URL that renders a home page
]

# Add this line to serve media files during development
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
