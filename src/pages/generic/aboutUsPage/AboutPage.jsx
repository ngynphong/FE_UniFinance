import CoreValues from "../../../components/generic/aboutUs/CoreValues";
import MissionSection from "../../../components/generic/aboutUs/MissionSection";
import TeamMembers from "../../../components/generic/aboutUs/TeamMembers";

function AboutPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-16">
      <MissionSection />
      <CoreValues />
      <TeamMembers />
    </main>
  );
}

export default AboutPage;
