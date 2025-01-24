
const express = require('express');
const cors = require('cors');
const { getAllPosts, createPost, updatePost, deletePost } = require('../Controller/postController');
const postRouter = express.Router();

postRouter.use(express.json());

const allowedOrigins = ['https://growsphere.onrender.com', 'http://localhost:5173'];


postRouter.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));


postRouter.get('/', getAllPosts);
postRouter.post('/', createPost);
postRouter.put('/:id', updatePost);
postRouter.delete('/:id', deletePost);


module.exports = postRouter;