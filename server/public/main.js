const output = document.querySelector('#output');
const button = document.querySelector('#getPostsBtn');
const addButton = document.querySelector('#addPostBtn');

async function showPosts() {
    try{
        const res = await fetch('http://localhost:8080/api/posts');
        if (!res.ok){
            throw new Error('Failed to fetch');
        }
        const posts = await res.json();
        output.innerHTML = '';

        posts.forEach((post) => {
            const postEl = document.createElement('div');
            postEl.textContent = post.title;
            output.appendChild(postEl);
        })
    }catch(err){
        console.log('Error fetching posts:', err);
    }
    
}

async function addPost(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const title = formData.get('title');

    try {
        const res = await fetch('http://localhost:8080/api/posts', {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title})
        })

        if (!res.ok){
            throw new Error('Failed to add post');
        }

        const newPost = await res.json();

        const postEl = document.createElement('div');
        postEl.textContent = newPost.title;
        output.appendChild(postEl); 
        showPosts();
    }catch(error){
        console.error('Error adding post');
    }
}

button.addEventListener('click', showPosts);
addButton.addEventListener('click', addPost);