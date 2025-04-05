import { t } from "elysia";

export const ERROR_MESSAGE = {
  USER_ALREADY_EXISTS: [409, "이미 존재하는 사용자입니다."],
  USER_NOT_FOUND: [404, "사용자를 찾을 수 없습니다."],
  INVALID_TYPE_USERNAME: [400, "유효하지 않은 사용자 이름(username)입니다."],
  INVALID_TYPE_PASSWORD: [400, "유효하지 않은 비밀번호(password)입니다."],
  INVALID_ID_TYPE: [400, "유효하지 않은 ID 형식입니다."],
  INVALID_TOKEN: [401, "유효하지 않은 토큰입니다."],
  NO_TOKEN: [401, "토큰이 없습니다."],
  UNAUTHORIZED: [401, "권한이 없는 사용자입니다."],
  NO_REFRESH_TOKEN: [401, "리프레시 토큰이 없습니다."],
  TOKEN_TID_MISMATCH:[403, "토큰의 캘린더 정보가 일치하지 않습니다."],

  INSERT_ACTIVITY_FAILED: [500, "활동(동아리) 생성에 실패했습니다."],
  PERMISSION_DENIED: [403, "접근 권한이 없습니다."],

  NO_ACTIVITY_ID: [400, "활동 ID가 없습니다."],
  NO_ACTIVITY: [404, "존재하지 않는 활동입니다."],

  UPDATE_FAILED: [500, "수정에 실패했습니다."],

  DELETE_FAILED: [500, "삭제에 실패했습니다."],

  NOT_FOUNDED_KEY: [404, "찾을 수 없는 식당입니다."],

  INSERT_TIMETABLE_FAILED: [500, "캘린더(시간표) 생성에 실패했습니다."],
  TIMETABLEID_REQUIRED: [400, "캘린더 ID가 필요합니다."],
  ICS_FILE_REQUIRED: [400, "ics 파일이 필요합니다."],
  TIMETABLE_NOT_FOUND: [500, "캘린더(시간표)를 찾을 수 없습니다."],
  CREATE_ICS_FILE_FAILED: [500, "ics 파일 생성에 실패했습니다."],

  NO_TIMETABLE_ID: [400, "캘린더 ID가 없습니다."],
  NO_TIMETABLE: [404, "존재하지 않는 캘린더입니다."],

  INSERT_EVENT_FAILED: [500, "이벤트 생성에 실패했습니다."],

  NO_EVENT_ID: [400, "이벤트 ID가 없습니다."],
  NO_EVENT: [404, "존재하지 않는 이벤트입니다."],

  REQUIRED_ANSWERS_MISSING: [400, "필수 답변이 누락되었습니다."],
  ANSWER_TOO_LONG: [400, "답변이 너무 깁니다."],

  FETCH_APPLICATIONS_FAILED: [500, "지원서 목록 조회에 실패했습니다."],
  NOT_RECRUITING_PERIOD: [400, "현재 모집 기간이 아닙니다."],
  INTERVIEW_NOT_STARTED: [400, "아직 면접 전형이 시작되지 않았습니다."],

  NO_APPLICATION_ID: [400, "지원서 ID가 없습니다."],
  NO_APPLICATION: [404, "존재하지 않는 지원서입니다."],

  ALREADY_APPLIED: [400, "이미 지원한 활동(동아리)입니다."],
  CREATE_FAILED: [500, "지원서 생성에 실패했습니다."],
  RECRUITMENT_ENDED: [403, "서류 전형 기간이 종료되어 지원서를 수정할 수 없습니다."],
  FETCH_ACTIVITIES_FAILED: [500, "활동(동아리) 목록 조회에 실패했습니다."],
} as const;

export type ERROR_MESSAGE_TYPE = typeof ERROR_MESSAGE;
export type ERROR_KEY = keyof ERROR_MESSAGE_TYPE;
export type ERROR_STATUS = ERROR_MESSAGE_TYPE[ERROR_KEY][0];
export type ERROR_MESSAGES = ERROR_MESSAGE_TYPE[ERROR_KEY][1];
export type ERROR_RESPONSE = {
  success: false;
  code: ERROR_KEY;
  message: ERROR_MESSAGES;
};


const tmpElysia = t.Object({
  success: t.Boolean({
    default: false,
  }),
  code: t.String({
    default: "message" as ERROR_KEY,
  }),
  message: t.String({
    default: "msg" as ERROR_MESSAGES,
  }),
});
type ElysiaObj = typeof tmpElysia;

type Statuses<T extends ERROR_KEY[]> = (typeof ERROR_MESSAGE)[T[number]][0];
interface AdditionalElysia {
  isSignIn?: Boolean;
}

export const errorElysia = <T extends ERROR_KEY[]>(messages: T, additional?: AdditionalElysia) => {
  if (additional?.isSignIn) {
    messages.push("UNAUTHORIZED");
  }

  type S = Statuses<T>;
  const obj: Record<S, ElysiaObj> = {} as Record<S, ElysiaObj>;

  for (const message of messages) {
    const [status, msg] = ERROR_MESSAGE[message];
    obj[status as S] = t.Object({
      success: t.Boolean({ default: false }),
      code: t.String({
        default: message,
      }),
      message: t.String({
        default: msg,
      }),
    });
  }

  return obj;
};

const exit = (error: any, ERROR_KEY: ERROR_KEY) => {
  const [status, message] = ERROR_MESSAGE[ERROR_KEY];
  // set.status = status;
  // return {
  //   success: false,
  //   code: ERROR_KEY,
  //   message: message,
  // };
  return error(status, {
    success: false,
    code: ERROR_KEY,
    message: message,
  });
};

export default exit;
