'use client';

import TextContainer from '@front/components/club/introduction/TextContainer';
import Image from 'next/image';

export default function RecruitComponent() {
  return (
    <div className=" px-4 py-8 space-y-6">
      {/* 소개 섹션 */}
      <TextContainer
        mainTitle="모의고사를 한 눈에,"
        subTitle="동아리 소개"
        text={`안녕하세요. 이것은 키우기닷컴 동아리에 대한 설명글입니다.
              안녕하세요. 이것은 키우기닷컴 동아리에 대한 설명글입니다.`}
      />

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:flex-[2]">
          <TextContainer
            mainTitle=""
            subTitle="활동 내역"
            text={`안녕하세요 이것은 키우기닷컴 동아리에 대한 설명글입니다. `.repeat(20)}
          />
        </div>

        <div className="lg:flex-[1] flex flex-col gap-6 h-full">
          <div className="w-full flex-1">
            <Image
              src="/background.png"
              alt="활동 이미지"
              width={400}
              height={250}
              className="rounded-xl w-full h-full object-cover"
            />
          </div>

          {/* 수상내역 */}
          <div className="w-full flex-1">
            <TextContainer
              mainTitle=""
              subTitle="수상 내역"
              text={`대상  엄청깨졌는대회
            최우수상  이것은 진짜 놀라운 대회입니다
            대상  엄청개쩌는대회
            대상  엄청개쩌는대회
            대상  엄청개쩌는대회`}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
