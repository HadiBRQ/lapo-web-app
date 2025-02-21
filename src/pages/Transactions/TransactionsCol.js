import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'reactstrap';
import moment from 'moment';

const formatDate = (date, format) => {
    const dateFormat = format || "DD MMM YYYY";
    return moment(new Date(date)).format(dateFormat);
};

const OrderId = ({ value }) => (
    <Link to="#" className="text-body fw-bold">{value || ''}</Link>
);

const BillingName = ({ value }) => value || '';

const BillingDetails = ({ value }) => (
    <span>{value || 'N/A'}</span> // Display billing details or a default message
);

const FormattedDate = ({ value }) => (
    <span>{formatDate(value)}</span>
);

const Total = ({ value }) => value || '';

const PaymentStatus = ({ value }) => (
    <Badge
        className={"font-size-12 badge-soft-" +
            (value === "Paid" ? "success" : value === "Refund" ? "warning" : "danger")}
    >
        {value}
    </Badge>
);

const PaymentMethod = ({ value }) => (
    <span>
        <i
            className={
                (value === "Paypal" ? "fab fa-cc-paypal me-1" :
                    value === "COD" ? "fas fa-money-bill-alt me-1" :
                    value === "Mastercard" ? "fab fa-cc-mastercard me-1" :
                    value === "Visa" ? "fab fa-cc-visa me-1" : "")
            }
        />{" "}
        {value}
    </span>
);

export {
    OrderId,
    BillingName,
    BillingDetails,
    FormattedDate,
    Total,
    PaymentStatus,
    PaymentMethod
};
