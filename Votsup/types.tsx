export type RootStackParamList = {
  Root: undefined;
  ChatRoom: ChatRoomParamList;
  NotFound: undefined;

};

export type MainTabParamList = {
  Camera: undefined;
  Chats: undefined;
  Status: undefined;
  Calls: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type ChatsParamList = {
  ChatsScreen: undefined;
};

export type ChatRoomParamList ={
  id: string;
  name: string;
}

export type User = {
  id: String;
  name: String;
  imageUri?: String;
}

export type Message = {
  id: String;
  content: string;
  createdAt:string;
  user: User;
}

export type ChatRoom = {
  id: String;
  users: User[];
  lastMessage: Message;
}
