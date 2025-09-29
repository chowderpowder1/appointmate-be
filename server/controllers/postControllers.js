// @desc Get all posts
// @route GET /api/posts
//
let posts = [
    { id: 1, title: 'Post one'},
    { id: 2, title: 'Post two'},
    { id: 3, title: 'Post three'}
]

export const getPosts = (req, res, next) => {
    const limit = req.query.limit

    if(!isNaN(limit) && limit > 0){
        return res.status(200).json(posts.slice(0, limit));
    }
    
    res.status(200).json(posts);

}

// @desc Get single post
// @route /api/posts/:id
//
export const getPost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id )

    if (!post){
        let error = new Error(`The post with ID: ${id} is not found`);
        error.status = 404;
        return next(error);
    } 
    res.status(200).json(post);
}

// @desc Create new post
// @route /api/posts/:id
//
export const newPost = (req, res, next) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title
    }

    if (!newPost.title){
        let error = new Error(`Please include a title`);
        error.status = 404;
        return next(error);
    }else{
        posts.push(newPost);
    }
    res.status(200).json(posts);
}

// @desc Update post
// @route /api/posts/:id
//
export const updatePost = (req, res, next)=>{
    const id = parseInt(req.params.id);
    const post = posts.find((post)=> post.id === id)

    if(!post){
        return res.status(404).json({message: `No related post is found for ID:${id}`})
    }

    post.title = req.body.title
    res.status(200).json(posts);
}

// @desc delete post
// @route /api/posts/:id
//
export const deletePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id)
    
      if(!post){
        return res.status(404).json({message: `No related post is found for ID:${id}`})
    }

    posts = posts.filter((post)=> post.id !==id)
    // const index = posts.indexOf(id);
    // const omit = posts.splice(index, 1);

    res.status(200).json(posts);
}
