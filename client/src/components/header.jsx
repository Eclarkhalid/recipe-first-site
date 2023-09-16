import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineMenu } from 'react-icons/ai'

import { UserContext } from "../userContext";

const header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
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
              <h1 className='text-2xl md:text-3xl lg:text-4xl font-medium'>
                Kitchen<span className="text-green-600">Craze</span>
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