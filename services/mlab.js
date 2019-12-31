const mongoose = require("mongoose");

// DB config
const db = require("../config/keys").keys;

module.exports = async () => {
  try {
    await mongoose.set("useNewUrlParser", true);
    await mongoose.set("useFindAndModify", false);
    await mongoose.set("useCreateIndex", true);
    await mongoose.set("useUnifiedTopology", true);
    await mongoose.connect(db.mongo.url(), db.mongo.options);

    console.log("Mongodb Connected");
  } catch (err) {
    console.error(err);
  }
};
