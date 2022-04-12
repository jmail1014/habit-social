import React, {useState, useRef, useEffect} from "react";
import HabitsList from "../CurrentHabits";
// need to npm i uuid so app can generate random id for habits
import { v4 as uuidv4 } from 'uuid';

const localStorageKey = 'habitsList.habit'

function UserHabits() {
    const [habits, setHabits] = useState(['Workout', 'Take Medication', 'Read', 'Cook a meal', 'Garden'])
    const habitRef = useRef()

// use effect functions allow to save habits for users
useEffect(() => {
    const storedHabits = JSON.parse(localStorage.getItem(localStorageKey))
    if (storedHabits) setHabits(storedHabits)
}, [])

useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(habits))
}, [habits])

// should allow to click or unclick habit
function clickHabit(id) {
    const newHabits = [...habits]
    const habit = newHabits.find(habit => habit.id === id)
    habit.complete = !habit.complete
    setHabits(newHabits)
}

function handleAddHabit(event) {
    const name = habitRef.current.value
        if (name === '') return
        setHabits(prevHabits => {
            return [...prevHabits, { id: uuidv4(), name: name}]
        })
    habitRef.current.value = null
}
    return (
        <>
        <HabitsList habits={habits} clickHabit={clickHabit} />
        <input ref={habitRef} type='text' />
        <button onClick={handleAddHabit}>Add Habit</button>
        <div>{habits.filter(habit => habit.complete).length}habits have been completed!</div>
        </>
    )
}

export default UserHabits;
