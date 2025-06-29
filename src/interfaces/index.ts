export interface User {
  id: number;
  chatRoomID: number;
  userID: string;
  userName: string;
  isAdmin: boolean;
  createdDate: string;
  isOnline: boolean;
  role: string;
}

export interface Iuser {
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  avatar: string;
  role: string;
}

export interface Message {
  chatID: number;
  chatRoomID: number;
  senderID: string;
  senderName: string;
  content: string;
  isRead: boolean;
  createdDate: string;
}

export interface ChatRoom {
  chatRoomID: number;
  roomName: string;
  isGroup: boolean;
  createdDate: string;
  messages: Message[] | { $values: Message[] };
  participants?: User[] | { $values: User[] };
  lastMessage?: Message;
}

export interface StyledProps {
  isOnline?: boolean;
  active?: boolean;
  isMine?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}

export interface ApiResponse<T> {
  $values?: T[];
  [key: string]: unknown;
}

export function unwrapValues<T>(data: T[] | { $values: T[] } | undefined): T[] {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  return data.$values || [];
}