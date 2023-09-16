import { useEffect, useState, useContext } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { UserContext } from "../userContext";
function truncateSummary(summary) {
  const words = summary.split(' ');
  if (words.length > 2) {
    return words.slice(0, 2).join(' ') + '.....';
  }
  return summary;
}

function AuthorProfilePage() {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [newName, setNewName] = useState('');
  const navigate = useNavigate();

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);


  const location = useLocation();
  const active = 'text-blue-600 font-bold bg-green-200 p-2 rounded';
  const inactive = ' font-bold bg-gray-200 p-2 rounded';

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


  const handleNameChange = () => {
    fetch('http://localhost:4000/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ actualName: newName }),
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        setUser(updatedUser);

        // Pass the updated name as a query parameter
        navigate('/post', { state: { updatedName: updatedUser.actualName } });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetch('http://localhost:4000/user/profile', {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data.user);
        setUserPosts(data.userPosts);
      })
      .catch((error) => {
        console.error(error);
        // Handle error and navigate if needed
        navigate('/login');
      });
  }, [navigate]);

  // FETCH FOLLOWERS
  useEffect(() => {
    fetch('http://localhost:4000/user/profile', {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data.user);
        setUserPosts(data.userPosts);
        setFollowers(data.user.followers);
        setFollowing(data.user.following);
      })
      .catch((error) => {
        console.error(error);
        // Handle error and navigate if needed
        navigate('/login');
      });
  }, [navigate]);



  return <>
    <div className='items-center justify-center min-h-screen p-3'>
      <div className=" px-8">
        <div className="w-full flex flex-col lg:flex-row justify-between items-center">
          <div className="bg-white p-6 rounded-lg shadow-md mb-4 lg:mb-0 lg:flex lg:items-center">
            <h1 className='text-2xl font-semibold mb-4 lg:mb-0 lg:mr-4'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block align-middle mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 3H7a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 17l5-5-5-5m0 10V7" />
              </svg>
              Dashboard
            </h1>
            <div className="flex space-x-6">
              <Link to={'/write'} className={location.pathname === '/write' ? active : inactive}>
                <button className="px-4  text-gray-700 font-medium rounded-lg  focus:outline-none focus:ring focus:ring-blue-300">
                  Create
                </button>
              </Link>
              <Link to={'/'}>
                <button onClick={logout} className='px-4 py-2 text-md text-gray-600 bg-gray-300 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-300'>
                  Logout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>


      <div className="bg-white mx-3 mt-4 mb-4 p-6">
        {user && (
          <div className='p-3 bg-stone-200'>
            <h2 className='text-xl'>{user.actualName || user.username}'s Profile</h2>
            <form onSubmit={handleNameChange} className='mt-3 flex flex-col'>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className='p-2 rounded-lg outline-none border border-gray-300'
                placeholder='Enter name to update'
                required
              />
              <button type="submit" className='mt-3 p-2 bg-blue-500 text-white font-medium rounded-lg'>
                Update
              </button>
            </form>
          </div>
        )}

        <h1 className='py-3 text-xl lg:text-2xl font-semibold'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 inline-block align-middle mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 3H7a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 17l5-5-5-5m0 10V7" />
          </svg>
          Your Posts
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-3 py-2 font-medium text-gray-900">
                  No:
                </th>
                <th scope="col" className="px-3 py-2 font-medium text-gray-900">
                  Title
                </th>
                <th scope="col" className="px-3 py-2 font-medium text-gray-900">
                  Description
                </th>
                <th scope="col" className="px-3 py-2 font-medium text-gray-900">
                  Status
                </th>
                <th scope="col" className="px-3 py-2 font-medium text-gray-900"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {userPosts.map((post, index) => (
                <tr key={post._id}>
                  <td className="px-3 py-2">{index + 1}:</td>
                  <td className="px-3 py-2 font-medium text-gray-900">{post.title}</td>
                  <td className="px-3 py-2">{truncateSummary(post.summary)}</td>
                  <td className="px-3 py-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                      ok
                    </span>
                  </td>
                  <td className="px-3 py-2 text-center">
                    <Link to={`/post/${post._id}`} className="text-green-700">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>

}

export default AuthorProfilePage;
