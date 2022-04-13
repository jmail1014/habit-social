import React from 'react';
import { Link } from 'react-router-dom';

const ReactionList = ({comments,title}) =>{
    if(!comments.length) {
        return <h3>No Comments Yet</h3>;
    }

    return(
<div>
<h3>{title}</h3>
{comments &&
       comments.map(comment => (
          <div key={comment._id} className="card mb-3">
            <p className="card-header">
  <Link
    to={`/profile/${comment.username}`}
    style={{ fontWeight: 700 }}
    className="text-light"
  >
    {comment.username}
  </Link>{' '}
  thought on {comment.createdAt}
</p>
<div className="card-body">
  <Link to={`/comment/${comment._id}`}>
    <p>{comment.commentText}</p>
    <p className="mb-0">
      Reactions: {comment.Count} || Click to{' '}
      {comment.Count ? 'see' : 'start'} the discussion!
    </p>
  </Link>
</div>
          </div>
        ))}
</div>
    );
};


export default ReactionList;