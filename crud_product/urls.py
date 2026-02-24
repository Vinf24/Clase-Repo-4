from django.urls import path, include
from django.contrib import admin
from product.view.views_frontend import home

urlpatterns = [
    path('', home, name='home'),
    path('admin/', admin.site.urls),
    path('api/', include('product.urls')),
]
