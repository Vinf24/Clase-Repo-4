from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from product.model.serializers import ProductSerializer
from product.service.product_service import ProductService
from typing import cast, Dict, Any

class ProductListCreateView(APIView):
    def get(self, request):
        products = ProductService.list_products()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = cast(Dict[str, Any], serializer.validated_data)
        product = ProductService.create_product(data)
        return Response(ProductSerializer(product).data, status=status.HTTP_201_CREATED)

class ProductDetailView(APIView):

    def get(self, request, pk):
        product = ProductService.get_product(pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    def put(self, request, pk):
        product = ProductService.get_product(pk)

        serializer = ProductSerializer(product, data=request.data)
        serializer.is_valid(raise_exception=True)

        data = cast(Dict[str, Any], serializer.validated_data)
        updated_product = ProductService.update_product(pk, data)

        return Response(ProductSerializer(updated_product).data)

    def delete(self, request, pk):
        product = ProductService.get_product(pk)

        product.is_active = False
        product.save()

        return Response(status=status.HTTP_204_NO_CONTENT)

    def patch(self, request, pk):
        product = ProductService.get_product(pk)

        serializer = ProductSerializer(
            product,
            data=request.data,
            partial=True
        )

        serializer.is_valid(raise_exception=True)
        data = cast(Dict[str, Any], serializer.validated_data)

        updated_product = ProductService.update_product(pk,data)

        return Response(ProductSerializer(updated_product).data)

class ProductRestoreView(APIView):
    def post(self, request, pk):
        product = ProductService.get_product(pk)
        product.is_active = True
        product.save()
        return Response(ProductSerializer(product).data)

