import React, { useContext, useEffect, useState } from 'react';
import DishesContext from '../store/dish-store';
import styles from './Leaderboard.module.css';
import { useNavigate } from 'react-router-dom';


const Leaderboard = () => {

    const UserDishRankedStore = JSON.parse(window.localStorage.getItem('UserDishRankedStore'));
    const [topRatedDish, setTopRatedDish] = useState([]);
    const { dishes } = useContext(DishesContext);
    const currentUser = JSON.parse(window.localStorage.getItem('currentUser')) ;
    const navigate = useNavigate();
    let check=UserDishRankedStore[currentUser.id];

    useEffect(() => {
        if (!currentUser) {
            alert("please login!!!")
            navigate('/login');
        }

        if(check==undefined){
            alert("vote first to see the leaderboard");
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
        <div>
            <ul className={styles.leaderboard}>
                {
                    topRatedDish.length && topRatedDish.map((dish,idx) => {
                        const foundFood = dishes.find((food) => food.id === dish[0]);
                        if(foundFood ){
                            return  <li key={idx} 
                        style={ foundFood.id===check[0] 
                        || foundFood.id=== check[1] 
                        || foundFood.id=== check[2]  ? {backgroundColor:"blue"}:{}}>
                            <span>{ idx+1 }:</span> { foundFood.dishName} 
                            
                        </li>

                        }                                    
                    })
                }
            </ul>
      </div>
    )
}

export default Leaderboard;