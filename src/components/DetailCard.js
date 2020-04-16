import React from 'react'

function DetailComp(props) {
    let temp = "contentRecord col-md-"+props.width
    return (
        <div className={temp}>
            <h4>{props.label} <em>{props.value}</em></h4>
            <hr></hr>
        </div>
    )
}

export default DetailComp;