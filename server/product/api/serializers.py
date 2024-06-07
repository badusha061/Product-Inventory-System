from product.models import Products  , SubVariants , Variants
from rest_framework import serializers
from user_auth.api.serializers import UserSerializer




class SubVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubVariants
        fields = ['id', 'name', 'stock']



class VariantSerializer(serializers.ModelSerializer):
    sub_variants = SubVariantSerializer(many=True, required=False)

    class Meta:
        model = Variants
        fields = ['id', 'name', 'sub_variants']

    def create(self, validated_data):
        sub_variants_data = validated_data.pop('sub_variants', [])
        variant = Variants.objects.create(**validated_data)
        for sub_variant_data in sub_variants_data:
            SubVariants.objects.create(variant=variant, **sub_variant_data)
        return variant


class ProductSerializer(serializers.ModelSerializer):
    variants = VariantSerializer(many=True, required=False)
    CreatedUser = UserSerializer()
    class Meta:
        model = Products
        fields = ['id', 'ProductID', 'ProductCode', 'ProductName', 'ProductImage', 'CreatedUser', 'variants','CreatedDate','Active']

    def create(self, validated_data):
        variants_data = validated_data.pop('variants', [])
        product = Products.objects.create(**validated_data)
        for variant_data in variants_data:
            sub_variants_data = variant_data.pop('sub_variants', [])
            variant = Variants.objects.create(product=product, **variant_data)
            for sub_variant_data in sub_variants_data:
                SubVariants.objects.create(variant=variant, **sub_variant_data)
        return product



class ProductSerializers(serializers.ModelSerializer):
    variants = VariantSerializer(many=True, required=False)
    class Meta:
        model = Products
        fields = ['id', 'ProductID', 'ProductCode', 'ProductName', 'ProductImage', 'CreatedUser', 'variants','CreatedDate','Active']

    def create(self, validated_data):
        variants_data = validated_data.pop('variants', [])
        product = Products.objects.create(**validated_data)
        for variant_data in variants_data:
            sub_variants_data = variant_data.pop('sub_variants', [])
            variant = Variants.objects.create(product=product, **variant_data)
            for sub_variant_data in sub_variants_data:
                SubVariants.objects.create(variant=variant, **sub_variant_data)
        return product