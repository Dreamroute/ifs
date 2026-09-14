import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {ConfigProvider} from 'antd'
import {BrowserRouter} from 'react-router-dom'
import 'antd/dist/reset.css'
import './app.css'
import App from './App.tsx'

const root = createRoot(document.getElementById('root')!)
root.render(
    <StrictMode>
        <ConfigProvider theme={{token: {colorPrimary: '#2563eb', borderRadius: 8, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif'}}}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ConfigProvider>
    </StrictMode>,
)
