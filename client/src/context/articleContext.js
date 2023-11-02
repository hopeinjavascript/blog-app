import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { fetchCall } from '../helpers/fetchCall';
import articleReducer from '../reducers/article';
import { toast } from 'react-toastify';

const ArticleContext = createContext(null);

const initialState = {
  loading: false, // idle | succeeded | loading
  articles: [],
  article: {},
  articlesWrittenByUser: [],
  articlesSavedByUser: [],
};

const ArticleContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(articleReducer, initialState);

  useEffect(() => {
    fetchArticles();
    return () => {};
  }, []);

  async function fetchArticles() {
    dispatch({ type: 'LOADING' });

    const resp = await fetchCall(
      `${process.env.REACT_APP_BLOG_APP_BACKEND_URL}${global.BASE_ROUTE}/articles`
    );

    if (!resp?.success) {
      toast(`${resp?.message}`, { type: 'error' });
      dispatch({ type: 'NOT_LOADING' });
    } else {
      dispatch({ type: 'FETCH_ARTICLES', payload: { articles: resp.data } });
    }
  }

  // single article
  async function fetchArticle(articleId) {
    dispatch({ type: 'LOADING' });

    const resp = await fetchCall(
      `${process.env.REACT_APP_BLOG_APP_BACKEND_URL}${global.BASE_ROUTE}/articles/${articleId}`
    );

    if (!resp?.success) {
      toast(`${resp?.message}`, { type: 'error' });
      dispatch({ type: 'NOT_LOADING' });
    } else {
      dispatch({ type: 'FETCH_ARTICLE', payload: { article: resp.data } });
    }
  }

  const handleAddArticle = async (payload) => {
    dispatch({ type: 'LOADING' });

    const resp = await fetchCall(
      `${process.env.REACT_APP_BLOG_APP_BACKEND_URL}${global.BASE_ROUTE}/articles`,
      {
        method: 'POST',
        data: payload,
      }
    );

    if (!resp?.success) {
      toast(`${resp?.message}`, { type: 'error' });
      dispatch({ type: 'NOT_LOADING' });
    } else {
      toast(`${resp?.message}`, { type: 'success' });
      // state update not needed if we are navigating to articles page because it will fetch data on component mount
      // setArticles([...articles, resp.data]);
      //   navigate(`${global.BASE_ROUTE}/articles`);
      dispatch({ type: 'ADD_ARTICLE', payload: { article: resp.data } });
    }
  };

  const handleDeleteArticle = async (id) => {
    const deleteConfirmation = window.confirm(
      `Are you sure you want to delete this article?`
    );

    if (!deleteConfirmation) {
      return;
    }

    dispatch({ type: 'LOADING' });

    const resp = await fetchCall(
      `${process.env.REACT_APP_BLOG_APP_BACKEND_URL}${global.BASE_ROUTE}/articles/${id}`,
      {
        method: 'DELETE',
      }
    );

    if (!resp?.success) {
      toast(`${resp?.message}`, { type: 'error' });
      dispatch({ type: 'NOT_LOADING' }); // for special/error cases
    } else {
      toast(`${resp?.message}`, { type: 'success' });
      dispatch({
        type: 'DELETE_ARTICLE',
        payload: { article: resp.data },
      });
    }
  };

  const handleUpdateArticle = async (articleId, payload) => {
    if (
      !['like', 'unlike', 'publish', 'save', 'unsave'].includes(payload.action)
    ) {
      dispatch({ type: 'LOADING' });
    }

    const resp = await fetchCall(
      `${process.env.REACT_APP_BLOG_APP_BACKEND_URL}${global.BASE_ROUTE}/articles/${articleId}`,
      {
        method: 'PATCH',
        data: payload,
      }
    );

    if (!resp?.success) {
      toast(`${resp?.message}`, { type: 'error' });
      dispatch({ type: 'NOT_LOADING' });
      return;
    } else {
      if (!['like', 'unlike', 'publish'].includes(payload.action)) {
        toast(`${resp?.message}`, { type: 'success' });
      }
      dispatch({ type: 'UPDATE_ARTICLE', payload: { article: resp.data } });
    }
  };

  // should these be in user context?
  async function fetchArticlesWrittenByUser(userId) {
    const resp = await fetchCall(
      `${process.env.REACT_APP_BLOG_APP_BACKEND_URL}/users/${userId}/articles`
    );

    if (!resp?.success) {
      toast(`${resp?.message}`, { type: 'error' });
      dispatch({ type: 'NOT_LOADING' });
    } else {
      dispatch({
        type: 'FETCH_ARTICLES_WRITTEN_BY_USER',
        payload: { articles: resp.data },
      });
    }
  }

  async function fetchArticlesSavedByUser(userId) {
    const resp = await fetchCall(
      `${process.env.REACT_APP_BLOG_APP_BACKEND_URL}/users/${userId}/articles/saved`
    );

    if (!resp?.success) {
      toast(`${resp?.message}`, { type: 'error' });
      dispatch({ type: 'NOT_LOADING' });
    } else {
      dispatch({
        type: 'FETCH_ARTICLES_SAVED_BY_USER',
        payload: { articles: resp.data },
      });
    }
  }

  const val = useMemo(() => ({
    ...state,
    dispatch,
    fetchArticles,
    fetchArticle,
    handleAddArticle,
    handleDeleteArticle,
    handleUpdateArticle,
    fetchArticlesWrittenByUser,
    fetchArticlesSavedByUser,
  }));

  return (
    <ArticleContext.Provider value={val}>{children}</ArticleContext.Provider>
  );
};

export default ArticleContextProvider;

export const useArticleContext = () => useContext(ArticleContext);
