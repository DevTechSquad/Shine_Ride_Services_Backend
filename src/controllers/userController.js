const { User } = require('../models/userSchema')
const bcrypt = require('bcrypt')

exports.userSignUp = async( request, reply) => {
    const { email, password } = request.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      // Create a new user
      const user = new User({ email, password: hashedPassword });
      await user.save();
      console.log(üser, "user" )
      reply.code(201).send({ message: 'User created successfully' });
    } catch (error) {
      reply.code(500).send({ error: 'Internal server error' });
    }
}