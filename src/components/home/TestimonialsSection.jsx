import { Card, Avatar, Rate, Carousel } from "antd";
import { testimonialsData } from "../../data/testimoialsData";


const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Khách hàng nói gì về chúng tôi
          </h2>
          <p className="text-xl text-gray-600">
            Những phản hồi tích cực từ khách hàng
          </p>
        </div>

        {/* Testimonials Carousel */}
        <Carousel autoplay dots={{ className: "custom-dots" }}>
          {testimonialsData.map((testimonial, index) => (
            <div key={index}>
              <Card className="max-w-4xl mx-auto border-0 shadow-lg">
                <div className="text-center p-8">
                  <Avatar size={80} src={testimonial.avatar} className="mb-6" />
                  <Rate
                    disabled
                    defaultValue={testimonial.rating}
                    className="mb-4"
                  />
                  <p className="text-lg text-gray-600 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <h4 className="text-xl font-bold text-gray-800">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-500">{testimonial.position}</p>
                </div>
              </Card>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
