import React from 'react'
import Dish from '../Dish/Dish';
import styles from './DishList.module.css';

const DishList = (props) => {
  return (
      <ul className={styles.dishlist}>
          {
              props.dishes.map((dish) => {
                  return <Dish
                      key={dish.id}
                      id={dish.id}
                      dishName={dish.dishName}
                      description={dish.description}
                      image={dish.image}
                      setDishAsRank1={props.setDishAsRank1}
                      setDishAsRank2={props.setDishAsRank2}
                      setDishAsRank3={props.setDishAsRank3}
                  />
              })
          }
      </ul>
  )
}

export default DishList;