import axios from "axios";
import Image from "next/image";
import Link from "next/link";

type News = {
  id: number;
  title: string;
  content: string;
  categoryname: string;
  created: string;
  image: string;
  comments: {
    newsId: number;
    content: string;
  }[] | null;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

async function getCategoryNews(id: string): Promise<News[]> {
  const response = await axios.get(
    `${API_BASE}/news/${id}/byCategory`
  );

  return response.data;
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const news = await getCategoryNews(id);

  if (!news || news.length === 0) {
    return (
      <main className="mx-auto max-w-[1728px] px-6 py-20">
        <h1 className="text-3xl font-bold">
          कुनै समाचार भेटिएन
        </h1>
      </main>
    );
  }

  const categoryName = news[0].categoryname;

  return (
    <main className="mx-auto max-w-[1728px] px-6 py-10">

      {/* Category title */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">
          {categoryName}
        </h1>

        <div className="mt-3 h-[3px] w-16 bg-[var(--primary)]" />
      </div>

      {/* News grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

        {news.map((item) => (
          <Link
            key={item.id}
            href={`/News/${item.id}`}
            className="group"
          >
            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
              />
            </div>

            {/* Category */}
            <p className="mt-4 text-sm font-bold text-[var(--primary)]">
              {item.categoryname}
            </p>

            {/* Title */}
            <h2 className="mt-2 text-xl font-bold leading-snug transition group-hover:text-[var(--primary)]">
              {item.title}
            </h2>

            {/* Date */}
            <p className="mt-2 text-sm text-[var(--on-surface-variant)]">
              {new Date(item.created).toLocaleDateString("ne-NP")}
            </p>
          </Link>
        ))}

      </div>
    </main>
  );
}