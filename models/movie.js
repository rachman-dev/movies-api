const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    describtion: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          comment: String,
          rate: Number,
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

ModelSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

const Movie = mongoose.model("Movie", ModelSchema);

module.exports = Movie;
