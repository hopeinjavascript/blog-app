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
import { uploadFile } from '../../helpers/fetchCall';

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
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleTextChange = (content) =>
    content === '<p><br></p>' ? setContent('') : setContent(content);

  const handleTitleChange = (e) => setTitle(e.target.value);

  const refForm = useRef('');

  useEffect(() => {
    refForm.current[0].focus();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    // const category = refForm.current[0].value;
    // const topic = refForm.current[1].value;

    const title = refForm.current[0]?.value;
    const coverImage = Date.now() + '_' + file?.name;
    const articleContent = content;

    debugger;
    // checking for file?.name, because if we check for coverImage then it will have date prepended to it so it will always pass the condition
    // * We CANNOT programmatically set the value of input type file due to security reasons
    if (!title || !file?.name || !articleContent) {
      return alert('Fill in all the fields');
    }

    const blogObj = {
      // category,
      // topic,
      title,
      coverImage,
      content: articleContent,
    };

    // (1.) uploading file first
    if (file) {
      await uploadFile(file, coverImage);
    }

    // (2.) json payload
    handleAddArticle(blogObj);
    navigate(`${global.BASE_ROUTE}/articles`);
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const title = refForm.current[0]?.value;
    const coverImage = Date.now() + '_' + file?.name;
    const articleContent = content;

    // checking for file?.name, because if we check for coverImage then it will have date prepended to it
    // so it will always pass the condition
    // * We CANNOT programmatically set the value of input type file due to security reasons
    if (!title || !file?.name || !articleContent) {
      return alert('Fill in all the fields');
    }

    const blogObj = {
      // category,
      action: 'edit',
      title,
      coverImage,
      content: articleContent,
    };

    debugger;

    // (1.) uploading file first
    if (file) {
      await uploadFile(file, coverImage);
    }

    // (2.) json payload
    const articleId = location?.state?.article?._id;
    handleUpdateArticle(articleId, blogObj);
    navigate(
      `${global.BASE_ROUTE}/${formatString(location?.state?.article?.title)}`,
      { state: { articleId } }
    );
  }

  const handlePreviewImg = (e) => {
    e.preventDefault();
    const file = refForm.current[1].files[0];
    const previewUrl = URL.createObjectURL(file);
    setFile(file);
    setPreviewUrl(previewUrl);
  };

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
              <input
                id="cover-img"
                name="cover-img"
                type="file"
                accept=".png,.jpg,.jpeg,.svg"
                placeholder="Cover Image"
                onChange={handlePreviewImg}
              />
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

        {previewUrl && (
          <div className="single-article-cover-img-container">
            <img src={previewUrl} alt="cover image" />
          </div>
        )}

        <div
          className="preview__content ql-editor"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
}

export default AddOrUpdateArticle;
