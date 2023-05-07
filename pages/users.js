import User from "../components/user"

export default function UsersList(props1) {
    const {users} = props1
    // console.log(users)
    // OR directly, function UsersList({ users })
    return (
        <>
            <h1>List of the users: </h1>
            {
                users.map((user) => {
                    return (
                        <div key={user.id}>
                            <User user={user}/>
                        </div>
                    )
                })
            }
        </>
    )
}

export async function getStaticProps() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users")
        const data = await response.json()
        // console.log(data)
        return {
            props: {            // props1 can be param above BUT 'users' prop/key MUST be same as 'users'
                users: data     // key: value-> 'data' fetched from ext. API
            }
        }
    }
    catch (error) {
        console.log(error)
    }    
}