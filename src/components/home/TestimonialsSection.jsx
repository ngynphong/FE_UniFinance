import { useEffect, useState } from "react";
import { Card, Avatar, Rate, Carousel, Modal, Button, Input } from "antd";
import { reviewService } from "../../services/reviewService";
import { authService } from "../../services/authService";
import { useAuth } from "../../components/auth/useAuthHook";
import packageService from "../../services/packageService";

const TestimonialsSection = () => {
  const { user } = useAuth(); // Get user info from auth
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 0,
    comment: "",
    userPackageUserId: "",
    userPackagePackageId: "",
  });
  const [hasUserPackage, setHasUserPackage] = useState(false); // Check if user has a package
  const [hasReviewed, setHasReviewed] = useState(false); // Check if user has reviewed the package

  const fetchReviews = async () => {
    try {
      const data = await reviewService.getAllReviews();
      const testimonialsWithUserInfo = await Promise.all(
        data.map(async (testimonial) => {
          const userInfo = await authService.getUserProfile(testimonial.userID);
          return {
            ...testimonial,
            name: userInfo.name,
            avatar: userInfo.avatar,
          };
        })
      );
      setTestimonials(testimonialsWithUserInfo);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setLoading(false);
    }
  };

  // Fetch the user package and review status
  const fetchUserPackage = async () => {
    try {
      const userPackageData = await packageService.getUserPackage(user.userID);
      if (userPackageData && userPackageData.length > 0) {
        setHasUserPackage(true);
        setReviewData((prevData) => ({
          ...prevData,
          userID: user.userID,
          userPackageUserId: user.userID,
          userPackagePackageId: userPackageData[0].packageId,
        }));

        // Check if the user has already reviewed this package
        const userReview = await reviewService.getAllReviews(); // or use a specific function to get reviews of the package
        const existingReview = userReview.find(
          (review) =>
            review.userPackagePackageId === userPackageData[0].packageId &&
            review.userPackageUserId === user.userID
        );
        if (existingReview) {
          setHasReviewed(true);
        }
      }
    } catch (error) {
      console.error("Error fetching user package:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
    fetchUserPackage();
  }, [user]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      await reviewService.createReview(reviewData);
      setIsModalVisible(false);
      setHasReviewed(true); // Ẩn nút "Đánh giá ngay"
      fetchReviews(); // Tải lại danh sách đánh giá
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

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
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <Carousel autoplay dots={{ className: "custom-dots" }}>
            {testimonials.map((testimonial, index) => (
              <div key={index}>
                <Card className="max-w-4xl mx-auto border-0 shadow-lg">
                  <div className="text-center p-8">
                    <Avatar
                      size={80}
                      src={testimonial.avatar}
                      className="mb-6"
                    />
                    <Rate
                      disabled
                      defaultValue={testimonial.rating}
                      className="mb-4"
                    />
                    <p className="text-lg text-gray-600 mb-6 italic">
                      "{testimonial.comment}"
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
        )}

        {hasUserPackage && !hasReviewed && (
          <div className="text-center mt-8">
            <Button type="primary" onClick={showModal}>
              Đánh giá ngay
            </Button>
          </div>
        )}

        <Modal
          title="Đánh giá của bạn"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="space-y-4">
            <div>
              <Rate
                onChange={(value) =>
                  setReviewData({ ...reviewData, rating: value })
                }
                value={reviewData.rating}
              />
            </div>

            <div>
              <Input.TextArea
                rows={4}
                placeholder="Viết bình luận của bạn"
                name="comment"
                value={reviewData.comment}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </Modal>
      </div>
    </section>
  );
};

export default TestimonialsSection;
