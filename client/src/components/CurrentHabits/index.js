// List of current Habits and tracker
import React from "react";
import Habit from "../Habit";

export default function HabitsList(habits, clickHabit) {
    return(
        habits.map(habit => {
            return <Habit key={habit.id} clickHabit={clickHabit} habit={habit} />
        })
    )
}

