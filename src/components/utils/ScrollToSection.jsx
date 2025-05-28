
export default function scrollToSection(sectionId, behavior = "smooth") {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior })
  }
}
