// home for Habits you can choose to add or create
import React from "react";


export default function Habit({ habit, clickHabit }) {

function handleClickHabit() {
    clickHabit(habit.id)
}
    return (
        <div>
            <label>
            <input type='checkbox' onChange={handleClickHabit} />
            {habit.name}
            </label>
        </div>
    )
}
