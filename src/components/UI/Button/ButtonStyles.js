import { motion } from "framer-motion";
import styled from "styled-components";

export const ButtonWrapper = styled(motion.button)`
    border: none;
    display: flex;
    gap: 6px;
    align-items: center;
    justify-content: center;
    background: ${({ background }) => `var(--${background})`};
    width: ${({ width }) => `${width}`};
    color: ${({ color }) => `var(--${color})`};
    padding: 8px 16px;
    border-radius: 10px;
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
    cursor: pointer;
    transition: .2s ease-in-out;
    user-select: none;
    
    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
        &:hover {
            opacity: 0.4;
        }
    }

    @media (max-width: 768px) {
        cursor: none;
        font-size: 12px;
    }

    @media (min-width: 768px) {
        &:hover {
            opacity: .85; 
        }
    }
`