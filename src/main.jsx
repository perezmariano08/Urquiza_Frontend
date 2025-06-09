import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { GlobalStyles } from './styles/globalStyles.js'

import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.js'
import { PersistGate } from "redux-persist/integration/react"
import { ToastProvider } from './context/ToastContext.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <ToastProvider>
                    <App />
                    <GlobalStyles/>
                </ToastProvider>
            </PersistGate>
        </Provider> 
    </StrictMode>,
)
