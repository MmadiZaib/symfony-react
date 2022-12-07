import React from "react";

const Select = ({ name, label, value, error, onChange, children }) => {
    return (
        <div className="form-group mb-3">
            <label htmlFor="{name}">{label}</label>
            <select
                onChange={onChange}
                name="{name}"
                id="{name}"
                className={"form-control" + (error && " is-invalid")}
            >
                {children}
            </select>
            <div className="invalid-feedback">{error}</div>
        </div>
    );
}

export default Select;