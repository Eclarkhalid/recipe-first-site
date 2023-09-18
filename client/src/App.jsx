
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import Login from './pages/login'
import Home from './pages/home'
import Register from './pages/register'
import Single from './pages/single'
import Write from './pages/write'
import Header from "./components/header";
import Footer from "./components/footer";
import Landing from "./pages/landing";
import Post from "./pages/post";
import PostPage from "./pages/postPage";
import EditPost from "./pages/editPost";
import DeletePost from "./pages/deletePost";
import Profile from './pages/profile'
import Cooking from "./pages/cooking";
import { UserContextProvider } from "./userContext";

import ProtectedRoute from "./ProtectedRoute";

const Layout = () => {
  return <>
  <Header />
  <Outlet />
  <Footer />
  </>
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children:[
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: <PostPage />,
      },
      {
        path: "/edit/:id",
        element: <EditPost />,
      },
      {
        path: "/delete/:id",
        element: <DeletePost />,
      },
      {
        path: "/write",
        element: <Write />,
      },
      {
        path: "/cooking",
        element: <Cooking />,
      },
      {
        path: "/landing",
        element: <Landing />,
      },
      {
        path: "/post",
        element: <Post />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/profile",
        element: <ProtectedRoute element={<Profile />} />, // Use ProtectedRoute for /profile
      },
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return (
    <UserContextProvider>
      <div className="app">
        <div className="container-xl">
          <RouterProvider router={router} />
        </div>
      </div>
    </UserContextProvider>
  );
}

export default App;