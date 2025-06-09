import React from 'react'
import { InputTextareaStyled } from './InputTextareaStyles';

const InputTextarea = ({style, rows, cols, inputMode, onBlur, name, value, onChange, placeholder, required, error, disabled, type, keyfilter, validateOnly, onInput, min, max}) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' , width: '100%'}}>
            <InputTextareaStyled
                inputMode={inputMode}
                onBlur={onBlur}
                required={required}
                name={name} 
                value={value}
                onChange={onChange}
                disabled={disabled}
                placeholder={placeholder}
                className={error ? 'p-invalid' : ''}
                type={type}
                keyfilter={keyfilter}
                validateOnly={validateOnly}
                onInput={onInput}
                min={min}
                max={max}
                rows={rows}
                cols={cols}
                style={style}

            />
            {error && <span style={{ color: 'red', fontSize: '12px' , fontWeight: '200'}}>{error}</span>}
        </div>
    );
};


export default InputTextarea