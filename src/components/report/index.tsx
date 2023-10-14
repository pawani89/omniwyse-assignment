import React, { useEffect, useState } from "react";
import { Nutrients } from "../../types";
import { GridLayout, GridLayoutItem } from "@progress/kendo-react-layout";
import { foodNutrients } from "../../constants";
import { Label } from "@progress/kendo-react-labels";
import { useParams } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardBody,
} from "@progress/kendo-react-layout";
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
                <div style={{
                    marginLeft: "40%"
                }}>

                    <Card
                        style={{
                            width: 260,
                            boxShadow: "0 0 4px 0 rgba(0, 0, 0, .1)",
                            marginTop: "10px",
                        }}
                    >
                        <CardHeader><Label>{desc}({fcid})</Label></CardHeader>
                        <CardBody>
                            {
                                items.map((i, ind) => {
                                    return (

                                        <div className="k-text-inverse k-text-uppercase k-font-weight-bold">
                                            {i.nutrientName}:{i.value}{i.unitName}
                                        </div>

                                    )
                                })
                            }
                        </CardBody>
                    </Card>
                </div>
            )}
        </>

    )
}

export default Report;