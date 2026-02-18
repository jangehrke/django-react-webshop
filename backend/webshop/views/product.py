from rest_framework import viewsets
from rest_framework.generics import ListAPIView, RetrieveAPIView

from ..models import Product
from ..serializers import ProductSerializer


# Create your views here.

class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


class ProductByCategory(ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        slug = self.kwargs['slug']
        return Product.objects.filter(category__slug=slug)


class SingleProductView(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = "id"
    lookup_url_kwarg = "product_id"