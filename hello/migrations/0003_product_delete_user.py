# Generated by Django 5.0.3 on 2024-08-19 09:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hello', '0002_user_delete_khachhang'),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('description', models.TextField()),
            ],
        ),
        migrations.DeleteModel(
            name='User',
        ),
    ]
