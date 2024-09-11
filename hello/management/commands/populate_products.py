from django.core.management.base import BaseCommand
from hello.models import Product

class Command(BaseCommand):
    help = 'Populate the database with initial products'

    def handle(self, *args, **kwargs):
        products = [
            {"name": "Product 1", "price": 10.0, "description": "Description for product 1"},
            {"name": "Product 2", "price": 20.0, "description": "Description for product 2"},
            {"name": "Product 3", "price": 30.0, "description": "Description for product 3"},
            {"name": "Product 4", "price": 40.0, "description": "Description for product 4"},
            {"name": "Product 5", "price": 50.0, "description": "Description for product 5"},
        ]

        for product in products:
            Product.objects.create(**product)

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with initial products'))
