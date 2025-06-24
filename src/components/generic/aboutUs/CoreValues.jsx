const values = [
  {
    title: 'Trách nhiệm và minh bạch',
    desc: 'Minh bạch trong mọi hành động và cam kết hỗ trợ người dùng một cách trung thực, xây dựng sự tin tưởng lâu dài.',
  },
  {
    title: 'Trao quyền cho người dùng',
    desc: 'Cung cấp cho sinh viên các công cụ tài chính mạnh mẽ và dễ tiếp cận, giúp họ quản lý tài chính cá nhân và đạt được mục tiêu tài chính của mình.',
  },
  {
    title: 'Giáo dục tài chính',
    desc: 'Giúp sinh viên hiểu và áp dụng các nguyên lý tài chính cơ bản, tạo nền tảng vững chắc cho tương lai tài chính cá nhân.',
  },
  {
    title: 'Khả năng tiếp cận tài chính cho tất cả',
    desc: 'Cung cấp giải pháp tài chính đơn giản và dễ tiếp cận cho mọi sinh viên, bất kể nền tảng hay khả năng tài chính.',
  },
]

function CoreValues() {
  return (
    <section className="mb-16">
      <h3 className="text-2xl font-bold text-center mb-8">Giá trị cốt lõi</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
    {values.map((value,index) =>(
        <div key={index} className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-xl font-semibold mb-2">{value.title}</h4>
          <p className="text-gray-600">{value.desc}</p>
        </div>
    ))}

      </div>
    </section>
  )
}

export default CoreValues
