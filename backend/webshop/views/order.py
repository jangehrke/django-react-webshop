from rest_framework.viewsets import ModelViewSet

from webshop.models import Order
from webshop.serializers import OrderSerializer

class OrderView(ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
