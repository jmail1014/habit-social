import React from "react";
import PromptTypes from 'prop-types';

const Habits = ({ exercise, read, homework, clean, garden}) => (
    <ul>
        <li>{exercise}</li>
        <li>{read}</li>
        <li>{homework}</li>
        <li>{clean}</li>
        <li>{garden}</li>
    </ul>
);

Habits.propTypes = {
    exercise: PromptTypes.bool,
    read: PromptTypes.bool,
    homework: PromptTypes.bool,
    clean: PromptTypes.bool,
    garden: PromptTypes.bool
};


export default Habits;
