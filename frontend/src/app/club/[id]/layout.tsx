import ClubTabBar from "@front/components/club/detail/ClubDetail";
import ClubHeader from "@front/components/club/detail/ClubHeader";

export default function ClubLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ClubHeader />
      <ClubTabBar />
      <main className="mt-4">{children}</main>
    </div>
  );
}
