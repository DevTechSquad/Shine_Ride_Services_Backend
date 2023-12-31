const fastify = require("fastify");
const userHandler = require("../controllers/userController");

module.exports = function (fastify, opts, next) {
  fastify.route({
    method: "POST",
    url: "/api/signup",
    schema: {
      description: "User SignUp",
      summary: "User SignUp",
      tags: ["User"],
      body: {
        type: "object",
        properties: {
          email: { type: "string" },
          password: { type: "string" },
          phone: { type: "string" },
        },
      },
    },
    handler: userHandler.userSignUp,
  });

  fastify.route({
    method: "POST",
    url: "/api/signin",
    schema: {
      description: "User SignIn",
      summary: "User SignIn",
      tags: ["User"],
      body: {
        type: "object",
        properties: {
          email: { type: "string" },
          password: { type: "string" },
        },
      },
    },
    handler: userHandler.userSignin,
  });

  next();
};
