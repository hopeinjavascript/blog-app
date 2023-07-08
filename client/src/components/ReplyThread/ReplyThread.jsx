import './ReplyThread.css';
import Comments from '../Comments/Comments';
import { useState } from 'react';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

const ReplyThread = (props) => {
  const [moreReplies, setMoreReplies] = useState(false);

  const handleMoreReplies = () => setMoreReplies(!moreReplies);

  return (
    <div className={`reply-thread`}>
      {/* only show if children array > 1 */}
      {props.id &&
        props.children?.length > 0 && ( // if there's only 1 child then below <p> wont be shown (1.)
          <p className="reply-count" onClick={handleMoreReplies}>
            Total {props.children?.length} replies
            {moreReplies ? <TiArrowSortedDown /> : <TiArrowSortedUp />}
          </p>
        )}

      <div className="replies">
        {props.children?.length > 0 && (
          <Comments
            // comments={props.children}
            comments={moreReplies ? props.children : []}
            // comments={moreReplies ? props.children : props.children.slice(0, 1)} // if there's only 1 child then it will be shown by default (2.)
            getChildComments={props.getChildComments}
          />
        )}
      </div>
    </div>
  );
};

export default ReplyThread;
