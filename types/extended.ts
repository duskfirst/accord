import { Conversation, Profile } from "./types";


export interface ExtendedConversation extends Conversation {
    other: Profile;
};