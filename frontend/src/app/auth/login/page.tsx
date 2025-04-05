import GoogleLoginButton from "@front/components/googleLogin/GoogleLoginButton";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-4 py-12"
      style={{
        backgroundImage: 'url("/background.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 상단 콘텐츠 */}
      <div className="text-center mt-[-40px]">
        <h1 className="text-2xl md:text-2xl font-bold text-gray-800">
          활동 관리를 한 번에,
        </h1>
        <div className="mt-2">
          <Image src="/khulub.png" alt="Khulub Image" width={280} height={140} />
        </div>
      </div>

      <div className="mt-24 md:mt-32">
        <GoogleLoginButton />
      </div>
    </div>
  );
}
