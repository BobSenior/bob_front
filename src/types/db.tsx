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
  isRequested: boolean;
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
  fixVote: boolean;
  voteOwnerIdx: number;
  type: string;
}

export interface RequestData {
  simp: SimplifiedUserProfileDTO;
  position: string;
}

export interface MakeNewPostReqDTO {
  writerIdx: number;
  writerPosition: string;
  title: string;
  location: string | null;
  meetingAt: string | null;
  type: string;
  receiverNum: number | null;
  buyerNum: number;
  constraint: string;
  content: string;
  tags: string[] | null;
}

/**
 * 2. Chat
 */
export interface ShownChat {
  nickname: string;
  writtenAt: string;
  content: string;
  senderIdx: number;
}

export interface ChatPage {
  curPage: number;
  length: number;
  chatList: ShownChat[];
}

/**
 * Notice
 */

export interface ShownNotice {
  postIdx?: number;
  unreadChatNum?: number;
  type: string;
}

export interface TotalNotices {
  totalCount: number;
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

export interface LoginResDTO {
  resultMessage:string;
  userIdx:number;
  uuid:string;
  schoolId:string;
  department:string;
  imageURL:string;
  jwtAccessToken:string;
  jwtRefreshToken:string;
}

