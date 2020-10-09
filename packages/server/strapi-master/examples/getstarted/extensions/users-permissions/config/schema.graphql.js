module.exports = {
  query: `
    userCustomRoute: String
  `,
  resolver: {
    Mutation: {
      updateUser: {
        description: 'Updates a user',
        policies: ['customPolicy'],
      },
    },
    Query: {
      userCustomRoute: {
        resolver: 'plugins::users_permissions.userspermissions.customRoute',
      },
    },
  },
};
