import { Layout } from "antd"
import { useEffect, useState } from "react"
import HeroSection from "../../components/home/HeroSection"
import StatsSection from "../../components/home/StatsSection"
import ServicesSection from "../../components/home/ServicesSection"
import PremiumSection from "../../components/home/PrimeumSection"
import AboutSection from "../../components/home/AboutSection"
import TestimonialsSection from "../../components/home/TestimonialsSection"
import ContactSection from "../../components/home/ContactSection"

const { Content } = Layout

function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <Content className="pt-16">
      <HeroSection isVisible={isVisible} scrollToSection={scrollToSection} />
      <StatsSection />
      <ServicesSection />
      <PremiumSection scrollToSection={scrollToSection} />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
    </Content>
  )
}

export default HomePage
