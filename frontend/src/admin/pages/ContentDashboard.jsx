import React, { useState, useMemo } from "react";
import {
  Search,
  FileText,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const ContentDashboard = () => {
  // Expanded sample data to demonstrate pagination
  const [posts] = useState([
    {
      id: 1,
      title: "React Mbinu Bora", // "Best Practices" in Swahili
      description: "Jifunze njia bora za kupanga programu za React",
      user: "Juma_Kilonzo",
    },
    {
      id: 2,
      title: "Mwongozo wa TailwindCSS", // "Guide" in Swahili
      description: "Jua kubuni miundo inayobadilika na Tailwind",
      user: "Amina_Suleiman",
    },
    {
      id: 3,
      title: "Mafunzo ya Kusanidi Vite", // "Tutorial" in Swahili
      description: "Anzisha haraka na Vite na React",
      user: "Kwame_Osei",
    },
    {
      id: 4,
      title: "Usimamizi wa Hali", // "State Management" in Swahili
      description: "Kulinganisha Redux dhidi ya Context API",
      user: "Fatima_Njoroge",
    },
    {
      id: 5,
      title: "Vidokezo vya Utendaji", // "Performance Tips" in Swahili
      description: "Boresha programu zako za React",
      user: "Chike_Obi",
    },
    {
      id: 6,
      title: "Uchunguzi wa Hooks", // "Deep Dive" in Swahili
      description: "Kuelewa Hooks za React",
      user: "Zawadi_Mwangi",
    },
    {
      id: 7,
      title: "CSS katika JS", // "in" in Swahili
      description: "Vipengele vya Styled dhidi ya Emotion",
      user: "Kofi_Adu",
    },
    {
      id: 8,
      title: "Kupima React", // "Testing" in Swahili
      description: "Upimaji wa kitengo na Jest",
      user: "Nia_Dlamini",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // Filter posts based on search term
  const filteredPosts = useMemo(() => {
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.user.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [posts, searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage
  );

  // Handle pagination
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-600"
            size={20}
          />
          <input
            type="text"
            placeholder="Search posts by title or author..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on new search
            }}
            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 
            focus:outline-none focus:ring-2 focus:ring-green-500 
            focus:border-transparent transition duration-300 
            text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Posts List */}
      {currentPosts.length > 0 ? (
        <div className="space-y-6">
          {currentPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white border border-gray-100 p-6 rounded-xl 
              shadow-md hover:shadow-xl transition-all duration-300 
              transform hover:-translate-y-1 hover:border-green-100"
            >
              <div className="flex items-center mb-3">
                <FileText className="text-green-600 mr-3" size={24} />
                <h2
                  className="text-xl font-bold text-gray-800 
                transition-colors duration-200 hover:text-green-600"
                >
                  {post.title}
                </h2>
              </div>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {post.description}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span
                    className="text-sm text-green-700 font-medium 
                  bg-green-50 px-2 py-1 rounded-full"
                  >
                    @{post.user}
                  </span>
                </div>
                <Link
                  to={`/admin/contents/${post.id}`}
                  className="inline-flex items-center px-4 py-2 
                  bg-green-500 text-white rounded-md 
                  hover:bg-green-600 transition-colors 
                  focus:outline-none focus:ring-2 focus:ring-green-400 
                  focus:ring-offset-2"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-500 text-lg">
            No posts found matching your search.
          </p>
        </div>
      )}

      {/* Enhanced Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <div
            className="bg-white border border-gray-100 rounded-xl 
          shadow-md flex items-center space-x-2 p-2"
          >
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="p-2 text-green-600 hover:bg-green-50 
              rounded-full disabled:text-gray-300 disabled:hover:bg-transparent 
              transition-all duration-200"
              aria-label="First page"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="p-2 text-green-600 hover:bg-green-50 
              rounded-full disabled:text-gray-300 disabled:hover:bg-transparent 
              transition-all duration-200"
              aria-label="Previous page"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="px-4 text-gray-700 font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="p-2 text-green-600 hover:bg-green-50 
              rounded-full disabled:text-gray-300 disabled:hover:bg-transparent 
              transition-all duration-200"
              aria-label="Next page"
            >
              <ChevronRight size={20} />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-2 text-green-600 hover:bg-green-50 
              rounded-full disabled:text-gray-300 disabled:hover:bg-transparent 
              transition-all duration-200"
              aria-label="Last page"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentDashboard;
