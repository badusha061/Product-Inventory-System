from django.urls import path 
from .views import *


urlpatterns = [
    path('products/',ProductsListCreate.as_view(), name='list-create-products'),
    path('create/',CreateProduct.as_view(), name='list-create-products'),
    path('products/<uuid:id>/', ProductIndivaul.as_view(), name='product-indivaul'),
    path('purchase/', PurchaseProduct.as_view(), name='purchase-category'),
    path('sales/', RemoveStocksProducts.as_view(), name='remove-category'),
]
