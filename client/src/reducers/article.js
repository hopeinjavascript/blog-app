const articleReducer = (state, action) => {
  if (action.type === 'LOADING') {
    // loading values can be => idle | succeeded | loading
    return { ...state, loading: true };
  }

  if (action.type === 'NOT_LOADING') {
    // for special/error cases
    return { ...state, loading: false };
  }

  if (action.type === 'FETCH_ARTICLES') {
    console.log('FETCH_ARTICLES', action);
    return { ...state, loading: false, articles: action.payload.articles };
  }

  if (action.type === 'FETCH_ARTICLE') {
    console.log('FETCH_ARTICLE', action);
    return { ...state, loading: false, article: action.payload.article };
  }

  if (action.type === 'ADD_ARTICLE') {
    console.log('ADD_ARTICLE', action);
    return {
      ...state,
      loading: false,
      // adding at the beginning to show the latest article on top of the list
      articles: [action.payload.article, ...state.articles],
    };
  }

  if (action.type === 'DELETE_ARTICLE') {
    console.log('DELETE_ARTICLE', action);
    return {
      ...state,
      loading: false,
      articles: state.articles.filter(
        (article) => article._id !== action.payload.article._id
      ),
    };
  }

  if (action.type === 'UPDATE_ARTICLE') {
    console.log('UPDATE_ARTICLE', action);

    return {
      ...state,
      loading: false,

      // (1.)
      // try commenting below
      // SingleArticle page will reflect changes whereas Articles page won't
      articles: state.articles.map((article) =>
        article._id === action.payload.article._id
          ? action.payload.article
          : article
      ),

      // doing this to keep in sync with the current state and for better user experience
      // because if 'articles' property is getting updated(which holds ALL the articles) then "articlesWrittenByUser" should also get updated
      articlesWrittenByUser: state.articlesWrittenByUser.map((article) =>
        article._id === action.payload.article._id
          ? action.payload.article
          : article
      ),
      // doing this to keep in sync with the current state and for better user experience
      // because if 'articles' property is getting updated(which holds ALL the articles) then "articlesSavedByUser" should also get updated
      articlesSavedByUser: state.articlesSavedByUser.map((article) =>
        article._id === action.payload.article._id
          ? action.payload.article
          : article
      ),

      // for every "action" in req.body we are sending updated document in the response from server
      // so as per pt (1.) we are specifically updating this to reflect changes in SingleArticle page for all the "actions" made
      // * Ideally below should ONLY be updated when single article is fetched
      article: action.payload.article ?? state.article,
    };
  }

  // should these be in user context?
  if (action.type === 'FETCH_ARTICLES_WRITTEN_BY_USER') {
    console.log('FETCH_ARTICLES_WRITTEN_BY_USER', action);
    return {
      ...state,
      loading: false,
      articlesWrittenByUser: action.payload.articles,
    };
  }

  if (action.type === 'FETCH_ARTICLES_SAVED_BY_USER') {
    console.log('FETCH_ARTICLES_SAVED_BY_USER', action);
    return {
      ...state,
      loading: false,
      articlesSavedByUser: action.payload.articles,
    };
  }

  return { msg: 'default state', ...state };
};
export default articleReducer;
