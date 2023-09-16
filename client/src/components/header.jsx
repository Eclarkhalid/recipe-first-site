import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineMenu } from 'react-icons/ai'

import { UserContext } from "../userContext";

const header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch('https://recipe-rise-api.onrender.com/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('https://recipe-rise-api.onrender.com/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;
  const location = useLocation();
  const active = 'text-blue-600 font-bold bg-green-200 p-2 rounded';
  const inactive = ' font-bold bg-gray-200 p-2 rounded'
  const profileActive = 'bg-green-200 p-2 rounded-md';
  const profileInactive = 'bg-slate-100 p-2 rounded-md';
  const navActive = 'font-bold text-green-600 underline'
  const navInactive = ' font-normal'

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return <>
    <header className={`p-2 shadow-md bg-white ${isScrolled ? 'fixed top-0 left-0 w-full' : 'elative'}`}>
      <div className="container-xl">
        <nav className='flex justify-around items-center'>
          <div className="logo ">
            <Link to={'/post'}>
              <h1 className='text-xl md:text-xl lg:text-xl gap-1 flex items-center font-medium'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
                </svg>
                <span className="text-slate-900 hidden md:flex lg:flex">Recipe Rise</span>
              </h1>
            </Link>
          </div>
          <div className="social-links lg:flex hidden space-x-8 uppercase p-3">
            {username && (
              <>
                <Link className={location.pathname === '/post' ? navActive : navInactive} to={'/post'}>
                  Posts
                </Link>
              </>
            )}
            {!username && (
              <>
                <Link className={location.pathname === '/' ? navActive : navInactive} to={'/'}>
                  Home
                </Link>
                <Link className={location.pathname === '/post' ? navActive : navInactive} to={'/post'}>
                  Posts
                </Link>


              </>
            )}
          </div>
          <div className="social-links lg:hidden md:hidden space-x-8 uppercase p-3">
            {username && (
              <>
                <Link className={location.pathname === '/post' ? navActive : navInactive} to={'/post'}>
                  Posts
                </Link>
              </>
            )}
          </div>
          <div className="logout flex justify-around items-center space-x-4">
            {username && (
              <>
                {location.pathname !== '/profile' && (
                  <Link to={'/write'} className={location.pathname === '/write' ? active : inactive}>
                    <p className="uppercase">Create</p>
                  </Link>
                )}

                {/* {location.pathname !== '/profile' && (
        <Link to={'/'}>
          <button onClick={logout} className='p-2 lg:flex hidden text-md opacity-60 bg-gray-300 rounded'>Logout</button>
        </Link>
      )} */}
                <Link to={'/profile'} className={`${location.pathname === '/profile' ? profileActive : profileInactive} lg:flex items-center gap-1 rounded-md`}>
                  <div className="lg:hidden"> {/* Hide the text on mobile devices */}
                    <span className="sr-only">Profile</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </Link>

              </>
            )}

            {!username && (
              <>
                <Link to={'/login'}>
                  <button className='p-2 text-md opacity-60 font-medium rounded'>Sign In</button>
                </Link>
                <Link to={'/register'}>
                  <button className='p-2 text-md opacity-60 font-medium bg-gray-300 rounded'>Sign Up</button>
                </Link>
              </>
            )}

          </div>

        </nav>
      </div >
    </header >
  </>
}

export default header