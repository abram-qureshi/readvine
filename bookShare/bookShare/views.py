# bookShare/views.py
from django.http import HttpResponse

def home(request):
    return HttpResponse("<h1>Welcome to the Book Exchange Platform!</h1><p>Register, log in, and exchange books with your community!</p>")
