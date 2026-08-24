"use client";

import { useRouter } from "next/navigation";

type NewsDetails = {
  id: number;
  title: string;
};

type Props = {
  news: NewsDetails;
};

const NewsTitle = ({ news }: Props) => {
  const router = useRouter();

  const handleOnClick = () => {
    router.push(`/News/${news.id}`);
  };

  return (
    <div
      onClick={handleOnClick}
      className="mx-8 cursor-pointer whitespace-nowrap py-2"
    >
      <h2>{news.title}</h2>
    </div>
  );
};

export default NewsTitle;