import { CommandOverlay } from './components/CommandOverlay'
import { Nav } from './components/Nav'
import { PortfolioUIProvider } from './context/PortfolioUIContext'
import { LocaleProvider } from './i18n/LocaleContext'
import { Contact } from './sections/Contact'
import { Education } from './sections/Education'
import { Experience } from './sections/Experience'
import { Hero } from './sections/Hero'
import { Projects } from './sections/Projects'
import { TechStack } from './sections/TechStack'

function App() {
  return (
    <LocaleProvider>
      <PortfolioUIProvider>
        <div className="min-h-screen scroll-smooth">
          <Nav />
          <main>
            <Hero />
            <TechStack />
            <Experience />
            <Education />
            <Projects />
            <Contact />
          </main>
          <CommandOverlay />
        </div>
      </PortfolioUIProvider>
    </LocaleProvider>
  )
}

export default App
