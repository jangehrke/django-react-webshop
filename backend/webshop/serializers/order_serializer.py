from django.db import transaction
from rest_framework import serializers
from webshop.models import Order, OrderItem, Cart
from webshop.models.order import ShippingAddress
from webshop.serializers import ProductSerializer


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = '__all__'


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        exclude = ["order"]


class OrderSerializer(serializers.ModelSerializer):
    shipping_address = ShippingAddressSerializer()
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            'id',
            'email',
            'status',
            'shipping_address',
            'items',
            'created_at',
        ]
        read_only_fields = [
            'status',
            'created_at',
        ]

    def create(self, validated_data):
        request = self.context['request']
        user = request.user if request.user.is_authenticated else None

        shipping_data = validated_data.pop('shipping_address')
        cart_items = request.data.get('cart')

        with transaction.atomic():
            if user is not None:
                cart = Cart.objects.get(user=user)
                if not cart.items.exists():
                    raise serializers.ValidationError("Cart is Empty")
            else:
                if cart_items is None:
                    raise serializers.ValidationError("Cart is Empty")

            order = Order.objects.create(
                user=user,
                email=validated_data['email']
            )

            ShippingAddress.objects.create(
                order=order,
                **shipping_data
            )

            if user is not None:
                for cart_item in cart.items.all():
                    OrderItem.objects.create(
                        order=order,
                        product=cart_item.product,
                        quantity=cart_item.quantity,
                        unit_price=cart_item.unit_price,
                    )

                deleted_count, _ = cart.items.all().delete()
                print(f"Deleted {deleted_count} cart items")
                cart.total_price = 0
                cart.save()
            else:
                for cart_item in cart_items:
                    product_id = cart_item.get('product', {}).get('id')
                    OrderItem.objects.create(
                        order=order,
                        product_id=product_id,
                        quantity=cart_item['quantity'],
                        unit_price=cart_item['unit_price'],
                    )

        return order
