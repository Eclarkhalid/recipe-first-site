import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <section className="w-full p-4 md:max-w-lg md:p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 mb-4">
            Welcome To Recipe Rise
          </h1>
          <p className="text-gray-600 text-lg md:text-xl mb-6">
            Your ultimate source for global recipes and culinary inspiration.
          </p>
          <div className="mb-6">
            <p className="text-gray-600 mb-2">
              You need an account to create posts.
            </p>
            <div className="flex flex-col space-y-3 md:flex-row md:justify-around md:space-y-0 md:space-x-4">
              <Link
                to="/post"
                className="w-full md:w-auto inline-block px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md font-semibold transition duration-300"
              >
                Explore Our Recipes
              </Link>
              <Link
                to="/register"
                className="w-full md:w-auto inline-block px-4 py-2 text-blue-500 border border-blue-500 hover:text-white hover:bg-blue-500 rounded-md font-semibold transition duration-300"
              >
                Create an Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
