# Generated by Django 4.1.3 on 2023-02-09 04:16

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('saleorder', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='StatusPicking',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='Id')),
                ('name', models.CharField(max_length=25, verbose_name='Nombre')),
                ('description', models.CharField(max_length=255, verbose_name='Descripción')),
            ],
            options={
                'verbose_name': 'Estado despacho',
                'verbose_name_plural': 'Estados despacho',
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='Picking',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='Id')),
                ('last_modification', models.DateTimeField(default=django.utils.timezone.now, verbose_name='Última modificación')),
                ('responsible', models.CharField(max_length=255, verbose_name='Responsable')),
                ('sale_order', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='saleorder.saleorder', verbose_name='Orden de venta')),
                ('status', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='picking.statuspicking', verbose_name='Estado')),
            ],
            options={
                'verbose_name': 'Despacho',
                'verbose_name_plural': 'Despachos',
                'ordering': ['-id'],
            },
        ),
    ]
