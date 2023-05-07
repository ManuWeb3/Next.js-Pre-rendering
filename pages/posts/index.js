// whenever this page gets rendered, it will have external data from API call
// => getStaticProps() use
// Not (without data) case
// it's (With data) case

import Link from "next/link"

export default function PostsList({ posts }) {
    return (
        <>
            <h1>List of Posts:</h1>
            {
                posts.map((post) => {
                    return (
                        <>
                            <div key={post.id}>
                            <Link href={`posts/${post.id}`} passHref legacyBehavior>
                                <p><h4>{post.id} {post.title}</h4></p>
                            </Link>
                            <hr></hr>
                            </div>
                        </>
                    )
                })
            }
        </>
    )
}

export async function getStaticProps() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts")
        const data = await response.json()
        return {
            props: {
                posts : data.slice(0,3)
                }
            }
        }
    catch (error) {
        console.log(error)
    }
    finally {
        console.log("Inside finally")
    }
}
