const members = Array.from({ length: 5 });
function TeamMembers() {
  return (
    <section>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {members.map((_, index) => (
          <div key={index} className="text-center">
            <img
              src={`https://randomuser.me/api/portraits/men/${index + 10}.jpg`}
              alt="Team Member"
              className="w-28 h-28 mx-auto rounded-full object-cover mb-4"
            />
            <p className="font-semibold text-lg">Tên</p>
            <p className="text-purple-600 text-sm mb-1">Chức</p>
            <p className="text-gray-500 text-sm mb-2">Ghi gì đó</p>
            <div className="flex justify-center gap-3 text-gray-400 text-lg">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-github"></i>
              <i className="fab fa-linkedin"></i>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TeamMembers;
