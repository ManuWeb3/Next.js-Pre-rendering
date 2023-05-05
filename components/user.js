export default function User(user1) {
    const { user } = user1
    // OR directly, function User({ user })
    return (
        <>
            <p>{user.name}</p>
            <p>{user.email}</p>
        </>
    )
}