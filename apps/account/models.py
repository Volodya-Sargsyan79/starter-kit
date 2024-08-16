from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db.models.signals import post_save
from django.dispatch import receiver

class User(AbstractUser):
    is_admin = models.BooleanField('Is admin', default=False)
    is_store_owner = models.BooleanField('Is store owner', default=False)

@receiver(post_save, sender=User)
def assign_group_and_permissions(sender, instance, created, **kwargs):
    if created:
        if instance.is_store_owner:
            store_owner_group, created = Group.objects.get_or_create(name='Store Owner')
            try:
                permission = Permission.objects.get(codename='can_add_store')
                store_owner_group.permissions.add(permission)
            except Permission.DoesNotExist:
                pass
            instance.groups.add(store_owner_group)
        if instance.is_admin:
            admin_group, created = Group.objects.get_or_create(name='Admin')
            try:
                permission = Permission.objects.get(codename='can_create_and_manage_store_owner')
                admin_group.permissions.add(permission)
            except Permission.DoesNotExist:
                pass
            instance.groups.add(admin_group)