'use client';

import Image from 'next/image';

const imageList = Array(12).fill('/background.png');

//image props 로 받음. 
export default function GalleryScroll() {
  return (
    <div className="overflow-x-auto w-full">
      <div className="flex gap-4 px-4 py-6 w-max">
        {imageList.map((src, index) => (
          <div key={index} className="flex-shrink-0 rounded-2xl overflow-hidden w-64 h-40">
            <Image
              src={src}
              alt={`image-${index}`}
              width={256}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
