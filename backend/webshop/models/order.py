from django.db import models
from .user import User
from .product import Product


class Order(models.Model):
    class Status(models.TextChoices):
        PLACED = 'PLACED' ,'placed'
        PAID = 'PAID' ,'paid'
        SHIPPED = 'SHIPPED' ,'shipped'
        CANCELED = 'CANCELED' ,'canceled'

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    email = models.EmailField()
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PLACED)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.PROTECT, blank=False, null=False)

    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)


class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name='shipping_address')
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    address_extra = models.CharField(max_length=100, blank=True)