import express from 'express';
import { 
    getPosts, 
    getPost,
    newPost,
    updatePost,
    deletePost
} from '../controllers/postControllers.js'
const router = express.Router();

// Get posts
router.get('/', getPosts)

// Get single post
router.get('/:id', getPost)

// Create new post
router.post('/', newPost);

// Update post
router.put('/:id', updatePost) 

// Delete post
router.delete('/:id', deletePost)

export default router;