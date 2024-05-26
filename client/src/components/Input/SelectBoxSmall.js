import axios from "axios";
import capitalize from "capitalize-the-first-letter";
import React, { useState, useEffect } from "react";
import InformationCircleIcon from "@heroicons/react/24/outline/InformationCircleIcon";
import { useDispatch } from "react-redux";

function SelectBoxSmall(props) {
    const { options } = props;
    const dispatch = useDispatch();
    return (
        <div className={`inline-block`}>
            <select
                className={`input select-bordered ${props.class}`}
                onChange={props.onChange}
            >
                {options.map((o, k) => {
                    return (
                        <option value={o} key={k}>
                            {o}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}

export default SelectBoxSmall;
