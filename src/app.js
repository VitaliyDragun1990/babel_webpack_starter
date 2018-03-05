import { http } from './http';
import { ui } from './ui';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add posts
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);

// Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

// Listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit);


// get posts
function getPosts(e) {
    http.get('http://localhost:3000/posts')
        .then(data => ui.showPosts(data))
        .catch(err => console.log(err))
}

// add post
function submitPost(e) {
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    const id = document.querySelector('#id').value;

    // Validate input
    if (title === '' || body === '') {
        ui.showAlert('Please fill in all fields', 'alert alert-danger');
        return;
    }

    const data = {
        title,
        body
    };

    // Check for id
    if (id === '') {
        // Create Post
        http.post('http://localhost:3000/posts', data)
            .then(data => {
                ui.showAlert('Post added', 'alert alert-success');
                ui.clearFields();
                // Get and display all posts including new one
                getPosts();
            })
            .catch(err => console.log(err));

    } else {
        // Update Post
        http.put(`http://localhost:3000/posts/${id}`, data)
            .then(data => {
                ui.showAlert('Post updated', 'alert alert-success');
                ui.changeFormState('add');
                // Get and display all posts including new one
                getPosts();
            })
            .catch(err => console.log(err));
    }

}

// delete post
function deletePost(e) {
    if (e.target.parentElement.classList.contains('delete')) {
        const id = e.target.parentElement.dataset.id;
        if (confirm('Are you sure?')) {
            http.delete(`http://localhost:3000/posts/${id}`)
                .then(data => {
                    ui.showAlert('Post removed', 'alert alert-success');
                    getPosts();
                })
                .catch(err => console.log(err));
        }
    }
    e.preventDefault();
}

// Enable Edit State
function enableEdit(e) {
    if (e.target.parentElement.classList.contains('edit')) {
        const id = e.target.parentElement.dataset.id;
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const body = e.target.parentElement.previousElementSibling.textContent;

        const data = {
            id,
            title,
            body
        };

        // Fill form with current post
        ui.fillForm(data);
    }

    e.preventDefault();
}

// Cancel Edit State
function cancelEdit(e) {
    if (e.target.classList.contains('post-cancel')) {
        ui.changeFormState('add');
    }

    e.preventDefault();
}