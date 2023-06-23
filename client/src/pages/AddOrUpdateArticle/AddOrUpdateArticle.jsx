import React, { useRef, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './AddOrUpdateArticle.css';
import { BsCheck2 } from 'react-icons/bs';
import Button from '../../components/Button/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { formatString } from '../../helpers/generic';
import { useArticleContext } from '../../context/articleContext';
import { IoAdd } from 'react-icons/io5';
import { FiEdit2 } from 'react-icons/fi';

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];

function AddOrUpdateArticle() {
  const { loading, handleAddArticle, handleUpdateArticle } =
    useArticleContext();

  const location = useLocation();
  const navigate = useNavigate();

  const [title, setTitle] = useState(location?.state?.article?.title ?? '');
  const [content, setContent] = useState(
    location?.state?.article?.content ?? ''
  );

  const handleTextChange = (content) =>
    content === '<p><br></p>' ? setContent('') : setContent(content);

  const handleTitleChange = (e) => setTitle(e.target.value);

  const refForm = useRef('');

  useEffect(() => {
    refForm.current[0].focus();
  }, []);

  function handleAdd(e) {
    e.preventDefault();
    // const category = refForm.current[0].value;
    // const topic = refForm.current[1].value;

    debugger;
    const title = refForm.current[0].value;
    const coverImage = refForm.current[1].files[0]?.name;
    const articleContent = content;

    if (!title || !coverImage || !articleContent) {
      return alert('Fill in all the fields');
    }

    const blogObj = {
      // category,
      // topic,
      title,
      coverImage: 'http://unsplash.it/800/800',
      content: articleContent,
    };

    handleAddArticle(blogObj);
    navigate(`${global.BASE_ROUTE}/articles`);
  }

  function handleUpdate(e) {
    e.preventDefault();
    const title = refForm.current[0]?.value;
    const articleContent = content;

    if (!title || !articleContent) {
      return alert('Fill in all the fields');
    }

    const blogObj = {
      // category,
      action: 'edit',
      title,
      content: articleContent,
    };

    debugger;

    const articleId = location?.state?.article?._id;
    handleUpdateArticle(articleId, blogObj);
    navigate(
      `${global.BASE_ROUTE}/${formatString(location?.state?.article?.title)}`,
      { state: { articleId } }
    );
    // const update = async () => {
    //   setLoadingStatus('loading');

    //   const resp = await fetchCall(
    //     `${process.env.REACT_APP_BLOG_APP_BACKEND_URL}${global.BASE_ROUTE}/articles/${location?.state?.article?._id}`,
    //     {
    //       method: 'PATCH',
    //       data: blogObj,
    //     }
    //   );

    //   setLoadingStatus('idle');

    //   if (!resp?.success) {
    //     return toast(`${resp?.message}`, { type: 'error' });
    //   } else {
    //     toast(`${resp?.message}`, { type: 'success' });
    //     navigate(
    //       `${global.BASE_ROUTE}/${formatString(
    //         location?.state?.article?.title
    //       )}`,
    //       { state: { articleId: location?.state?.article?._id } }
    //     );
    //   }
    // };

    // update();
  }

  const isEditing = location?.pathname === `${global.BASE_ROUTE}/articles/edit`;

  const button = isEditing ? (
    <Button
      status={loading}
      btnText="Update"
      btnIcon={FiEdit2}
      btnLoadingText="Updating..."
      btnSuccessText="Updated"
      btnSuccessIcon={BsCheck2}
      clickHandler={handleUpdate}
      className="add-article-form-btn"
    />
  ) : (
    <Button
      status={loading}
      btnText="Create"
      btnIcon={IoAdd}
      btnLoadingText="Creating..."
      btnSuccessText="Created"
      btnSuccessIcon={BsCheck2}
      clickHandler={handleAdd}
      className="add-article-form-btn"
    />
  );

  return (
    <section className="page-section">
      <div className="add-article-form-wrapper">
        <h2 className="page-title" style={{ textAlign: 'left' }}>
          {isEditing ? 'Update Article' : 'Create Article'}
          {/* {button} */}
        </h2>
        <hr />
        <form className="add-article-form" ref={refForm}>
          {/* <div className="flex">
            <div className="form-input">
              <label className="label form-label" htmlFor="category">
                Category
                <span className="required-field">*</span>
              </label>
              <select
                className="category user-input"
                onChange={() => {}}
                disabled={isEditing ? true : false}
              >
                {[].map(({ _id, category }) => (
                  <option
                    key={_id}
                    className="categoryOption"
                    value={'category'}
                  >
                    {'category'}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-input">
              <label className="label form-label" htmlFor="topic">
                Topic
                <span className="required-field">*</span>
              </label>
              <small className="secondary-text">
                You can add a new topic{' '}
                <Link
                  to={`${global.BASE_ROUTE}/addTopic`}
                  className="here-link"
                >
                  here.
                </Link>
              </small>
              <select
                className="topic user-input"
                disabled={isEditing ? true : false}
                value={location?.state?.topic && location?.state.topic}
              >
                {[].map((topic) => {
                  return (
                    <option
                      key={topic.topic}
                      className="categoryOption"
                      value={topic.topic}
                    >
                      {topic.topic}
                    </option>
                  );
                })}
              </select>
            </div>
          </div> */}

          <div className="flex">
            <div className="form-input">
              <label htmlFor="title" className="label form-label">
                Title
                <span className="required-field">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                className="user-input"
                value={title}
                onChange={handleTitleChange}
              />
            </div>

            <div className="form-input">
              <label htmlFor="cover-img" className="label form-label">
                Cover Image
                <span className="required-field">*</span>
              </label>
              <input id="cover-img" type="file" placeholder="Cover Image" />
            </div>
          </div>

          <div className="form-input">
            <label htmlFor="desc" className="label form-label">
              Content
              <span className="required-field">*</span>
            </label>

            <ReactQuill
              // className="editor__quill-editor"
              modules={modules}
              formats={formats}
              theme="snow"
              value={content}
              onChange={handleTextChange}
              placeholder="Content goes here..."
            />
          </div>

          {button}
        </form>
      </div>
      <div className="preview ql-snow">
        <h2>Live Preview</h2>
        <hr />
        <h1
          className="preview__title"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div
          className="preview__content ql-editor"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
}

export default AddOrUpdateArticle;
