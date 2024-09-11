from django.urls import path
from .views import list_products, add_product, product_add_view, product_list_view

urlpatterns = [
    path('api1/products/', list_products, name='list_products'),
    path('api1/products/add/', add_product, name='add_product'),
    path('products/add/', product_add_view, name='product_add_view'),
    path('products/', product_list_view, name='product_add_view'),
]
