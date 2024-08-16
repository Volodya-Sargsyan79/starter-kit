from django.db import migrations
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType

def create_permissions(apps, schema_editor):
    User = apps.get_model('account', 'User')  # Replace 'yourappname' with your actual app name
    content_type = ContentType.objects.get_for_model(User)

    Permission.objects.get_or_create(
        codename='can_add_store',
        name='Can add store',
        content_type=content_type,
    )

    Permission.objects.get_or_create(
        codename='can_create_and_manage_store_owner',
        name='Can create and manage store owner',
        content_type=content_type,
    )

class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),  # Update with your initial migration file
    ]

    operations = [
        migrations.RunPython(create_permissions),
    ]