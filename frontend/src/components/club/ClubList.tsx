"use client";

import ClubCard,{ ClubShortInfo}  from "./ClubCard";

interface ClubListProps {
  clubs: ClubShortInfo[];
}

export default function ClubList({ clubs }: ClubListProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {clubs.map((club) => (
        <ClubCard key={club.id} club={club} />
      ))}
    </div>
  );
}
