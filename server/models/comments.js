import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Description is required'],
    },

    parentId: { type: ObjectId, ref: 'comment', default: null },

    user: { type: ObjectId, ref: 'user', required: true },

    likes: [{ type: ObjectId, ref: 'user', default: [] }],

    editCount: { type: Number, default: 0 },

    article: { type: ObjectId, ref: 'article' },
  },
  { timestamps: true }
);

const CommentModel = mongoose.model('comment', CommentSchema);
export default CommentModel;
