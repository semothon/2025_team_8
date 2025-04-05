import ClubTabBar from "@front/components/club/detail/ClubDetail";
import ClubHeader from "@front/components/club/detail/ClubHeader";

export default function ClubLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      {children}
    </div>
  );
}
