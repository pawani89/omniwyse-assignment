import { Button } from "@progress/kendo-react-buttons";
import { GridLayout, GridLayoutItem } from "@progress/kendo-react-layout";
import React, { useEffect, useState } from "react";
import { FoodItem, Nutrients } from "../../types";
import { useNavigate } from "react-router-dom";
import { initialVal } from "../../constants";

interface FoodGridInterface {
    loader: boolean,
    result: FoodItem[],
    showFav: boolean
}

const FoodGrid = (props: FoodGridInterface) => {
    const { loader, result, showFav } = props;
    const [fav, setFav] = useState([{ ...initialVal }])
    useEffect(() => {
        setFav([...result]);
    }, [result])
    const navigate = useNavigate();

    const handleItemClick = (item: Nutrients[], id: number, description: string) => {
        localStorage.setItem("nutrients", JSON.stringify(item));
        localStorage.setItem("fcid", id.toString());
        localStorage.setItem("desc", description);
        navigate(`/${id}`);
    }
    const addToFav = (item: FoodItem) => {
        console.log('akaka: ', item)
        let newFavList = [];
        if (localStorage.getItem("fav") !== null) {
            let addedItems = JSON.parse(localStorage.getItem("fav") || "");

            newFavList = [...addedItems, { ...item }];
        } else {
            newFavList = [item]

        }
        localStorage.setItem("fav", JSON.stringify(newFavList));

    }

    const removeFromFav = (id: number) => {

        if (localStorage.getItem("fav") !== null) {
            let newFavList = []
            let addedItems = JSON.parse(localStorage.getItem("fav") || "");

            newFavList = addedItems.filter((d: FoodItem) => d.fdcId !== id);
            localStorage.setItem("fav", JSON.stringify(newFavList));
            setFav([...newFavList]);

        }
    }
    return (
        <div className="grid-layout-container">
            {
                loader ? <div>Loading.....</div> : (<>
                    {fav?.[0]?.fdcId !== 0 ? (<>
                        <GridLayout
                            gap={{ rows: 6, cols: 10 }}

                        >
                            {fav.map((item, ind) => {
                                return (
                                    <><Button onClick={() => handleItemClick(item.foodNutrients, item.fdcId, item.description)}>
                                        <GridLayoutItem row={ind} col={1} colSpan={3}>
                                            <div className="k-text-inverse k-text-uppercase k-font-weight-bold">
                                                {item.brandOwner}
                                            </div>
                                            <div className="k-text-inverse k-text-uppercase k-font-weight-bold">
                                                {item.description}
                                            </div>
                                        </GridLayoutItem>
                                    </Button>

                                        <Button hidden={!showFav} onClick={() => addToFav(item)}>Add item to Favourite</Button>
                                        <Button hidden={showFav} onClick={() => removeFromFav(item.fdcId)}>Remove Item From Favourites</Button>
                                    </>
                                )
                            })}


                        </GridLayout>
                    </>) : null}
                </>)
            }
        </div>
    )
}

export default FoodGrid;