const { Schema, model } = require("mongoose");

const PostSchema = new Schema(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    heading: { type: String, required: true },
    subject: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: {
      type: String,
      default: null
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }], 
    dislikes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    comments: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        text: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

// Adding an index for ownerId
PostSchema.index({ ownerId: 1 });

const Post = model("Post", PostSchema);

module.exports = Post;
