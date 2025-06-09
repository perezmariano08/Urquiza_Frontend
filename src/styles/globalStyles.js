import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
    :root {
        --red: #BC0000;
        --blue: #3F51B5;
        --green: #57D163;
        --green-10: #57D16310;
        --white: #fafafa;
        --gray-100: #e9ebed;
        --gray-200: #CACDD2;
        --gray-300: #9FA4A9;
        --gray-400: #73787E;
        --gray-500: #464C52;
        --gray-600: #26282B;
        --gray-700: #1B1D1F;

        /* GrayScale */
        --white-0: #FDFDFD;
        --white-50: #F0F0F0;
        --white-100: #E4E4E4;
        --white-200: #D7D7D7;
        --white-300: #CACACA;
        --white-400: #BDBDBD;
        --white-500: #B0B0B0;
        --white-600: #A4A4A4;
        --white-700: #979797;
        --white-800: #8A8A8A;
        --white-900: #7E7E7E;
        
        --black-0: #71716F;
        --black-50: #656563;
        --black-100: #575757;
        --black-200: #4A4A4A;
        --black-300: #3D3D3D;
        --black-400: #303030;
        --black-500: #242424;
        --black-600: #171717;
        --black-700: #0A0A0A;
        --black-800: #050505;
        --black-900: #000000;

        --teal-50: #EDFAFA;
        --teal-100: #D5F5F6;
        --teal-200: #AFECEF;
        --teal-300: #7EDCE2;
        --teal-400: #16BDCA;
        --teal-500: #0694A2;
        --teal-600: #047481;
        --teal-700: #036672;
        --teal-800: #05505C;
        --teal-900: #014451;

        --padding-sm: 8px 16px;
        --padding-md: 12px 16px;
        --padding: 16px;

        --radius: 10px;

        --text: #1a1a1a;
        --yellow: #FED602;
        --yellow-10: rgba(255, 214, 2, 0.1); /* 10% de opacidad */
        --black: #101010;

        /* 🎨 Colores principales */
        --color-primary: #3F51B5;
        --color-primary-10: rgba(63, 81, 181, 0.1);
        --color-primary-50: rgba(63, 81, 181, 0.5);

        --color-secondary: #FF9800;
        --color-secondary-10: rgba(255, 152, 0, 0.1);
        --color-secondary-50: rgba(255, 152, 0, 0.5);

        --color-success: #4CAF50;
        --color-success-10: rgba(76, 175, 80, 0.1);
        --color-success-50: rgba(76, 175, 80, 0.5);

        --color-warning: #FFC107;
        --color-warning-10: rgba(255, 193, 7, 0.1);
        --color-warning-50: rgba(255, 193, 7, 0.5);

        --color-danger: #F44336;
        --color-danger-10: rgba(244, 67, 54, 0.1);
        --color-danger-50: rgba(244, 67, 54, 0.5);

        --color-info: #00BCD4;
        --color-info-10: rgba(0, 188, 212, 0.1);
        --color-info-50: rgba(0, 188, 212, 0.5);

    }

    html {
        scroll-behavior: smooth;
        height: 100%;
    }

    img {
        user-select: none;
    }

    body {
        background-color: var(--white-50);
        color: var(--teal-900);
        height: 100%;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        text-decoration: none;
        list-style-type: none;
        font-family: 'Rethink Sans', sans-serif;
    }

    /* Autocompletado de los inputs */
    input:-webkit-autofill {
        box-shadow: 0 0 0px 1000px var(--teal-100) inset !important; /* Cambia "white" por tu color */
        transition: background-color 5000s ease-in-out 0s;
    }

    /* Dropdown */
    .p-dropdown-items-wrapper {
        .p-dropdown-items {
            .p-dropdown-item {
                padding: 8px 16px;
                font-weight: 300;
                color: var(--teal-900);
                border: none !important;
                font-size: 14px;

                &.p-highlight {
                    background-color: var(--teal-100);
                    color: var(--teal-900);
                }

                &:hover {
                    border: none;
                }
            }
        }
    }

    /* Toast */
    .p-toast {
        @media (max-width: 968px) {
            top: 80px !important;
            right: 0;
            left: 20px;
        }
        .p-toast-message {
            margin-bottom: 14px;
            
            .p-toast-message-content {
                gap: 14px;
                padding: 14px;
                
                .p-toast-detail {
                    font-weight: 200;
                    margin-top: 4px;
                }
            }

            @media (max-width: 968px) {
                background-color: var(--white);
                max-width: 300px;
                font-size: 14px;
                right: 0;
                left: auto;
            }
        }
    }

`