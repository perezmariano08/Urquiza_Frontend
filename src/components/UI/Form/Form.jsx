import React from 'react'
import { FormButtons, FormStyled } from './FormStyles'

const Form = ({children, buttons, bg, titulo, padding, width}) => {
    return (
        <>
            <FormStyled
                bg={bg}
                padding={padding}
                style={{width: width}}
            >
                {children}
            </FormStyled>
            {
                buttons && <FormButtons>
                    {buttons}
                </FormButtons>
            }
        </>
    )
}

export default Form