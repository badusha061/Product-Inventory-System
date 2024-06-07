from django.contrib import admin
from .models import   Products , SubVariants , Variants
# Register your models here.
admin.site.register(Products)
admin.site.register(SubVariants)
admin.site.register(Variants)

