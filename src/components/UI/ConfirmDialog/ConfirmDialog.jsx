import React from 'react'
import { ConfirmDialogStyled } from './ConfirmDialogStyles'
import { AiOutlineExclamationCircle } from "react-icons/ai";

const ConfirmDialog = ({group, visible, onHide, message, header, icon, accept, reject, style, breakpoints}) => {
    return (
        <ConfirmDialogStyled
            group={group}
            visible={visible}
            onHide={onHide}
            message={message}
            header={header}
            icon={<AiOutlineExclamationCircle />}
            accept={accept}
            reject={reject}
            style={style}
            breakpoints={breakpoints}
            acceptLabel= 'Sí'
            rejectLabel= 'No'
        />
    )
}

export default ConfirmDialog