"use client"

import { Row, Col, Statistic } from "antd"
import { statsData } from "../../data/statsData"


const StatsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <Row gutter={[32, 32]}>
          {statsData.map((stat, index) => (
            <Col xs={12} md={6} key={index}>
              <div className="text-center transform hover:scale-105 transition-transform duration-300">
                <Statistic
                  title={<span className="text-gray-600 text-lg">{stat.title}</span>}
                  value={stat.value}
                  suffix={stat.suffix}
                  valueStyle={{
                    color: "#1890ff",
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                  }}
                />
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  )
}

export default StatsSection
