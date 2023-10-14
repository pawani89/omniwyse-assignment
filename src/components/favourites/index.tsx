import { Label } from "@progress/kendo-react-labels";
import React, { useEffect, useState } from "react";
import FoodGrid from "../home/foodGrid";
import { initialVal } from "../../constants";
import { FoodgridWrapper, SearchWrapper } from "../../styles";
const Favourites = () => {
    const [msg, setMsg] = useState("");
    const [items, setItem] = useState([{ ...initialVal }])
    useEffect(() => {
        if (localStorage.getItem("fav") === null || JSON.parse(localStorage.getItem("fav") || "")?.length === 0) {
            setMsg("No Favourites")
        } else {
            setMsg("");
            let addedItems = JSON.parse(localStorage.getItem("fav") || "");
            setItem([...addedItems]);
        }

    }, [])
    return (
        <>
            <SearchWrapper>
                <Label>Your Favourites</Label>
            </SearchWrapper>
            <FoodgridWrapper>
                {msg === "" ?
                    (<FoodGrid result={items} loader={false} showFav={false} />)
                    : <div> <Label>{msg}</Label></div>}
            </FoodgridWrapper>
        </>
    )
}
export default Favourites;