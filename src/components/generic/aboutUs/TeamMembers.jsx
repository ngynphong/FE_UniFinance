// TeamMembers.jsx
"use client";

export const members = [
  {
    name: "Nguyễn Thành Nhân",
    role: "Backend Developer",
    bio: "Thiết kế kiến trúc & API",
    image: "/nhan.jpg",
    socials: {
      facebook: "",
      github: "https://github.com/Nhan7203",
    },
  },
  {
    name: "Dương Xuân Bách",
    role: "Backend Developer",
    bio: "Bảo mật & DevOps",
    image: "/bach.jpg",
    socials: {
      facebook: "",
      github: "https://github.com/Litpe2point0",
    },
  },
  {
    name: "Nguyễn Đức Hậu",
    role: "Marketing & Growth",
    bio: "Chiến lược tăng trưởng",
    image: "/hau.jpg",
    socials: {
      facebook: "",
      github: "",
    },
  },
  {
    name: "Phạm Văn Quốc Vương",
    role: "Frontend Developer",
    bio: "UI/UX & React",
    image: "/vuong.jpg",
    socials: {
      facebook: "",
      github: "https://github.com/Vuong-king",
    },
  },
  {
    name: "Nguyễn Thanh Phong",
    role: "Frontend Developer",
    bio: "UI/UX & React",
    image: "/phong.jpg",
    socials: {
      facebook: "",
      github: "https://github.com/ngynphong",
    },
  },
  {
    name: "Lý Gia Kiệt",
    role: "Marketing & Growth",
    bio: "Đảm bảo backend chạy mượt từng request.",
    image: "/kiet.jpg",
    socials: {
      facebook: "https://www.facebook.com/takishilee",
      github: "https://github.com/gia-kiet-ly",
    },
  },
];

function TeamMembers() {
  return (
    <section className="py-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
        {members.map((m, idx) => (
          <div
            key={idx}
            className={`text-center
              ${
                idx === members.length - 1
                  ? "sm:col-start-2 md:col-start-3" /* căn giữa thành viên cuối */
                  : ""
              }`}
          >
            <img
              src={m.image}
              alt={m.name}
              className="w-28 h-28 mx-auto rounded-full object-cover mb-4"
            />
            <p className="font-semibold text-lg">{m.name}</p>
            <p className="text-purple-600 text-sm mb-1">{m.role}</p>
            <p className="text-gray-500 text-sm mb-2">{m.bio}</p>

            <div className="flex justify-center gap-3 text-gray-400 text-lg">
              {m.socials.facebook && (
                <a href={m.socials.facebook} target="_blank" rel="noreferrer">
                  <i className="fab fa-facebook"></i>
                </a>
              )}
              {m.socials.github && (
                <a href={m.socials.github} target="_blank" rel="noreferrer">
                  <i className="fab fa-github"></i>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TeamMembers;
