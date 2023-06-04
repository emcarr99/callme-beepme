const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://lorenagracex:1989@practice.htuojqk.mongodb.net/socialDB"
);

module.exports = mongoose.connection;
const mongoose = require("mongoose");

// connecting mongoose to MongoDB cloud
mongoose.connect(
  "mongodb+srv://lorenagracex:1989@practice.htuojqk.mongodb.net/socialDB"
);


module.exports = mongoose.connection;

