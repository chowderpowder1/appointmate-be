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

// Create new post
router.post('/', (req,res) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title
    }

    if (!newPost.title){
        return res.status(404).json({message: 'Please include a title'})
    }else{
        posts.push(newPost);
    }
    res.status(201).json(posts);
});

// Update post
router.put('/:id', (req,res)=>{
    const id = parseInt(req.params.id);
    const post = posts.find((post)=> post.id === id)

    if(!post){
        return res.status(404).json({message: `No related post is found for ID:${id}`})
    }

    post.title = req.body.title
    res.status(200).json(posts);
}) 

// Delete post
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id)
    
      if(!post){
        return res.status(404).json({message: `No related post is found for ID:${id}`})
    }

    const index = posts.indexOf(id);
    const omit = posts.splice(index, 1);

    res.status(200).json(posts);
})
export default router;