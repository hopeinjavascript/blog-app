import './styles/css-variables.css';
import './styles/common.css';
import './styles/index.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import Toast from './components/Toast/Toast';
import Articles from './pages/Articles/Articles';
import SingleArticle from './pages/SingleArticle/SingleArticle';
import AddOrUpdateArticle from './pages/AddOrUpdateArticle/AddOrUpdateArticle';
import SingleUser from './pages/SingleUser/SingleUser';
import Users from './pages/Users/Users';
import WrittenArticleList from './pages/WrittenArticleList/WrittenArticleList';
import SavedArticleList from './pages/SavedArticleList/SavedArticleList';
import Nav from './components/Nav/Nav';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';

function App() {
  return (
    <div className="App">
      <Toast />
      <Nav />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* articles */}
        <Route path={`${global.BASE_ROUTE}/articles`} element={<Articles />} />
        <Route
          path={`${global.BASE_ROUTE}/:title`}
          element={<SingleArticle />}
        />
        <Route
          path={`${global.BASE_ROUTE}/articles/add`}
          element={<AddOrUpdateArticle />}
        />
        <Route
          path={`${global.BASE_ROUTE}/articles/edit`}
          element={<AddOrUpdateArticle />}
        />

        {/* users */}
        <Route path={`/users`} element={<Users />} />
        <Route path={`/users/:username`} element={<SingleUser />} />
        <Route
          path={`${global.BASE_ROUTE}/users/:userId/articles/written`}
          element={<WrittenArticleList />}
        />
        <Route
          path={`${global.BASE_ROUTE}/users/:userId/articles/saved`}
          element={<SavedArticleList />}
        />
      </Routes>
    </div>
  );
}

export default App;
