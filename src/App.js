import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./component/HomePage";
import Register from "./component/Auth/Register";
import Login from "./component/Auth/Login";
import ParentNavBar from "./component/Navigation/ParentNavBar";
import AddCategory from "./component/Categories/AddCategory";
import CategoryList from "./component/Categories/CategoryList";
import UpdateCategory from "./component/Categories/UpdateCategory";
import AdminProtectedRoute from "./component/ProtectedRoutes/AdminProtectedRoute";
import PrivateRoutes from "./component/ProtectedRoutes/PrivateRoutes";
import CreatePost from "./component/Posts/CreatePost";
import PostsList from "./component/Posts/postList";
import PostDetails from "./component/Posts/PostDetails";
import UpdatePost from "./component/Posts/UpdatePost";
import CreateReport from "./component/Reports/CreateReport";



function App() {
  return (
    <>
      <BrowserRouter>
        <ParentNavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/update-category/:id" element={<UpdateCategory />} />
          <Route path="/posts" element={<PostsList />} />
          <Route path="/posts/:id" element={<PostDetails/>} />
          <Route path="/create-report" element={<CreateReport />}/>

          {/* Protected Routes */}
          <Route
            path="/category-list"
            element={
              <AdminProtectedRoute>
                <CategoryList />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/add-category"
            element={
              <AdminProtectedRoute>
                <AddCategory />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/create-post"
            element={<PrivateRoutes>{<CreatePost />}</PrivateRoutes>}
          />
          <Route
            path="/update-post/:id"
            element={<PrivateRoutes>{<UpdatePost />}</PrivateRoutes>}
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
