import React from 'react'

function DetailComp(props) {
    let temp = "contentRecord col-md-"+props.width
    return (
        <div className={temp}>
            <h6>{props.label} <em>{props.value}</em></h6>
            <hr></hr>
        </div>
    )
}

export default DetailComp;