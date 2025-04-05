"use client";

import { currentPageAtom } from "@front/state/PaginationAtom";
import { useAtom } from "jotai";

const totalPages = 10;

export default function Pagination() {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

  const buttonBaseClass =
    "mx-1 px-1 py-1 text-sm rounded disabled:opacity-50";

  return (
    <div className="flex justify-center my-4">
      <button
        className={buttonBaseClass}
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
      >
        &lt;&lt;
      </button>

      <button
        className={buttonBaseClass}
        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          className={`${buttonBaseClass} ${
            currentPage === i + 1
              ? "text-blue-600 font-semibold"
              : "text-gray-600"
          }`}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}

      <button
        className={buttonBaseClass}
        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>

      <button
        className={buttonBaseClass}
        onClick={() => setCurrentPage(totalPages)}
        disabled={currentPage === totalPages}
      >
        &gt;&gt;
      </button>
    </div>
  );
}
