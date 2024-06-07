from rest_framework.generics import ListCreateAPIView , RetrieveUpdateDestroyAPIView
from product.models import Products  , SubVariants , Variants
from .serializers import  ProductSerializer , ProductSerializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from .pagination import CustomPaginationSet
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from decimal import Decimal





# @permission_classes(IsAuthenticated)
class ProductsListCreate(ListCreateAPIView):
    serializer_class  = ProductSerializer
    pagination_class = CustomPaginationSet
    queryset = Products.objects.all()



# @permission_classes([IsAuthenticated])
class CreateProduct(ListCreateAPIView):
    serializer_class = ProductSerializers
    queryset = Products.objects.all()



# @permission_classes([IsAuthenticated])
class ProductIndivaul(RetrieveUpdateDestroyAPIView):
    serializer_class = ProductSerializer
    queryset = Products.objects.all()
    lookup_field = 'id'





# @permission_classes([IsAuthenticated])    
class PurchaseProduct(APIView):
    def post(self,request):
        variant_id = request.data.get('variant_id')
        stock_to_add = request.data.get('stock_to_add')
        print(variant_id)
        if variant_id is None:
            message = {
                "Message":"Varaint  Is None"
            }
            return Response(status=status.HTTP_400_BAD_REQUEST ,data=message)
        if stock_to_add is None:
            message = {
                "message":"Stock Is None"
            }
            return Response(status=status.HTTP_400_BAD_REQUEST , data=message)
        try:
            varaint_instance = SubVariants.objects.get(id = variant_id)
        except Exception as  e:
            message = {
                "message":"Does Not found Varaint"
            }
            return Response(status=status.HTTP_400_BAD_REQUEST , data=message)
        decimal_stock = Decimal(stock_to_add)
        varaint_instance.stock += decimal_stock 
        varaint_instance.save()
        message = {
            "message":"Succesfully Added Stocks"
        }
        return Response(status=status.HTTP_200_OK,data=message)
    


# @permission_classes([IsAuthenticated])
class RemoveStocksProducts(APIView):
    def post(self, request):
        variant_id = request.data.get('variant_id')
        remove_stocks = request.data.get('remove_stocks')
        if variant_id is None:
            message = {
                "Message":"Varaint  Is None"
            }
            return Response(status=status.HTTP_400_BAD_REQUEST ,data=message)
        if remove_stocks is None:
            message = {
                "message":"Stock Is None"
            }
            return Response(status=status.HTTP_400_BAD_REQUEST , data=message)
        try:
            print(variant_id)
            print(variant_id)
            print(variant_id)
            print(variant_id)
            varaint_instance = SubVariants.objects.get(id = variant_id)
        except Exception as  e:
            message = {
                "message":"Does Not found Varaint"
            }
            return Response(status=status.HTTP_400_BAD_REQUEST , data=message)
        decimal_stocks = Decimal(remove_stocks)
        varaint_instance.stock -= decimal_stocks 
        varaint_instance.save()
        message = {
            "messge":"Successfully Remove Stocks"
        }
        return Response(status=status.HTTP_200_OK,data=message)