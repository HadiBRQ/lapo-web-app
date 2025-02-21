import React from 'react';
import { Link } from 'react-router-dom';
import * as moment from "moment";
import { size, map } from "lodash";


const formateDate = (date, format) => {
    const dateFormat = format ? format : "DD MMM Y";
    const date1 = moment(new Date(date)).format(dateFormat);
    return date1;
};
const toLowerCase1 = str => {
    return (
        str === "" || str === undefined ? "" : str.toLowerCase()
    );
};

const Name1 = (cell) => {
    return cell.value ? cell.value : '';
};

const Email1 = (cell) => {
    return cell.value ? cell.value : '';
};

const Phone1 = (cell) => {
    return cell.value ? cell.value : '';
};

const Tags1 = ({ value }) => {
    // Determine the badge class based on the value
    const badgeClass = value === "No Subscription Plan" ? 'badge-soft-danger' : 'badge-soft-secondary';
  
    return (
      <span className={`badge ${badgeClass} font-size-11 m-1`}>
        {value}
      </span>
    );
  };

const Projects1 = (cell) => {
    return cell.value ? cell.value : '';
};

const Img1 = (cell) => {
    return (
        <>
            {!cell.value ? (
                <div className="avatar-xs">
                    <span className="avatar-title rounded-circle">
                        {cell.data[0].name.charAt(0)}
                    </span>
                </div>
            ) : (
                <div>
                    <img
                        className="rounded-circle avatar-xs"
                        src={cell.value}
                        alt=""
                    />
                </div>
            )}
        </>
    );
};

export {
    Name1,
    Email1,
    Tags1,
    Projects1,
    Img1,
    Phone1
};