"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Activity, BoardInfo } from "@common/types/responses";

import CustomCalendar from "@front/components/calendar/CustomCalendar";
import Icons from "@front/components/icons";
import instance from "@front/utils/instance";

import BackButton from "../backButton";

interface ClubProps {
  params: {
    id: string;
  };
}

const Club = ({ params }: ClubProps) => {
  const [info, setInfo] = useState<Activity | null>(null);
  const [boardInfo, setBoardInfo] = useState<BoardInfo[]>([]);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { id } = params;
        const [infoRes, boardRes, eventsRes] = await Promise.all([
          instance.get<Activity>(`/activity/${id}`),
          instance.get<BoardInfo[]>(`/board/list/activity/${id}`),
          instance.get("/event/list", {
            params: {
              from: new Date().toISOString().split("T")[0],
              to: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split("T")[0],
            }
          })
        ]);

        setInfo(infoRes.data);
        setBoardInfo(boardRes.data);
        setEvents(eventsRes.data.events || []);
      } catch (error) {
        redirect("/main");
      }
    };

    fetchData();
  }, [params]);

  if (!info) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full py-4 flex flex-col gap-4">
      <div className="px-4 flex flex-row gap-3 items-center">
        <BackButton>
          <Icons.Back
            size={24}
            className="fill-dark"
          />
        </BackButton>
        <p className="text-2xl font-bold">내 소속 동아리</p>
      </div>

      <div className="px-4 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-start gap-5">
          <img
            src={info.logo_url}
            alt="동아리 로고"
            className="w-24 h-24 object-cover rounded-full bg-white"
          />
          <div className="flex flex-col gap-1">
            <p className="font-bold text-2xl text-dark">{info.name}</p>
            <p className="font-bold text-dark/40">{info.small_type}</p>
          </div>
        </div>
        <div className="flex flex-col gap-1 justify-center items-end">
          {
            info.homepage_url ? (
              <Link
                href={info.homepage_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="text-dark/40 font-bold underline">홈페이지</p>
              </Link>
            ) : null
          }
          {
            info.instagram ? (
              <Link
                href={`https://instagram.com/${info.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="text-dark/40 font-bold underline">인스타그램</p>
              </Link>
            ) : null
          }
        </div>
      </div>

      {
        boardInfo.map((board) => (
          <React.Fragment key={board._id}>
            <div className="flex flex-row items-center justify-between px-4">
              <p className="text-2xl font-bold text-dark mt-4">{board.name}</p>
              <p className="text-dark/40 font-bold underline cursor-pointer">전체보기</p>
            </div>
          </React.Fragment>
        ))
      }
      
      <div className="px-4">
        <CustomCalendar timetables={[{
          timetable_id: params.id,
          name: info.name,
          color: info.key_color || "#000000",
          events: events
        }]} />
      </div>

    </div>
  );
};

export default Club;