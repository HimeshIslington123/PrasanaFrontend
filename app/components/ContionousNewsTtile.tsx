import NewsTitle from "./NewsTitle";

type NewsDetails = {
  id: number;
  title: string;
};

const ContionousNewsTtile = async () => {
  let news: NewsDetails[] = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/News/Breakingnews`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch breaking news");
    }

    news = await res.json();
  } catch (error) {
    console.error("Error fetching news:", error);
  }

  return (
    <div
      className="w-full overflow-hidden"
      style={{
        backgroundColor: "var(--primary)",
        color: "var(--on-primary)",
      }}
    >
      <div className="flex w-max animate-news-ticker">
        <div className="flex shrink-0">
          {news.map((item) => (
            <NewsTitle key={item.id} news={item} />
          ))}
        </div>

        <div className="flex shrink-0">
          {news.map((item) => (
            <NewsTitle key={`copy-${item.id}`} news={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContionousNewsTtile;