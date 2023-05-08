// whenever this post gets rendered, it will have external data from API call
// => getStaticProps() use
// Not (without data) case
// it's (With data) case

// import { useRouter } from "next/router" // imported to fix build error

export default function Post ({ post }) {
    // imported useRouter above but used useRouter right here
    // const router = useRouter()

    // Fallback UI: absent for "blocking" mode
    // if (router.isFallback) {
    //     return <h1>Loading...</h1>
    // }

    return (
        <>
            <h2>Here's the post you requested:</h2>
            <h4>{post.id} {post.title}</h4>
            <p>{post.body}</p>
        </>
    )
}

// runs at Build
export async function getStaticPaths() {
    // 2 keys (paths, fallback) inside the returned object below

    // use array.map for dynamically return paths below
    const response = await fetch("https://jsonplaceholder.typicode.com/posts")
    const data = await response.json()
    const paths = data.map((post) => {
        return {    // this return => .map() and returns an array of object (1 by 1)
            params: { postId: `${post.id}`}     // `backticks` here serving as "" for stringified number returned by post.id -- strange
        }
    })

    return {        // this return => getStaticPaths()
        paths: [
            {
                params: {postId: '1'},
            },
            {
                params: {postId: '2'},
            },
            {
                params: {postId: '3'},
            },
            {
                params: {postId: '4'},
            },
        ],

        // the value paths is the variable that's an array returned by .map()
        // paths: paths,
        fallback: 'blocking'
    }
}

// runs at Build
export async function getStaticProps(context) {
    
    const { params } = context
    // below fetch() does not fetch all the 3 or 100 posst' data
    // rather, only the one that gets clicked at a time, dynamically
    
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`)
        // cannot hard code 1 at the end of API above
        // Enter - context.params
        const data = await response.json()
        // check if data returned from API
        if(!data.id) {
            console.log(data.id)
            return {
                notFound: true
            }
        }

        console.log(`Generating page for the /posts/${params.postId}`)

        return {
            props: {
                post : data     // only 1 that gets clicked, hence , no .slice()
                }
            }
        }
    catch (error) {
        console.log(error)
    }
    finally {
        console.log("Inside [postId]-finally")   // "finally" runs even when either of the 2xreturns above execute
    }
}