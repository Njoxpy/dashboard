import React, { useState } from "react";
import { Edit, Trash, ArrowLeft, Loader2, X } from "lucide-react";
import { useParams, useNavigate, Link } from "react-router-dom";

// Simulated blog post data (would typically come from an API)
const blogPosts = {
  1: {
    id: "1",
    title: "Introduction to React Hooks",
    content: `React Hooks revolutionized the way we write React components by allowing us to use state and other React features without writing a class component. 

Introduced in React 16.8, Hooks provide a more direct API to the React concepts you already know: props, state, context, refs, and lifecycle. 

The most commonly used Hooks include:
- useState: For adding state to functional components
- useEffect: For performing side effects in components
- useContext: For consuming context in a more straightforward way
- useReducer: For more complex state management

By using Hooks, developers can write more concise and readable code, reducing the complexity of component logic.`,
    author: "Jane Doe",
    publishedDate: "2024-03-05",
  },
};

const ContentDashboardDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedPost, setEditedPost] = useState(null);

  // Simulate data fetching
  const post = blogPosts[id];

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    // In a real app, this would be an API call to delete the post
    delete blogPosts[id];
    navigate("/posts");
  };

  // Handle edit functionality
  const handleEdit = () => {
    // Initialize edit modal with current post data
    setEditedPost({
      title: post.title,
      content: post.content,
      author: post.author,
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = () => {
    // In a real app, this would be an API call to update the post
    blogPosts[id] = {
      ...blogPosts[id],
      ...editedPost,
    };
    setShowEditModal(false);
  };

  // If post not found, show 404
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Post Not Found</h1>
        <p className="mt-4">
          The blog post you are looking for does not exist.
        </p>
        <Link
          to="/admin/contents/"
          className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Back to Posts
        </Link>
      </div>
    );
  }

  // Loading state (simulated)
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-green-500" size={48} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/posts")}
          className="flex items-center text-green-600 hover:text-green-800 mb-4"
        >
          <ArrowLeft className="mr-2" /> Back to Posts
        </button>
      </div>

      {/* Post Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="flex justify-between items-center text-gray-600">
          <div>
            <span className="font-medium">By {post.author}</span>
            <span className="ml-4">Published on {post.publishedDate}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleEdit}
              className="text-green-600 hover:text-green-800 hover:bg-green-100 p-2 rounded-full transition-colors"
            >
              <Edit size={20} />
            </button>
            <button
              onClick={handleDeleteConfirm}
              className="text-red-600 hover:text-red-800 hover:bg-red-100 p-2 rounded-full transition-colors"
            >
              <Trash size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <article className="prose prose-green max-w-none">
        {post.content.split("\n\n").map((paragraph, index) => (
          <p key={index} className="mb-4 text-gray-800">
            {paragraph}
          </p>
        ))}
      </article>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Confirm Deletion</h2>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <p className="mb-6">
              Are you sure you want to delete this post? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Post</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEditSubmit();
              }}
            >
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={editedPost.title}
                  onChange={(e) =>
                    setEditedPost((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="content"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  value={editedPost.content}
                  onChange={(e) =>
                    setEditedPost((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="author"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  value={editedPost.author}
                  onChange={(e) =>
                    setEditedPost((prev) => ({
                      ...prev,
                      author: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentDashboardDetails;
