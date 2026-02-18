from rest_framework import viewsets

from ..models import Category
from ..serializers import CategorySerializer


# Create your views here.

class CategoryView(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
