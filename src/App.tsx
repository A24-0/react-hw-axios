import { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './componentss/Form.tsx';
import List from './componentss/List.tsx';
import Table from './componentss/Table.tsx';
import Navigation from './componentss/Navigation.tsx';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

function App() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [postsPerPage] = useState<number>(5);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching:', error);
            }
        };
        fetchPosts();
    }, []);

    const indexOfLastPost: number = currentPage * postsPerPage;
    const indexOfFirstPost: number = indexOfLastPost - postsPerPage;
    const currentPosts: Post[] = posts.slice(indexOfFirstPost, indexOfLastPost);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }; 
    
    const addPost = (post: Post) => {
        setPosts([post, ...posts]);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <Form onAddPost={addPost} />
                    <h2>Posts</h2>
                    <List posts={currentPosts} />
                    <Navigation
                        currentPage={currentPage}
                        totalPages={Math.ceil(posts.length / postsPerPage)}
                        onPageChange={handlePageChange}
                    />
                </div>
                <div className="col">
                    <h2>Table</h2>
                    <Table posts={posts} />
                </div>
            </div>
        </div>
    );
}

export default App;