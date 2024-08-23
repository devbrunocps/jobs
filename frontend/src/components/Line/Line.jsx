import React from 'react'

const Line = ({ width, height, style }) => {
    return (
        <div className={`${width} ${height} ${style}`}></div>
    )
}

export default Line