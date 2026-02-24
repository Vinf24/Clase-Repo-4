from product.model.models import Product
from django.shortcuts import get_object_or_404

class ProductService:
    
    @staticmethod
    def create_product(data: dict) -> Product:
        return Product.objects.create(**data)
    
    @staticmethod
    def list_products():
        return Product.objects.filter(is_active=True).order_by("-id")

    @staticmethod
    def get_product(pk: int):
        return get_object_or_404(Product, pk=pk)

    @staticmethod
    def update_product(pk: int, data: dict):
        product = get_object_or_404(Product, pk=pk)

        for key, value in data.items():
            setattr(product, key, value)

        product.save()
        return product

    @staticmethod
    def toggle_active(pk: int):
        product = Product.objects.get(pk=pk)
        product.is_active = not product.is_active
        product.save()
        return product
