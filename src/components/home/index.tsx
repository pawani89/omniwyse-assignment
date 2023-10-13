import React, { useEffect, useState } from 'react';
import { Input, InputChangeEvent } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { FoodItem } from "../../types"
import { initialVal } from '../../constants';
import FoodGrid from './foodGrid';

const Home = () => {
    const [search, setSearch] = useState("")
    const [result, setResult] = useState([{
        ...initialVal
    }])
    const [loader, setLoader] = useState(false);
    // useEffect(() => {
    //     localStorage.removeItem("desc");
    //     localStorage.removeItem("fcid");
    //     localStorage.removeItem("nutrients");
    // }, [])
    const handleSearch = async () => {
        setLoader(true)
        let res: any = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${search}&dataType=&api_key=RPadQrcmvjrGatvVndjccDRXPMn857UoKtXW1qJ3`);
        res = await res.json();
        let foodItems: FoodItem[] = res?.foods;
        setLoader(false)
        setResult([...foodItems])
    }

    return (
        <div>
            <Input onChange={(e: InputChangeEvent) => setSearch(e.value)} placeholder='enter item to search' value={search}></Input>
            <Button onClick={handleSearch}>Search</Button>
            <FoodGrid result={result} loader={loader} showFav={true} />
        </div >
    );
}

export default Home;