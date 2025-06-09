import React from 'react'
import { InputTextWrapperStyled } from './InputTextStyles'

const InputTextWrapper = ({children, label, width, full}) => {
    return (
        <InputTextWrapperStyled
            style={{width: width}}
            full={full}
        >
            <p>{label}</p>
            {children}
        </InputTextWrapperStyled>
    )
}

export default InputTextWrapper