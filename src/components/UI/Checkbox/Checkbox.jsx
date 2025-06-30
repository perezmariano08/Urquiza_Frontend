import React from 'react'
import { CheckboxStyled, CheckboxWrapper } from './CheckboxStyles'

const Checkbox = ({name, checked, onChange, label, children, disabled}) => {
    return (
        <CheckboxWrapper>
            <CheckboxStyled
                name={name}
                checked={checked}
                onChange={onChange} 
                type="checkbox"
                disabled={disabled}
            />
            <p>{label}</p>
            {children}
        </CheckboxWrapper>
    )
}

export default Checkbox