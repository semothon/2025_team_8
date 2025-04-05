"use client";
import Link from "next/link";

interface PostItemProps {
  id: string;
  title: string;
  author: string;
  date: string;
  views: number;
}

export default function PostItem({ id, title, author, date, views }: PostItemProps) {
  return (
    <Link
      href={`/club/${id}/notice/${id}`}
      className="grid grid-cols-[2fr_1fr_1fr_1fr] p-2 text-sm items-center hover:bg-gray-100 transition cursor-pointer"
    >
      <div className="truncate w-full">{title}</div>
      <div className="text-center">{author}</div>
      <div className="text-center">{date}</div>
      <div className="text-right">{views.toLocaleString()}</div>
    </Link>
  );
}
