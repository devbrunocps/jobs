import React from 'react'

const InputSearch = ({ type, style, icon, placeholder, value, ...rest }) => {
    return (
        <div className='relative flex items-center gap-4'>
            {icon}
            <input value={value} type={type} className={style} placeholder={placeholder} {...rest} />
        </div>
    )
}

export default InputSearch