import React from 'react'
import styles from './Dish.module.css';

const Dish = (props) => {

    return (
        <li className={styles.dish}>
            <img src={props.image} alt={ props.dishName }/>
            <h3>{props.dishName}</h3>
            <p>{props.description}</p>
            <div className={styles['poll-btn']}>
                <label htmlFor='rank1'>Rank 1</label>
                <input onChange={() => props.setDishAsRank1(props.id)} checked={props.rankedDishes['rank1']===props.id || false} type="radio" id="rank1" name={props.dishName} value="rank1"/>
                <label htmlFor='rank2'>Rank 2</label>
                <input onChange={() => props.setDishAsRank2(props.id)} checked={props.rankedDishes['rank2']===props.id || false} type="radio" id="rank2" name={props.dishName} value="rank2"/>
                <label htmlFor='rank3'>Rank 3</label>
                <input onChange={() => props.setDishAsRank3(props.id)} checked={props.rankedDishes['rank3']===props.id || false} type="radio" id="rank3" name={props.dishName} value="rank3"/>
            </div>
      </li>
    )
}

export default Dish