# Generated by Django 4.0.3 on 2024-01-30 21:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hats_rest', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='hat',
            name='company_name',
        ),
        migrations.AddField(
            model_name='hat',
            name='color',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='hat',
            name='fabric',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='hat',
            name='picture_url',
            field=models.URLField(null=True),
        ),
        migrations.AlterField(
            model_name='hat',
            name='style',
            field=models.CharField(max_length=200, null=True),
        ),
    ]
