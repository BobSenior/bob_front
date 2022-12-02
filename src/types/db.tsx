export interface promiseInfo {
  name: string;
  ID: number;
  major: string;
  title: string | null;
  place: string | null;
  time: string | null;
  createdAt?: string;
}

export interface IUser {
  id: number;
  nickname: string;
  email: string;
  Workspaces: IWorkspace[];
}

export interface IChannel {
  id: number;
  name: string;
  private: boolean; // 비공개 채널 여부, 강좌에서는 모두 false(공개)
  WorkspaceId: number;
}

export interface IWorkspace {
  id: number;
  name: string;
  url: string; // 주소 창에 보이는 주소
  OwnerId: number; // 워크스페이스 만든 사람 아이디
}

export interface ICoordinate {
  latitude: number;
  longitude: number;
}

/**
 * 0. BaseResponse
 */

export interface BaseResponse<T> {
  isSuccess: boolean;
  code: number;
  message: string;
  result: T;
}

/**
 * 1. post / appointment
 */

export interface AppointmentHeadDTO {
  postIdx: number;
  title: string;
  writtenAt: string;
  imageURL: string | null;
  writer: SimplifiedUserProfileDTO;
  location: string | null;
  meetingAt: string | null;
  type: string;
  status: string;
  totalNum: number;
  currNum: number;
  waitingNum: number;
  tagHeads: string[];
}

export interface PostViewDTO {
  postIdx: number;
  title: string;
  groupConstraint: string;
  latitude: number | null;
  longitude: number | null;
  location: string | null;
  meetingAt: string | null;
  buyer: SimplifiedUserProfileDTO[];
  receiver: SimplifiedUserProfileDTO[];
  contents: string;
  tagHead: string[];
  requested: boolean;
}

export interface SimplifiedUserProfileDTO {
  userIdx: number;
  nickname: string;
  department: string;
  schoolId: number;
  school: string;
  isOnline: boolean;
}

export interface AppointmentViewDTO {
  writerIdx: number;
  constraint: string;
  title: string;
  postIdx: number;
  latitude: number | null;
  longitude: number | null;
  location: string | null;
  meetingAt: string | null;
  voteIdx: number;
  buyers: SimplifiedUserProfileDTO[];
  receivers: SimplifiedUserProfileDTO[];
  voteTitle: string | null;
  records: ShownVoteRecord[] | null;
  maxNum: number;
  maxBuyerNum: number;
  maxReceiverNum: number;
  alreadyVoted: boolean | null;
  chatRoomIdx: number;
}

export interface MakeNewPostReqDTO {
  // private Long writerIdx;
  writerPosition: string;
  title: string;
  location: string;
  meetingAt: string;
  type: string;
  receiverNum: number | null;
  buyerNum: number | null;

  /*
  //초대된 buyer의 목록
  private List<Long> invitedIdx; // nullable, 지금은 무시할것
  */
  constraint: string;
  content: string;
  tags: string[] | null;
}

/**
 * 2. Chat
 */

export interface ChatDto {
  type: string;
  senderIdx: number;
  nickname: string;
  data: string;
  writtenAt: string;
}

export interface ChatPage {
  curPage: number;
  length: number;
  chatList: ChatDto[];
}

/**
 * Notice
 */

export interface ShownNotice {
  noticeIdx: number;
  postIdx: number;
  type: string;
  text: string;
}

/**
 * User
 */

/**
 * Vote
 */
export interface ShownVoteRecord {
  id: number;
  content: string;
  count: number;
}

export interface ShownVoteHeadDTO {
  voteIdx: number;
  title: string;
  participatedNum: number;
}

export interface ShownVoteDTO {
  voteIdx: number;
  writerIdx: number;
  nickname: string;
  createdAt: string;
  title: string;
  totalParticipated: number;
  records: ShownVoteRecord[];
}
