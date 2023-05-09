export default function NewsArticleList({ articles }) {
    return (
          <>
            <h1>List of all the News articles</h1>
            {
                articles.map((article) => {
                    return (
                        <div key={article.id}>
                            <h2>{article.id} {article.title} | {article.description} | {article.category}</h2>
                        </div>
                    )
                })
            }
          </>
    )
}

export async function getServerSideProps() {
    const response = await fetch("http://localhost:4000/news")
    const data = await response.json()
    console.log(`Pre-rendering the News articles`);
    return {
        props: {
            articles: data
        }
    }
}