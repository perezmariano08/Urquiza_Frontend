import React from 'react'
import { DialogStyled } from './DialogStyles'

const Dialog = ({children,header, visible, modal, onHide}) => {
    return (
        <DialogStyled
            header={header}
            visible={visible} 
            modal={modal} 
            onHide={onHide}
        >
            {children}
        </DialogStyled>
    )
}

export default Dialog