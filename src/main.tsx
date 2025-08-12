import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import App from './App.tsx'

import './index.css'
import { setNavigate } from './utils/axiosInstance.ts'

export const NavigationSetter = () => {
  const navigate = useNavigate();
  setNavigate(navigate); // Gán navigate vào biến global
  return null;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <NavigationSetter/>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
