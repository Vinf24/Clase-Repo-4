""" PARA CREAR LAS CLASES """

from django.db import models

# Create your models here.
class Product(models.Model):
    """ CLASE PRODUCTO """
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return str(self.name)

    def is_in_stock(self):
        """ INFORMA SI QUEDA STOCK """
        return self.stock > 0
