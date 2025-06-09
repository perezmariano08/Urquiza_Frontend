import React from 'react'
import { PasswordStyled } from './PasswordStyles';

const Password = ({name, feedback, value, onChange, toggleMask, error, placeholder}) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%'}}>
            <PasswordStyled
                name={name}
                value={value} 
                onChange={onChange} 
                feedback={feedback}
                toggleMask={toggleMask}
                placeholder={placeholder}
                invalid={error}
            />
            {error && <span style={{ color: 'red', fontSize: '12px' , fontWeight: '200'}}>{error}</span>}
        </div>
    );
};


export default Password