
const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
   const handleClick = (page) => {
      onPageChange(page);
   };

   const renderPageNumbers = () => {
      const pageNumbers = [];
      const maxPageButtons = 10;
      const sidePages = 2;

      if (totalPages <= maxPageButtons) {
         for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
         }
      } else {
         pageNumbers.push(1); // Always show the first page

         if (currentPage > sidePages + 2) {
            pageNumbers.push("...");
         }

         const startPage = Math.max(2, currentPage - sidePages);
         const endPage = Math.min(totalPages - 1, currentPage + sidePages);

         for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
         }

         if (currentPage < totalPages - sidePages - 1) {
            pageNumbers.push("...");
         }

         pageNumbers.push(totalPages);
      }

      return pageNumbers.map((page, index) =>
         page === "..." ? (
            <span key={index} className="px-4 py-2">
               ...
            </span>
         ) : (
            <button
               key={index}
               onClick={() => handleClick(page)}
               className={`px-4 py-2 border border-gray-300 ${currentPage === page ? "primary-bg text-white" : ""
                  }`}
            >
               {page}
            </button>
         )
      );
   };

   return (
      <div className="flex mt-auto items-center flex-wrap  justify-center lg:justify-between px-2">
         <div className="hidden lg:flex items-center gap-2">
            <p>Show items per page :</p>{" "}
            <button className="px-2 py-1 border border-gray-300 bg-gray-100 rounded-l-md">
               10
            </button>
         </div>
         <div className="flex justify-center gap-2 mt-4">
            <button
               disabled={currentPage === 1}
               onClick={() => handleClick(currentPage - 1)}
               className="px-4 py-2 border border-gray-300 rounded-l-md"
            >
               Previous
            </button>
            {renderPageNumbers()}
            <button
               disabled={currentPage === totalPages}
               onClick={() => handleClick(currentPage + 1)}
               className="px-4 py-2 border border-gray-300 rounded-r-md"
            >
               Next
            </button>
         </div>
      </div>
   );
};

export default CustomPagination;
