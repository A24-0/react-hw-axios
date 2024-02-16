interface Post {
    id: number;
    title: string;
    body: string;
}

interface PostListProps {
    posts: Post[];
}

function List({ posts }: PostListProps) {
    return (
        <ul className="list">
            {posts.map((post) => (
                <li key={post.id} className="list-item">
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </li>
            ))}
        </ul>
    );
}

export default List;