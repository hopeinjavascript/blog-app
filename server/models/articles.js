import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },

    content: {
      type: String,
      required: [true, 'Description is required'],
    },

    coverImage: {
      type: String,
      required: [true, 'Cover Image is required'],
    },

    user: { type: ObjectId, ref: 'user', required: true },

    likes: [{ type: ObjectId, ref: 'user', default: [] }],

    bookmarks: [{ type: ObjectId, ref: 'user', default: [] }],

    isPublish: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const ArticleModel = mongoose.model('article', ArticleSchema);
export default ArticleModel;
