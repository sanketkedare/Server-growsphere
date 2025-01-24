const Post = require("../Model/post");

const getAllPosts = async (req, res) => {
  try {
    const data = await Post.find();
    res.status(200).json({ data: data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const createPost = async (req, res) => {
  const newPost = req.body;
  try {
    const createdPost = await Post.create(newPost);
    res
      .status(201)
      .json({ data: createdPost, message: "Created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res
      .status(200)
      .json({ data: updatedPost, message: "Updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res
      .status(200)
      .json({ data: deletedPost, message: "Deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = { getAllPosts, createPost, updatePost, deletePost };
