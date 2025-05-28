const values = [
     { title: 'Integrity', desc: 'Ethical AI development and transparent practices' },
  { title: 'Empowerment', desc: 'Enabling businesses through intelligent solutions' },
  { title: 'Education', desc: 'Democratizing AI knowledge globally' },
  { title: 'Accessibility', desc: 'Making AI solutions available to everyone' }
]

function CoreValues() {
  return (
    <section className="mb-16">
      <h3 className="text-2xl font-bold text-center mb-8">Core Values</h3>
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
