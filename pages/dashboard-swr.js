import useSwr  from 'swr'

const fetcher = async function () {
    const response =await fetch('http://localhost:4000/dashboard')
    const data = await response.json()
    return data
}

// no useState() and useEffect()
export default function DashboardSWR() {
    const { data, error } = useSwr('dashboard', fetcher)
    // no more setting(data) using useState
    // use directly in returning the Component below

    // default-styled (plain text) rendering of the returned strings, in case
    if (error) return 'An error occured'
    if(!data) return 'Loading...'
    // 'loading' at initial stage which is otherwise accomplished by useState()

    // if all is well, then render data on the Component
    return (
        <>
            <div>
                <h1>Dashboard:</h1>
                <h3>Posts: {data.posts}</h3>
                <h3>Likes: {data.likes}</h3>
                <h3>Followers: {data.followers}</h3>
                <h3>Following: {data.following}</h3>
            </div>
        </>
    )
}