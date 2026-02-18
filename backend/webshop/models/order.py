from django.db import models
from .user import User
from .product import Product
from .cart import Cart


class Order(models.Model):
    class Status(models.TextChoices):
        PLACED = 'PLACED' ,'placed'
        PAID = 'PAID' ,'paid'
        SHIPPED = 'SHIPPED' ,'shipped'
        CANCELED = 'CANCELED' ,'canceled'

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    cart = models.OneToOneField(Cart, on_delete=models.SET_NULL, null=True, blank=True, related_name='order')

    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PLACED)
    shipping_address = models.ForeignKey(User, on_delete=models.PROTECT, null=True, blank=True, related_name='shipping_address')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.PROTECT, blank=False, null=False)

    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)