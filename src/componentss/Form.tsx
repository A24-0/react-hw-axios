import React, { useState } from 'react';
import axios from 'axios';

interface PostFormProps {
    onAddPost: (post: Post) => void;
}

interface Post {
    id: number;
    title: string;
    body: string;
}

function Form({ onAddPost }: PostFormProps) {
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !body.trim()) return;

        try {
            const response = await axios.post<Post>('https://jsonplaceholder.typicode.com/posts', { title, body });
            const newPost = response.data;
            onAddPost(newPost);
            setTitle('');
            setBody('');
        } catch (error) {
            console.error('Error adding:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="qwe">
                <label htmlFor="title" className="label">Title</label>
                <input
                    type="text"
                    className="control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="qwe">
                <label htmlFor="body" className="label">Body</label>
                <textarea
                    className="control"
                    id="body"
                    rows={3}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Add</button>
        </form>
    );
}

export default Form;