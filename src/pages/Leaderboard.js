import React, { useContext, useEffect, useState } from 'react';
import DishesContext from '../store/dish-store';
import styles from './Leaderboard.module.css';
import { useNavigate } from 'react-router-dom';

const Leaderboard = () => {

    const UserDishRankedStore = JSON.parse(window.localStorage.getItem('UserDishRankedStore'));
    const currentUser = JSON.parse(window.localStorage.getItem('currentUser'))||null;
    const [topRatedDish, setTopRatedDish] = useState([]);
    const { dishes } = useContext(DishesContext);
    const navigate = useNavigate();

      useEffect(() => {
        if (!currentUser) {
            alert("please login first!!")
            navigate('/login');
        }

    });

    useEffect(() => {
        const mp = new Map();
        for (const obj in UserDishRankedStore) {
            for (let i = 0; i < 3; i++) {
                if (mp.has(UserDishRankedStore[obj][i])) {
                    const temp = mp.get(UserDishRankedStore[obj][i]);
                    mp.set(UserDishRankedStore[obj][i], temp + (30-i*10));
                } else {
                    mp.set(UserDishRankedStore[obj][i], (30-i*10));
                }
            } 
        }
        setTopRatedDish(()=>[...mp.entries()].sort((a, b) => b[1] - a[1]));
       
    }, []);
   
    return (
        <div  className={styles.leaderboard}>
            { topRatedDish.length ? 
            <ul >
                {
                    topRatedDish.length && topRatedDish.map((dish, idx) => {
                        const foundFood = dishes.find((food) => food.id === dish[0]);
                        return <li className={UserDishRankedStore[currentUser.id] && UserDishRankedStore[currentUser.id].includes(dish[0]) ? styles['selected-dish'] : ''} key={idx}>
                            <span>{idx + 1}</span> {foundFood && foundFood.dishName}
                            {UserDishRankedStore[currentUser.id] && UserDishRankedStore[currentUser.id].includes(dish[0]) ? <span style={{ fontWeight: 'normal' }}> - Your selected Rank- {UserDishRankedStore[currentUser.id].indexOf(dish[0])+1}</span> : ''}
                        </li>
                    })
                }
            </ul>
            : <h1>None of the users voted yet !!!</h1>}
      </div>
    )
}

export default Leaderboard;