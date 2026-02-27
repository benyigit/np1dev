import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import DocsLayout from './pages/DocsLayout'
import IndexPage from './pages/IndexPage'
import ComponentPage from './pages/ComponentPage'
import './index.css'

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/docs" element={<DocsLayout />}>
              <Route index element={<IndexPage />} />
              <Route path=":id" element={<ComponentPage />} />
            </Route>
          </Routes>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
