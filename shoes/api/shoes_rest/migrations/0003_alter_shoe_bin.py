# Generated by Django 4.0.3 on 2024-02-03 00:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('shoes_rest', '0002_remove_binvo_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shoe',
            name='bin',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='shoes', to='shoes_rest.binvo'),
        ),
    ]