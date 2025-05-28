
import { useEffect, useState } from "react"

export default function UseScrollSPy(sectionIds = [], offset = 100) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || "")

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset

      sectionIds.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          const offsetTop = element.offsetTop
          const height = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(id)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sectionIds, offset])

  return activeSection
}
