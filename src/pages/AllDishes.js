import React,{useContext, useEffect,useState} from 'react';
import DishList from '../components/DishList/DishList';
import DishesContext from '../store/dish-store';
import { useNavigate } from 'react-router-dom';
import styles from './AllDishes.module.css';


const AllDishes = () => {

    const [rankedDishes, setRankedDishes] = useState({});
    const [rankedDishList, setrankedDishList] = useState([]);
    const navigate = useNavigate();
    const currentUser = JSON.parse(window.localStorage.getItem('currentUser')) || null;

    const { dishes } = useContext(DishesContext);
    
    useEffect(() => {
        if (!currentUser) {
            alert("please login!!!")
            navigate('/login');
        }

    },[]);

    useEffect(() => {
        setrankedDishList(() => []);
        const temp = [];
        if (rankedDishes['rank1'] && rankedDishes['rank2'] && rankedDishes['rank3']) {
            temp.push(rankedDishes['rank1']);
            temp.push(rankedDishes['rank2']);
            temp.push(rankedDishes['rank3']);
        } 
        setrankedDishList(() => temp);
        
    }, [rankedDishes]);

    const setDishAsRank1 = (dishid) => {
        for (const dish in rankedDishes) {
            if (rankedDishes[dish] === dishid) {
                alert('Same Dish Cannot have two ranks!');
                return;
            }
        }
        setRankedDishes({ ...rankedDishes, rank1: dishid });
    }
    const setDishAsRank2 = (dishid) => {
        for (const dish in rankedDishes) {
            if (rankedDishes[dish] === dishid) {
                alert('Same Dish Cannot have two ranks!');
                return;
            }
        }
        setRankedDishes({ ...rankedDishes, rank2: dishid });
    }
    const setDishAsRank3 = (dishid) => {
        for (const dish in rankedDishes) {
            if (rankedDishes[dish] === dishid) {
                alert('Same Dish Cannot have two ranks!');
                return;
            }
        }
        console.log(`Food with dishid ${dishid} set to rank 3 for current User`);
        setRankedDishes({ ...rankedDishes, rank3: dishid });
    }

    const saveUserRankedDishListHandler = () => {
        try {
            const userDishRankedStore = JSON.parse(window.localStorage.getItem('UserDishRankedStore') || '{}');
            const currentUser = JSON.parse(window.localStorage.getItem('currentUser'));
            userDishRankedStore[currentUser.id]= rankedDishList;
            localStorage.setItem('UserDishRankedStore', JSON.stringify(userDishRankedStore));
        }
        catch (e) {
            console.log('Error in saving the users ranked dishes');
        }
    }


    return (
        <div className={styles.alldishes}>
          
            {currentUser && <DishList
                dishes={dishes}
                setDishAsRank1={setDishAsRank1}
                setDishAsRank2={setDishAsRank2}
                setDishAsRank3={setDishAsRank3}
            />
            }
            <section>
            <ul>
                {
                    currentUser && rankedDishList.map((dishid,idx) => {
                        const foundDish = dishes.find((d) => d.id === dishid);
                        return <li key={idx}>
                            Rank {idx+1} : {foundDish.dishName}
                        </li>
                    })
                }
                </ul>
                <button onClick={saveUserRankedDishListHandler}>Submit Poll</button>
            </section>
            
      </div>
    )
}

export default AllDishes;