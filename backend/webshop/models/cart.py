from django.utils import timezone
from django.db import models
from .user import User
from .product import Product


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT)

    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.PROTECT, related_name='product')

    quantity = models.PositiveIntegerField(default=1)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)

    #Logic
    def item_total(self):
        return self.quantity * self.unit_price