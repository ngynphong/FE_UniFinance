

import { useEffect, useState } from "react"

export default function ParallaxSection({ children, speed = 0.5 }) {
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.pageYOffset)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      style={{
        transform: `translateY(${offsetY * speed}px)`,
      }}
      className="transition-transform duration-75"
    >
      {children}
    </div>
  )
}
