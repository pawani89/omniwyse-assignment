import { Button } from "@progress/kendo-react-buttons";
import { GridLayout, GridLayoutItem } from "@progress/kendo-react-layout";
import React, { useEffect, useRef, useState } from "react";
import { FoodItem, Nutrients } from "../../types";
import { useNavigate } from "react-router-dom";
import { initialVal } from "../../constants";
import {
    commentIcon,
    heartIcon,
    heartOutlineIcon,
} from "@progress/kendo-svg-icons";
import {
    Card,
    CardBody,
    CardActions,
    Avatar,
} from "@progress/kendo-react-layout";
import { SvgIcon } from "@progress/kendo-react-common";
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
    const colSizeRef = useRef([{ width: 0 }]);
    rowRef.current = 0;
    colRef.current = 0;
    colSizeRef.current = [{ width: 0 }]
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

    const addToFav = (item: FoodItem, id: number) => {
        let newFavList = [];
        let x = fav.map((d) => {
            if (d.fdcId === id) {
                return {
                    ...d,
                    fav: true
                }
            }
            return {
                ...d
            }
        })
        console.log('aaka: ', x)
        setFav([...x]);
        if (localStorage.getItem("fav") !== null) {
            let addedItems = JSON.parse(localStorage.getItem("fav") || "");

            newFavList = [...addedItems, { ...item, fav: true }];
        } else {
            newFavList = [{ ...item, fav: true }]

        }
        localStorage.setItem("fav", JSON.stringify(newFavList));

    }

    const removeFromFav = (id: number) => {
        let x = fav.map((d) => {
            if (d.fdcId === id) {
                return {
                    ...d,
                    fav: false
                }
            }
            return {
                ...d
            }
        })
        setFav([...x]);
        if (localStorage.getItem("fav") !== null) {
            let newFavList = []
            let addedItems = JSON.parse(localStorage.getItem("fav") || "");

            newFavList = addedItems.filter((d: FoodItem) => d.fdcId !== id);
            newFavList = newFavList.map((d: FoodItem) => {
                if (d.fdcId === id) {
                    return {
                        ...d,
                        fav: false
                    }
                }
                return {
                    ...d
                }
            })
            // console.log('akansha :', newFavList)
            localStorage.setItem("fav", JSON.stringify(newFavList));
            if (!showFav) {
                setFav([...newFavList]);
            }

        }
    }

    const setCol = (ind: number) => {
        if (width < breakpoint) {
            colRef.current = 0;
            rowRef.current = ind;
            colSizeRef.current = [{ width: 300 }]
        } else {
            colSizeRef.current = [{ width: 300 }, { width: 300 }, { width: 300 }, { width: 300 }];
            if ((ind & 3) === 0) {
                rowRef.current = rowRef.current + 1
                colRef.current = 1;


            } else {
                colRef.current = colRef.current + 1;


            }


        }
        return <></>;
    }

    return (

        <GridLayout
            gap={{ cols: 2 }}
            cols={colSizeRef.current}

        // style={{ margin: "0 auto" }}
        >
            {loader ? <div>Loading.....</div> : (<>
                {fav?.[0]?.fdcId !== 0 ? (<>
                    {fav.map((item, ind) => {
                        setCol(ind)
                        return (
                            // row={rowRef.current} col={colRef.current}
                            <GridLayoutItem row={rowRef.current} col={colRef.current} >

                                <Card
                                    className
                                    style={{
                                        width: 300,
                                        height: 200,
                                        boxShadow: "0 0 4px 0 rgba(0, 0, 0, .1)",
                                        marginTop: "10px",
                                    }}
                                    orientation="vertical"
                                >
                                    <Avatar type="image" size="medium">
                                        <img
                                            style={{ width: 45, height: 45 }}
                                            alt="KendoReact Card Thumbnail"
                                            src={"https://www.telerik.com/kendo-angular-ui-develop/components/layout/card/assets/rila_lakes.jpg"}
                                        />
                                    </Avatar>
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
                                        <span onClick={() => handleItemClick(item.foodNutrients, item.fdcId, item.description)} className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-primary">View More</span>
                                        {/* <Button ></Button> */}
                                        {item.fav ? (
                                            <Button onClick={() => removeFromFav(item.fdcId)}> <SvgIcon icon={heartIcon} /></Button>
                                        ) : (
                                            <Button onClick={() => addToFav(item, item.fdcId)}><SvgIcon icon={heartOutlineIcon} /></Button>
                                        )}
                                        {/* <Button hidden={showFav} onClick={() => removeFromFav(item.fdcId)}>Remove Favourites</Button> */}
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