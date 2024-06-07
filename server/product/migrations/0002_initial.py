# Generated by Django 5.0.6 on 2024-06-06 04:11

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('product', '0001_initial'),
        ('user_auth', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='products',
            name='CreatedUser',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user%(class)s_objects', to='user_auth.usermodel'),
        ),
        migrations.AddField(
            model_name='products',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.category'),
        ),
        migrations.AddField(
            model_name='variants',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='variants', to='product.products'),
        ),
        migrations.AddField(
            model_name='subvariants',
            name='variant',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sub_variants', to='product.variants'),
        ),
        migrations.AlterUniqueTogether(
            name='products',
            unique_together={('ProductCode', 'ProductID')},
        ),
    ]
