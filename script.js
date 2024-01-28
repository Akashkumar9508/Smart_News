const newsContainer = document.getElementById("newsContainer");
const apiKey = "6d4aa0b833b9404a8009d4e602209837"; // Replace with your actual API key
const topics = "technology";
const url = `https://newsapi.org/v2/top-headlines?domains=wsj.com&country=in&category=${topics}&apiKey=${apiKey}`;

async function getNews(url) {
    try {
        const getResponse = await fetch(url);
        const data = await getResponse.json();

        if (data.articles && data.articles.length > 0) {
            // Loop through each article, up to a maximum of 8
            for (let i = 0; i < Math.min(8, data.articles.length); i++) {
                const article = data.articles[i];

                // Update existing elements with the news information
                const titleElement = document.getElementById(`title${i + 1}`);
                const imageElement = document.getElementById(`image${i + 1}`);
                const descElement = document.getElementById(`desc${i + 1}`);
                const readMoreElement = document.getElementById(`readMore${i + 1}`);

                if (titleElement && imageElement && descElement && readMoreElement) {
                    titleElement.innerText = article.title;
                    imageElement.src = article.urlToImage;
                    descElement.innerText = article.description;
                    readMoreElement.href = article.url;
                }
            }
        } else {
            console.error("No articles found in the response");
        }
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

getNews(url);
