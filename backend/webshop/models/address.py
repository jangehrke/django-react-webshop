from django.db import models
from django.utils import timezone

from .user import User


class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='addresses')
    country = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=5)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    address_extra = models.CharField(max_length=100, blank=True)
    extra_info = models.TextField(blank=True)

    is_default = models.BooleanField(default=False)

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return (f"{self.user.username} "
                f"{self.address} "
                f"{self.address_extra} "
                f"{self.postal_code} "
                f"{self.city} "
                f"{self.state} "
                f"{self.country}"
                )