import React from 'react';
import ReactionList from '../components/ReactionList';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_COMMENT } from '../utils/queries';

const UserComment = props =>{
  console.log(props);
    const { id: commentId } = useParams();

    const { loading, data } = useQuery(GET_COMMENT, {
      variables: { id: commentId }
    });
    
    const comment = data?.comment || {};
    
    if (loading) {
      return <div>Loading...</div>;
    }

    return (
        <div>
          <div className="card mb-3">
            <p className="card-header">
              <span style={{ fontWeight: 700 }} className="text-light">
                {comment.username}
              </span>{' '}
              thought on {comment.createdAt}
            </p>
            <div className="card-body">
              <p>{comment.commentText}</p>
            </div>
          </div>
        
          {comment.Count > 0 && <ReactionList reactions={comment.reactions} />}
        </div>
          );
};
        






export default  UserComment;