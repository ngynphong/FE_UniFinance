"use client"

import { useState, useEffect } from "react"
import { ConfigProvider } from "antd"
import ServiceHero from "../../../components/generic/services/ServiceHero"
import ServiceList from "../../../components/generic/services/ServiceList"
import ServiceProcess from "../../../components/generic/services/ServiceProcess"
import ServicePricing from "../../../components/generic/services/ServicePricing"
import ServiceFAQ from "../../../components/generic/services/ServiceFAQ.JSX"
import ServiceCTA from "../../../components/generic/services/ServiceCTA"

export default function ServicesPage() {
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
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#3b82f6",
          borderRadius: 8,
        },
      }}
    >
      <div className="w-full min-h-screen bg-white">
        <main className="w-full">
          <ServiceHero isVisible={isVisible} scrollToSection={scrollToSection} />
          <ServiceList />
          <ServiceProcess />
          <ServicePricing scrollToSection={scrollToSection} />
          <ServiceFAQ />
          <ServiceCTA scrollToSection={scrollToSection} />
        </main>
      </div>
    </ConfigProvider>
  )
}