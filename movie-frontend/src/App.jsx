import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Film, Search, User } from 'lucide-react';

const API_BASE_URL =  import.meta.env.VITE_API_BASE;

const MovieApp = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    isbn: '',
    director: {
      firstname: '',
      lastname: ''
    }
  });

  // Fetch all movies
  const fetchMovies = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/movies`);
      if (response.ok) {
        const data = await response.json();
        setMovies(data || []);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  // Create movie
  const createMovie = async (movieData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/movies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
      });
      if (response.ok) {
        fetchMovies();
        return true;
      }
    } catch (error) {
      console.error('Error creating movie:', error);
    }
    return false;
  };

  // Update movie
  const updateMovie = async (id, movieData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/movies/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
      });
      if (response.ok) {
        fetchMovies();
        return true;
      }
    } catch (error) {
      console.error('Error updating movie:', error);
    }
    return false;
  };

  // Delete movie
  const deleteMovie = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/movies/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchMovies();
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    const success = editingMovie 
      ? await updateMovie(editingMovie.id, formData)
      : await createMovie(formData);
    
    if (success) {
      setShowModal(false);
      setEditingMovie(null);
      setFormData({
        title: '',
        isbn: '',
        director: { firstname: '', lastname: '' }
      });
    }
  };

  // Open modal for editing
  const openEditModal = (movie) => {
    setEditingMovie(movie);
    setFormData({
      title: movie.title,
      isbn: movie.isbn,
      director: {
        firstname: movie.director?.firstname || '',
        lastname: movie.director?.lastname || ''
      }
    });
    setShowModal(true);
  };

  // Open modal for creating
  const openCreateModal = () => {
    setEditingMovie(null);
    setFormData({
      title: '',
      isbn: '',
      director: { firstname: '', lastname: '' }
    });
    setShowModal(true);
  };

  // Filter movies based on search term
  const filteredMovies = movies.filter(movie =>
    movie.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.director?.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.director?.lastname?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading movies...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Film className="w-8 h-8 text-yellow-400" />
              <h1 className="text-3xl font-bold text-white">Movie Library</h1>
            </div>
            <button
              onClick={openCreateModal}
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-200 transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              <span>Add Movie</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20"
            />
          </div>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{movie.title}</h3>
                  <p className="text-gray-300 text-sm mb-2">ISBN: {movie.isbn}</p>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <User className="w-4 h-4" />
                    <span>{movie.director?.firstname} {movie.director?.lastname}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => openEditModal(movie)}
                  className="p-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 rounded-lg transition-colors duration-200"
                >
                  <Edit2 className="w-4 h-4 text-blue-400" />
                </button>
                <button
                  onClick={() => deleteMovie(movie.id)}
                  className="p-2 bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 rounded-lg transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredMovies.length === 0 && (
          <div className="text-center py-12">
            <Film className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No movies found</h3>
            <p className="text-gray-300">
              {searchTerm ? 'Try adjusting your search terms.' : 'Add your first movie to get started!'}
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingMovie ? 'Edit Movie' : 'Add New Movie'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20"
                  placeholder="Enter movie title"
                  required
                />
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">ISBN</label>
                <input
                  type="text"
                  value={formData.isbn}
                  onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20"
                  placeholder="Enter ISBN"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Director First Name</label>
                  <input
                    type="text"
                    value={formData.director.firstname}
                    onChange={(e) => setFormData({
                      ...formData,
                      director: { ...formData.director, firstname: e.target.value }
                    })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20"
                    placeholder="First name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Director Last Name</label>
                  <input
                    type="text"
                    value={formData.director.lastname}
                    onChange={(e) => setFormData({
                      ...formData,
                      director: { ...formData.director, lastname: e.target.value }
                    })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20"
                    placeholder="Last name"
                    required
                  />
                </div>
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-500/20 hover:bg-gray-500/30 border border-gray-400/30 text-white rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
                >
                  {editingMovie ? 'Update' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieApp;