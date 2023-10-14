import React, { useEffect, useRef, useState } from 'react';
import { Input, InputChangeEvent } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { FoodItem } from "../../types"
import { initialVal } from '../../constants';
import FoodGrid from './foodGrid';
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "@progress/kendo-react-indicators";
import { SearchWrapper, FoodgridWrapper } from '../../styles';
const Home = () => {
    const [search, setSearch] = useState("")
    const [result, setResult] = useState([{
        ...initialVal
    }])
    const [loader, setLoader] = useState(false);
    const ref = useRef(1);

    useEffect(() => { getResult() }, []);

    const getResult = async () => {
        let res: any = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${search}&dataType=&api_key=RPadQrcmvjrGatvVndjccDRXPMn857UoKtXW1qJ3&pageNumber=${ref.current}`);
        res = await res.json();
        let foodItems: FoodItem[] = res?.foods;
        setResult([...foodItems])
    }
    const fetchMoreData = () => {
        ref.current = ref.current + 1;
        setTimeout(() => {
            getResult();
        }, 1500);
    };

    const handleSearch = async () => {
        setLoader(true);
        getResult();
        setLoader(false);
    };

    return (
        <>
            {/* style={{ margin: "5% 10%" }} */}
            <SearchWrapper >
                <Input style={{ width: "200px" }} onChange={(e: InputChangeEvent) => setSearch(e.value)} placeholder='enter item to search' value={search}></Input>
                <Button onClick={handleSearch}>Search</Button>
            </SearchWrapper>
            {/* style={{ margin: "5% 10%" }} */}
            <FoodgridWrapper style={{ margin: "5% 10%" }}>
                <InfiniteScroll
                    dataLength={ref.current * 10}
                    next={() => fetchMoreData()}
                    hasMore={true}
                    loader={<div style={{ margin: "2% 40%" }}><Loader size="large" type="pulsing" /></div>}
                    endMessage={"reached end"}

                >
                    <FoodGrid result={result} loader={loader} showFav={true} />
                </InfiniteScroll >
            </FoodgridWrapper>
        </>
    );
}

export default Home;