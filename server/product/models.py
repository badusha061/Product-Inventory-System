import uuid
from django.db import models
from versatileimagefield.fields import VersatileImageField
from django.utils.translation import gettext_lazy as _
from  user_auth.models import UserModel
# Create your models here.


class Products(models.Model):
    id = models.UUIDField(primary_key=True, editable=True,default=uuid.uuid4)
    ProductID = models.BigIntegerField(unique=True)    
    ProductCode = models.CharField(max_length=255, unique=True)
    ProductName = models.CharField(max_length=255)    
    ProductImage = VersatileImageField(upload_to="uploads/", blank=True, null=True)    
    CreatedDate = models.DateTimeField(auto_now_add=True)
    UpdatedDate = models.DateTimeField(blank=True, null=True)
    CreatedUser = models.ForeignKey(UserModel, related_name="user%(class)s_objects", on_delete=models.CASCADE)    
    IsFavourite = models.BooleanField(default=False)
    Active = models.BooleanField(default=True)    
    HSNCode = models.CharField(max_length=255, blank=True, null=True)    
    TotalStock = models.DecimalField(default=0.00, max_digits=20, decimal_places=8, blank=True, null=True)

    class Meta:
        db_table = "products_product"
        verbose_name = _("product")
        verbose_name_plural = _("products")
        unique_together = (("ProductCode", "ProductID"),)
        ordering = ("-CreatedDate", "ProductID")




class Variants(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    VaraintsID = models.CharField(unique=True,null=True , blank=True)
    product = models.ForeignKey(Products, related_name="variants", on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "products_variant"



class SubVariants(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    SubVariantsID = models.BigIntegerField(unique=True,null=True ,blank=True)
    variant = models.ForeignKey(Variants, related_name="sub_variants", on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    stock = models.DecimalField(default=0.00, max_digits=20, decimal_places=8)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        db_table = "products_sub_variant"
