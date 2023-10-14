import { Button } from "@progress/kendo-react-buttons";
import { GridLayout, GridLayoutItem } from "@progress/kendo-react-layout";
import React, { useEffect, useRef, useState } from "react";
import { FoodItem, Nutrients } from "../../types";
import { useNavigate } from "react-router-dom";
import { initialVal } from "../../constants";
import {
    Card,
    CardBody,
    CardActions,
} from "@progress/kendo-react-layout";
interface FoodGridInterface {
    loader: boolean,
    result: FoodItem[],
    showFav: boolean
}

const FoodGrid = (props: FoodGridInterface) => {
    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 620;
    const rowRef = useRef(1);
    const colRef = useRef(1);
    const navigate = useNavigate();
    const { loader, result, showFav } = props;
    const [fav, setFav] = useState([{ ...initialVal }])

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        }
    }, []);

    useEffect(() => {
        setFav([...result]);
    }, [result])


    const handleItemClick = (item: Nutrients[], id: number, description: string) => {
        localStorage.setItem("nutrients", JSON.stringify(item));
        localStorage.setItem("fcid", id.toString());
        localStorage.setItem("desc", description);
        navigate(`/${id}`);
    }

    const addToFav = (item: FoodItem) => {
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

    const setCol = () => {
        let x = width < breakpoint ? 1 : 2
        if (colRef.current <= x) {
            colRef.current = colRef.current + 1;
        } else {
            colRef.current = 1;
            rowRef.current = rowRef.current + 1
        }
        console.log("a row: ", rowRef.current, "col", colRef.current)
        return <></>;
    }

    return (

        <GridLayout
            gap={{ cols: 2 }}
        >
            {loader ? <div>Loading.....</div> : (<>
                {fav?.[0]?.fdcId !== 0 ? (<>
                    {fav.map((item, ind) => {
                        return (

                            <GridLayoutItem row={rowRef.current} col={colRef.current} >
                                {setCol()}
                                <Card
                                    style={{
                                        width: 300,
                                        height: 200,
                                        boxShadow: "0 0 4px 0 rgba(0, 0, 0, .1)",
                                        marginTop: "10px",
                                    }}
                                >
                                    <CardBody>
                                        <div className="k-text-inverse k-text-uppercase k-font-weight-bold">
                                            FDCID: {item.fdcId}
                                        </div>
                                        <div className="k-text-inverse k-text-uppercase k-font-weight-bold">
                                            Food Code: {item.foodCode}
                                        </div>
                                        <div className="k-text-inverse k-text-uppercase k-font-weight-bold">
                                            Brandowner: {item.brandOwner}
                                        </div>

                                    </CardBody>
                                    <CardActions
                                        style={{ display: "flex", justifyContent: "space-between" }}
                                    >
                                        <Button onClick={() => handleItemClick(item.foodNutrients, item.fdcId, item.description)}>View More</Button>
                                        <Button hidden={!showFav} onClick={() => addToFav(item)}>Add item to Favourite</Button>
                                        <Button hidden={showFav} onClick={() => removeFromFav(item.fdcId)}>Remove Item From Favourites</Button>
                                    </CardActions>
                                </Card>
                            </GridLayoutItem>


                        )
                    })}
                </>) : null}
            </>)
            }
        </GridLayout >
    )
}

export default FoodGrid;