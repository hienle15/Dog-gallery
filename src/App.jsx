import React, { useState } from 'react';
import BreedDropdown from './components/BreedDropdown';
import DogGallery from './components/DogGallery';
import FavoritesList from './components/FavoritesList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faHeart, faBars } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [activeTab, setActiveTab] = useState('gallery');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 text-gray-800 flex flex-col md:flex-row">
      {/* Mobile Topbar */}
      <header className="md:hidden flex items-center justify-between bg-white px-4 py-3 shadow">
        <h1 className="text-lg font-bold text-indigo-700 flex items-center">
          <FontAwesomeIcon icon={faPaw} className="mr-2 text-indigo-500" />
          Dog Gallery
        </h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-indigo-600 focus:outline-none"
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'block' : 'hidden'
        } md:block bg-white w-full md:w-64 p-6 shadow-md md:shadow-lg transition-all duration-300 z-10 md:z-0 absolute md:relative top-[58px] md:top-0`}
      >
        <div>
          <h2 className="hidden md:flex text-2xl font-extrabold text-indigo-700 mb-10 items-center">
            <FontAwesomeIcon icon={faPaw} className="mr-3 text-indigo-500" />
            Dog Gallery
          </h2>
          <nav className="space-y-2">
            <button
              onClick={() => {
                setActiveTab('gallery');
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'gallery'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FontAwesomeIcon icon={faPaw} className="mr-3" />
              Thư viện
            </button>
            <button
              onClick={() => {
                setActiveTab('favorites');
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'favorites'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FontAwesomeIcon icon={faHeart} className="mr-3" />
              Yêu thích
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 mt-16 md:mt-0">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          {activeTab === 'gallery' && (
            <>
              <h2 className="text-xl md:text-2xl font-semibold text-indigo-700 mb-6 flex items-center">
                <FontAwesomeIcon icon={faPaw} className="mr-3 text-indigo-500" />
                Thư viện chó
              </h2>
              <BreedDropdown />
              <div className="mt-6">
                <DogGallery />
              </div>
            </>
          )}

          {activeTab === 'favorites' && (
            <>
              <h2 className="text-xl md:text-2xl font-semibold text-pink-600 mb-6 flex items-center">
                <FontAwesomeIcon icon={faHeart} className="mr-3 text-red-500" />
                Yêu thích
              </h2>
              <FavoritesList />
            </>
          )}
        </div>
      </main>

      <ToastContainer position="top-right" autoClose={1000} />
    </div>
  );
};

export default App;
