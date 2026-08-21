import axios from "axios";
import ArticlePage from "../components/ArticlePage";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;
console.log("API BASE:", API_BASE);
async function getNews() {
  const response = await axios.get(`${API_BASE}/news/5`);
  return response.data;
}



export default async function NewsDetailPage() {
  const news = await getNews();

  return (
    <ArticlePage
      id={news.id}
      title={news.title}
      authorName={news.user?.name || "प्रश्न समाचार ब्युरो"}
      publishedAt={news.date}
      heroImageSrc={news.image}
      heroImageAlt={news.title}
      paragraphs={news.content?.split("\n").filter(Boolean)}
      comments={news.comments}
    />
  );
}