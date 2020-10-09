'use strict';

module.exports = {
  actions: [
    {
      // Roles
      section: 'plugins',
      displayName: 'Create',
      uid: 'roles.create',
      subCategory: 'roles',
      pluginName: 'users_permissions',
    },
    {
      section: 'plugins',
      displayName: 'Read',
      uid: 'roles.read',
      subCategory: 'roles',
      pluginName: 'users_permissions',
    },
    {
      section: 'plugins',
      displayName: 'Update',
      uid: 'roles.update',
      subCategory: 'roles',
      pluginName: 'users_permissions',
    },
    {
      section: 'plugins',
      displayName: 'Delete',
      uid: 'roles.delete',
      subCategory: 'roles',
      pluginName: 'users_permissions',
    },
    {
      // providers
      section: 'plugins',
      displayName: 'Read',
      uid: 'providers.read',
      subCategory: 'providers',
      pluginName: 'users_permissions',
    },
    {
      section: 'plugins',
      displayName: 'Edit',
      uid: 'providers.update',
      subCategory: 'providers',
      pluginName: 'users_permissions',
    },
    {
      // emailTemplates
      section: 'plugins',
      displayName: 'Read',
      uid: 'email-templates.read',
      subCategory: 'emailTemplates',
      pluginName: 'users_permissions',
    },
    {
      section: 'plugins',
      displayName: 'Edit',
      uid: 'email-templates.update',
      subCategory: 'emailTemplates',
      pluginName: 'users_permissions',
    },
    {
      // advancedSettings
      section: 'plugins',
      displayName: 'Read',
      uid: 'advanced-settings.read',
      subCategory: 'advancedSettings',
      pluginName: 'users_permissions',
    },
    {
      section: 'plugins',
      displayName: 'Edit',
      uid: 'advanced-settings.update',
      subCategory: 'advancedSettings',
      pluginName: 'users_permissions',
    },
  ],
};
