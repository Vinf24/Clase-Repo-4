from django.urls import path
from .view.product_view import ProductListCreateView, ProductDetailView

urlpatterns = [
    path('products/', ProductListCreateView.as_view(), name='product-list-create'),
    path("products/<int:pk>/", ProductDetailView.as_view()),
]
