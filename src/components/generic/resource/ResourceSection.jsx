import { Row, Col } from "antd"
import ResourceCard from "./ResourceCard"
import { resourcesData } from "../../../data/resourceData"

const ResourcesSection = () => {
  return (
    <section id="resources" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Tài nguyên hữu ích</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Khám phá các tài liệu và công cụ giúp bạn hiểu rõ hơn về tài chính cá nhân
          </p>
        </div>

        {/* Resources Grid */}
        <Row gutter={[32, 32]} className="flex-wrap justify-center">
          {resourcesData.map((resource, index) => (
            <Col xs={24} md={12} lg={8} key={index} className="flex">
              <ResourceCard
                image={resource.image}
                title={resource.title}
                description={resource.description}
                delay={index}
                className="h-full w-full"
              />
            </Col>
          ))}
        </Row>
      </div>
    </section>
  )
}

export default ResourcesSection
