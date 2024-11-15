from django.urls import path
from .views import RegisterView, LoginView, LogoutView, PasswordRecoveryView, PasswordResetConfirmView
from .views import ProfileView 

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('recover-password/', PasswordRecoveryView.as_view(), name='recover_password'),
    path('reset-password/<int:uid>/<str:token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
]
