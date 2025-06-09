import React from 'react'
import { ButtonWrapper } from './ButtonStyles'

const Button = ({
        children,
        background = 'teal-900',
        color = 'white-0',
        disabled,
        onClick,
        type,
        width = "fit-content" ,
        style      
    }) => {
    return (
        <ButtonWrapper 
            onClick={onClick}
            whileTap={{scale: .95}}
            background={background}
            disabled={disabled}
            type={type}
            width={width}
            color={color}
            style={style}
        >{children}</ButtonWrapper>
    )
}

export default Button