const pluginPermissions = {
  // Roles
  accessRoles: [
    { action: 'plugins::users_permissions.roles.create', subject: null },
    { action: 'plugins::users_permissions.roles.read', subject: null },
  ],
  createRole: [{ action: 'plugins::users_permissions.roles.create', subject: null }],
  deleteRole: [{ action: 'plugins::users_permissions.roles.delete', subject: null }],
  readRoles: [{ action: 'plugins::users_permissions.roles.read', subject: null }],
  updateRole: [{ action: 'plugins::users_permissions.roles.update', subject: null }],

  // AdvancedSettings
  readAdvancedSettings: [
    { action: 'plugins::users_permissions.advanced-settings.read', subject: null },
  ],
  updateAdvancedSettings: [
    { action: 'plugins::users_permissions.advanced-settings.update', subject: null },
  ],

  // Emails
  readEmailTemplates: [
    { action: 'plugins::users_permissions.email-templates.read', subject: null },
  ],
  updateEmailTemplates: [
    { action: 'plugins::users_permissions.email-templates.update', subject: null },
  ],

  // Providers
  readProviders: [{ action: 'plugins::users_permissions.providers.read', subject: null }],
  updateProviders: [{ action: 'plugins::users_permissions.providers.update', subject: null }],
};

export default pluginPermissions;
