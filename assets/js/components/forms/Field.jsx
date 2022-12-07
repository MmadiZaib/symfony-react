import React from "react";

const Field = ({name, label, value, onChange, placeHolder = "", type = "text", error = ""}
) => {
    return (
        <div className="form-group mb-3">
            <label htmlFor="{name}">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className={"form-control" + (error && " is-invalid")}
                id={name}
                name={name}
                placeholder={placeHolder || label}
            />
            {error && <div className="invalid-feedback">
                {error}
            </div>}
        </div>
    )
}

export default Field;