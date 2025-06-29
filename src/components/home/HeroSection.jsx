"use client"

import { Row, Col, Button } from "antd"
import { ArrowRight, TrendingUp, BarChart3, DollarSign, Target, Zap } from "lucide-react"
import { useEffect, useState } from "react"

const HeroSection = ({ isVisible, scrollToSection }) => {
  const [currentStat, setCurrentStat] = useState(0)
  const [animatedNumbers, setAnimatedNumbers] = useState({
    clients: 0,
    experience: 0,
    success: 0,
  })

  const stats = [
    { label: "Khách hàng tin tưởng", value: 6, suffix: "+" },
    { label: "Ra mắt tính năng", value:  5, suffix: "+" },
    { label: "Tỷ lệ thành công", value: 85, suffix: "%" },
  ]

  const floatingElements = [
    { icon: DollarSign, color: "text-green-500", delay: 0 },
    { icon: TrendingUp, color: "text-blue-500", delay: 1 },
    { icon: Target, color: "text-purple-500", delay: 2 },
    { icon: Zap, color: "text-yellow-500", delay: 3 },
  ]

  // Animated counter effect
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        const animateNumber = (target, key) => {
          let current = 0
          const increment = target / 50
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              current = target
              clearInterval(timer)
            }
            setAnimatedNumbers((prev) => ({ ...prev, [key]: Math.floor(current) }))
          }, 30)
        }

        animateNumber(6, "clients")
        animateNumber(5, "experience")
        animateNumber(85, "success")
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [isVisible])

  // Cycling stats display
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="home"
      className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 overflow-hidden w-full"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 rounded-full animate-float-slow"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200/30 rounded-full animate-float-medium"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-green-200/30 rounded-full animate-float-fast"></div>

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse-slower"></div>

        {/* Animated lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path d="M0,100 Q150,50 300,80 T600,60 L600,0 L0,0 Z" fill="url(#lineGradient)" className="animate-wave" />
        </svg>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="">
          <Row gutter={[48, 48]} align="middle">
            {/* Content */}
            <Col xs={24} lg={12}>
              <div
                className={`transform transition-all duration-1000 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
                }`}
              >
                {/* Animated badge */}
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm font-medium mb-6 animate-bounce-subtle">
                  <Zap className="w-4 h-4 mr-2" />
                  <span>Lựa chọn tin cậy cho quản lý tài chính cá nhân</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                  <span className="inline-block animate-slide-up">Giải pháp tài chính cá nhân </span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 animate-gradient-text">
                   sinh viên
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed animate-fade-in-delayed">
                  Đồng hành cùng bạn trên hành trình tài chính an toàn và bền vững
                </p>

                {/* Animated stats */}
                <div className="flex items-center space-x-4 md:space-x-8 mb-8">
                  <div className="text-center animate-scale-in">
                    <div className="text-2xl md:text-3xl font-bold text-blue-600">{animatedNumbers.clients}+</div>
                    <div className="text-xs md:text-sm text-gray-500">Khách hàng</div>
                  </div>
                  <div className="text-center animate-scale-in" style={{ animationDelay: "0.2s" }}>
                    <div className="text-2xl md:text-3xl font-bold text-purple-600">{animatedNumbers.experience}+</div>
                    <div className="text-xs md:text-sm text-gray-500">Ra mắt tính năng</div>
                  </div>
                  <div className="text-center animate-scale-in" style={{ animationDelay: "0.4s" }}>
                    <div className="text-2xl md:text-3xl font-bold text-green-600">{animatedNumbers.success}%</div>
                    <div className="text-xs md:text-sm text-gray-500">Duy trì sử dụng</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="primary"
                    size="large"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-none h-12 md:h-14 px-6 md:px-8 text-base md:text-lg font-semibold animate-pulse-button"
                    onClick={() => scrollToSection("contact")}
                  >
                    <span>Bắt đầu ngay</span>
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 animate-arrow-move" />
                  </Button>
                  <Button
                    size="large"
                    className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 animate-border-glow"
                    onClick={() => scrollToSection("services")}
                  >
                    Tìm hiểu thêm
                  </Button>
                </div>
              </div>
            </Col>

            {/* Visual */}
            <Col xs={24} lg={12}>
              <div
                className={`transform transition-all duration-1000 delay-300 ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                }`}
              >
                <div className="relative">
                  {/* Main chart container */}
                  <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-8 transform hover:scale-105 transition-all duration-500 animate-float-gentle">
                    <div className="relative">
                      <BarChart3 className="w-full h-48 md:h-64 text-blue-600 animate-chart-draw" />

                      {/* Animated data points */}
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-bold animate-bounce">
                        +24%
                      </div>
                      <div className="absolute bottom-8 left-4 md:left-8 bg-blue-500 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-bold animate-pulse">
                        ROI
                      </div>
                    </div>
                  </div>

                  {/* Floating icons around the chart - Hidden on mobile */}
                  <div className="hidden lg:block">
                    {floatingElements.map((element, index) => {
                      const Icon = element.icon
                      return (
                        <div
                          key={index}
                          className={`absolute w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center animate-orbit-${index + 1}`}
                          style={{
                            top: `${20 + index * 15}%`,
                            left: `${-10 + index * 5}%`,
                            animationDelay: `${element.delay}s`,
                          }}
                        >
                          <Icon className={`w-6 h-6 ${element.color}`} />
                        </div>
                      )
                    })}
                  </div>

                  {/* Success indicator */}
                  <div className="absolute -top-4 md:-top-6 -left-4 md:-left-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-3 md:p-4 rounded-full animate-success-pulse">
                    <TrendingUp className="w-6 h-6 md:w-8 md:h-8" />
                  </div>

                  {/* Floating stats card */}
                  <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 md:p-4 rounded-2xl shadow-xl animate-stats-float">
                    <div className="text-center">
                      <div className="text-lg md:text-2xl font-bold">
                        {stats[currentStat].value}
                        {stats[currentStat].suffix}
                      </div>
                      <div className="text-xs opacity-90">{stats[currentStat].label}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-scroll-indicator">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-scroll-dot"></div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-2">Cuộn xuống</div>
      </div>
    </section>
  )
}

export default HeroSection
