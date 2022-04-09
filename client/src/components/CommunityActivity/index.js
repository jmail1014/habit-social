// modeled from the thoughtlist in 21, this will be a list of everyone's activity

import React, { useState } from "react";

import { useMutation } from '@apollo/client';
import { ADD_REACTION } from '../../utils/mutations';
import { QUERY_REACTIONS, QUERY_ME } from '../../utils/queries';

const CommunityActivity = () => {
    const [reactionText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
  
    const [addReaction, { error }] = useMutation(ADD_REACTION, {
      update(cache, { data: { addReaction } }) {
        try {
          // update thought array's cache
          // could potentially not exist yet, so wrap in a try/catch
          const { reactions } = cache.readQuery({ query: QUERY_REACTIONS });
          cache.writeQuery({
            query: QUERY_REACTIONS,
            data: { reactions: [addReaction, ...reactions] },
          });
        } catch (e) {
          console.error(e);
        }
  
        // update me object's cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, reactions: [...me.reactions, addReaction] } },
        });
      },
    });
  
    // update state based on form input changes
    const handleChange = (event) => {
      if (event.target.value.length <= 280) {
        setText(event.target.value);
        setCharacterCount(event.target.value.length);
      }
    };
  
    // submit form
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      try {
        await addReaction({
          variables: { reactionText },
        });
  
        // clear form value
        setText('');
        setCharacterCount(0);
      } catch (e) {
        console.error(e);
      }
    };
  
    return (
      <div>
        <p
          className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}
        >
          Character Count: {characterCount}/280
          {error && <span className="ml-2">Something went wrong...</span>}
        </p>
        <form
          className="flex-row justify-center justify-space-between-md align-stretch"
          onSubmit={handleFormSubmit}
        >
          <textarea
            placeholder="Here are some reactions to habit progress..."
            value={reactionText}
            className="form-input col-12 col-md-9"
            onChange={handleChange}
          ></textarea>
          <button className="btn col-12 col-md-3" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  };
  
  export default CommunityActivity;
  