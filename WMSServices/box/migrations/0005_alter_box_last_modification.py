# Generated by Django 4.1.3 on 2022-11-19 03:25

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('box', '0004_alter_box_options_alter_boxitem_options_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='box',
            name='last_modification',
            field=models.DateTimeField(default=django.utils.timezone.now, verbose_name='Última modificación'),
        ),
    ]