// src/components/FavoritesList.jsx
import React from 'react';
import { useAppDispatch, useAppSelector } from '../App/hooks';
import { removeFromFavorites, selectFavorites } from '../features/dogs/favoritesSlice';
import { toast } from 'react-toastify';

const FavoritesList = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);

  const handleRemove = (image) => {
    dispatch(removeFromFavorites(image));
    toast.error('Đã xóa khỏi yêu thích!');
  };

  if (favorites.length === 0) {
    return <p className="text-center text-gray-600 py-8">Danh sách yêu thích của bạn đang trống.</p>;
  }

  return (
    <div className="py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((image) => (
          <div
            key={image.id}
            className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
          >
            <img
              className="w-full h-64 object-cover"
              src={image.url}
              alt="Favorite Cat"
            />
            <button
              onClick={() => handleRemove(image)}
              className="absolute top-2 left-2 bg-white bg-opacity-75 rounded-full p-2 shadow-md hover:bg-opacity-90"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;