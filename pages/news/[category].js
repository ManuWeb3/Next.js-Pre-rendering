export default function NewsArticleByCategory ({ articles, category}) {
    return (
        <>
            <h1>Here's the news for the category <i>{category}</i> you requested:</h1>
            {   // JS part starts here due to .map()
                articles.map((article) => {
                    return (
                        <div key={article.id}>
                            <h2>{article.id} {article.title} </h2>        
                            <p>{article.description}</p>
                            <hr></hr>
                        </div>
                    )
                })
            }
        </>
    )
}

export async function getServerSideProps(context) {
    console.log("Entered getSSP");
    // getSSP() gets context.params.category for dynamic params in SSR
    const {params} = context
    const {category} = params
    
    const response = await fetch(`http://localhost:4000/news?category=${category}`)
    const data = await response.json()

    return {
        props: {
            articles: data,
            category: category  // category, only also works as per ES6
        },
    }
}