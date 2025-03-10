
import React from "react";
import ExperienceCard from "./ExperienceCard";
import ExperienceEmptyState from "./ExperienceEmptyState";

interface Experience {
  id: string;
  title: string;
  location: string;
  category: string;
  price: number;
  image_url: string;
  status: string;
  bookings: number;
}

interface ExperienceListProps {
  experiences: Experience[];
  status: "published" | "draft";
}

const ExperienceList: React.FC<ExperienceListProps> = ({ experiences, status }) => {
  const filteredExperiences = experiences.filter(exp => exp.status === status);

  if (filteredExperiences.length === 0) {
    return <ExperienceEmptyState type={status} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredExperiences.map(experience => (
        <ExperienceCard key={experience.id} experience={experience} />
      ))}
    </div>
  );
};

export default ExperienceList;
