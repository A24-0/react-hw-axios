interface Post {
    id: number;
    title: string;
    body: string;
}

interface PostTableProps {
    posts: Post[];
}

function Table({ posts }: PostTableProps) {
    return (
        <table className="table">
            <thead>
            <tr>
                <th>Title</th>
                <th>Body</th>
            </tr>
            </thead>
            <tbody>
            {posts.map((post) => (
                <tr key={post.id}>
                    <td>{post.title}</td>
                    <td>{post.body}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default Table;