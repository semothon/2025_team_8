"use client";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
}: PaginationProps) {
  const buttonBaseClass = "mx-1 px-1 py-1 text-sm rounded disabled:opacity-50";

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
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {[...Array(totalPages)].map((_, i) => {
        const page = i + 1;
        return (
          <button
            key={page}
            className={`${buttonBaseClass} ${
              currentPage === page
                ? "text-blue-600 font-semibold"
                : "text-gray-600"
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        );
      })}

      <button
        className={buttonBaseClass}
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
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
