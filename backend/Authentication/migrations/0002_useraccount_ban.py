# Generated by Django 3.0.5 on 2022-04-01 08:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Authentication', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='ban',
            field=models.BooleanField(default=False),
        ),
    ]
