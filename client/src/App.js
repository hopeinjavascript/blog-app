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

function App() {
  return (
    <div className="App">
      <Toast />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

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
        {/* <Route
          path={`${global.BASE_ROUTE}/users/:username`}
          element={<AddOrUpdateArticle />}
        /> */}
      </Routes>
    </div>
  );
}

export default App;
