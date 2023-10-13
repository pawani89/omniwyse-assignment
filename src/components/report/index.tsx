import React, { useEffect, useState } from "react";
import { Nutrients } from "../../types";
import { GridLayout, GridLayoutItem } from "@progress/kendo-react-layout";
import { foodNutrients } from "../../constants";
import { Label } from "@progress/kendo-react-labels";
import { useParams } from "react-router-dom";

const Report = () => {
    const [items, setItem] = useState([{ ...foodNutrients }])
    const [desc, setDesc] = useState("");
    const [fcid, setFcid] = useState("")
    const [err, setErr] = useState("")
    const { id } = useParams()
    useEffect(() => {
        var item: Nutrients[] = JSON.parse(localStorage.getItem("nutrients") || "");
        let des = localStorage.getItem("desc") || "";
        let fcid = localStorage.getItem("fcid") || "";
        if (id?.toString() !== fcid) {
            setErr("Please come from home page!");
        } else {
            setFcid(fcid);
            setDesc(des);
            setItem([...item]);
        }


    }, [])
    return (
        <>
            {err !== "" ? (<div>{err}</div>) : (
                <div className="grid-layout-container">
                    <Label>{desc}({fcid})</Label>
                    <GridLayout
                        gap={{ rows: 6, cols: 10 }}
                    >
                        {
                            items.map((i, ind) => {
                                return (
                                    <GridLayoutItem row={ind} col={5} colSpan={3}>
                                        <div className="k-text-inverse k-text-uppercase k-font-weight-bold">
                                            {i.nutrientName}:{i.value}{i.unitName}
                                        </div>
                                    </GridLayoutItem>
                                )
                            })
                        }
                    </GridLayout>
                </div>
            )}
        </>

    )
}

export default Report;