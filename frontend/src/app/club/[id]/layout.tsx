// app/club/[id]/layout.tsx
import ClubTabBar from "@front/components/club/clubDetailLayout/ClubDetail";
import ClubHeader from "@front/components/club/clubDetailLayout/ClubHeader";

//이거 fetch 해와야 함. 
const club = {
  name: "연극하는 사람들",
  category: "연행",
  imageUrl: "/club-logo.png",
};

export default function ClubLayout({
  children,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <div>
      <ClubHeader
        clubName={club.name}
        category={club.category}
        imageUrl={club.imageUrl}
      />
      <ClubTabBar />
      <main className="mt-4">{children}</main>
    </div>
  );
}
