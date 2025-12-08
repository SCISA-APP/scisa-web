// src/pages/management/articles/ArticleCard.tsx

import type { Article } from "../../types/Articles";

interface Props {
  article: Article;
}

export default function ArticleCard({ article }: Props) {
  // Get first 6 words of description
  const truncatedDescription = article.description
    .split(" ")
    .slice(0, 6)
    .join(" ") + (article.description.split(" ").length > 6 ? "..." : "");

  return (
    <div className="border rounded p-4 bg-white shadow">
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-40 object-cover mb-2 rounded"
        />
      )}
      <h2 className="text-lg font-semibold">{article.title}</h2>
      <p className="text-gray-700 mb-2 whitespace-pre-line">
        {truncatedDescription}
      </p>
      <p className="text-sm text-gray-500">Type: {article.type}</p>
    </div>
  );
}
