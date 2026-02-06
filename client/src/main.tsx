import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './styles/theme.css'
import './styles/animations.css'
import './styles/global.css'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { DayPage } from './pages/DayPage'
import { FeedbackPage } from './pages/FeedbackPage'
import { AdminLoginPage } from './pages/AdminLoginPage'
import { AdminMemoriesPage } from './pages/AdminMemoriesPage'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/day/:slug" element={<DayPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/memories" element={<AdminMemoriesPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>,
)

