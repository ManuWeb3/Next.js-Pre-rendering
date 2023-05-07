import Link from "next/link"

export default function Home() {
  return (
    <>
      <h1>Next JS Pre-Rendering</h1>
      <Link href="/users" legacyBehavior>
        <a>Users Page</a>
      </Link>

      <br></br>
      <br></br>

      <Link href="/posts" legacyBehavior>
        <a>Posts Page</a>
      </Link>
    </>
  )
}
