const { User } = require("../models/userSchema");
const bcrypt = require("bcrypt");
const fastify = require("fastify")();
const bodyParser = require("fastify-formbody");
const jwt = require("jsonwebtoken");

fastify.register(bodyParser);

exports.userSignUp = async (request, reply) => {
  const { email, password } = request.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Create a new user
    const user = new User({ email, password: hashedPassword });
    await user.save();
    console.log(user, "user");
    reply.code(201).send({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    reply.code(500).send({ error: "Internal server error" });
  }
};

exports.userSignin = async (request, reply) => {
  const { email, password } = request.body;

  // Retrieve user from the data source
  const user = await User.findOne({ email: email });
  console.log("user", user);
  if (!user) {
    reply.status(401).send({ error: "Invalid credentials" });
    return;
  }

  // Compare passwords
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    reply.status(401).send({ error: "Invalid credentials" });
    return;
  }

  // Generate a JWT token
  const token = jwt.sign({ userId: user.id }, "qwertyuiop", {
    expiresIn: "1h",
  });

  // Return the token in the API response
  reply.send({ token, user });
};
