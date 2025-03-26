const { Schema, model } = require("mongoose");
const validator = require("validator");

const commentsSchema = new Schema({
  name: {
    type: String,
    required: [true, "This comment should include a name."],
  },
  email: {
    type: String,
    validate: {
      validator: (val) => {
        return validator.isEmail(val);
      },

      message: "You should use a real email.",
    },
  },
  movie_id: {
    type: Schema.Types.ObjectId,
    ref: "movies",
  },
  text: {
    type: String,
  },
  date: {
    type: Date,
    required: [true, "A comment should include a date"],
  },
});

const Comments = model("test", commentsSchema);
module.exports = Comments;
