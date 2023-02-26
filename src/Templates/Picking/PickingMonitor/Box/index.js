import React from "react";
import { useBox } from "../../../../Context/box-context";
import { usePicking } from "../../../../Context/picking-context";
import { deleteBox } from "../../../../ServicesConsumers/box";
import "./Box.css"

export const Box = (props) => {

    const {
        setBoxSelected,
        boxSelected,
        setListBoxes,
        setLoadGetBoxes
    } = useBox();

    const {
        pickingSelected
    } = usePicking();

    let className = "box-item";
    if (boxSelected === props.id) {
        className += "-selected";
    }

    return (
        <div className={className} onClick={()=>{
            setBoxSelected(props.id);
        }}>
            <span>{props.id}</span>
            <span>{props.gross_weight}</span>
            <span>{props.responsible}</span>
            <span>{props.dimension}</span>
            <span>{props.last_modification}</span>
            <span><i className='bx bx-trash' onClick={(event)=>{
                event.stopPropagation();
                deleteBox(props.id, setListBoxes, setLoadGetBoxes, pickingSelected, setBoxSelected);
            }}></i></span>
        </div>
    );
}