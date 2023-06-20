const { User } = require('../models/userSchema')
const bcrypt = require('bcrypt')
const fastify = require('fastify')()
const bodyParser = require('fastify-formbody');

fastify.register(bodyParser);

exports.userSignUp = async( request, reply) => {
    const { email, password } = request.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      // Create a new user
      const user = new User({ email, password: hashedPassword });
      await user.save();
      console.log(user, "user" )
      reply.code(201).send({ message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      reply.code(500).send({ error: 'Internal server error' });
    }
}