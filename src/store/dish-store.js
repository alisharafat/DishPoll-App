import React, { createContext, useEffect, useState } from 'react';

const DishesContext = createContext({
    dishes: [],
});

export const DishStoreContextProvider = (props) => {

    const [dishes, setDishes] = useState([]);


    useEffect(() => {
        async function getAllDishes() {
            try {
                const res = await fetch('https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json');
                const data = await res.json();
                setDishes(data); 
            }
            catch (e) {
                console.log('Error fetching the dishes!');
            }
          
        }
        getAllDishes();
    }, []);

    const ctx = {
        dishes,
    }

    return (
        <DishesContext.Provider value={ctx}>
            {props.children}
            {/* {console.log(props.children)} */}
      </DishesContext.Provider>
    )
}

export default DishesContext;