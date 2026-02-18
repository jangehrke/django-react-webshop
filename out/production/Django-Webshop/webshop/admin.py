from django.contrib import admin

from .models.user import User
from .models.product import Product
from .models.address import Address
from .models.order import Order, OrderItem
from .models.cart import Cart, CartItem
from .models.category import Category

# Register your models here.

class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'is_staff', 'is_active', 'date_joined', 'get_addresses')

    def get_addresses(self, obj):
        return ", ".join([str(a.id) for a in obj.addresses.all()])

    get_addresses.short_description = "Addresses"

class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description', 'price')

class AddressAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'address', 'city', 'state', 'postal_code')

class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'status', 'shipping_address', 'created_at', 'updated_at', 'get_items')

    def get_items(self, obj):
        return ", ".join([str(a.id) for a in obj.items.all()])

    get_items.short_description = "Items"

class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'product', 'unit_price', 'quantity')


class CartAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'total_price', 'created_at', 'updated_at', 'get_items')

    def get_items(self, obj):
        return ", ".join([str(a.id) for a in obj.items.all()])

    get_items.short_description = "Items"

class CartItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'cart', 'product', 'unit_price', 'quantity')

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'slug')

admin.site.register(Product, ProductAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Address, AddressAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
admin.site.register(Cart, CartAdmin)
admin.site.register(CartItem, CartItemAdmin)
admin.site.register(Category, CategoryAdmin)
