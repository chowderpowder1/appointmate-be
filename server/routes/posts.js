import express from 'express';

const router = express.Router();

let posts = [
    { id: 1, title: 'Post one'},
    { id: 2, title: 'Post two'},
    { id: 3, title: 'Post three'}
]

router.get('/', (req, res) => {
    const limit = req.query.limit

    if(!isNaN(limit) && limit > 0){
        return res.status(200).json(posts.slice(0, limit));
    }
    
    res.status(200).json(posts);

})

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => id === post.id)

    if (!post){
        return res
        .status(404)
        .json({msg: `The post with ID: ${id} is not found`})
    } 
    res.status(200).json(post);        

})

export default router;