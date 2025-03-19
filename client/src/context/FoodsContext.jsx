import { createContext, useState, useEffect } from "react";

const FoodsContext = createContext({})


const FoodsProvider = ({ children }) => {

        const [foods, setFoods] = useState([])

        //Getting Food For Menu
        useEffect(() => {
            fetch("/api/foods")
            .then((response) => response.json())
            .then((data) => setFoods(data))
        }, [])

        return <FoodsContext.Provider value={{foods}}>{children}</FoodsContext.Provider>
}
export { FoodsContext, FoodsProvider }