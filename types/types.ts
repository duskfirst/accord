export type Message = {
    sender: string,
    receiver: string,
    time: Date,
    text?: string
    id: string,
    file?: File,
};

export type Conversation = {
    "conversation": Message[],
};

export interface Profile {
    avatar_url: string | null;
    display_name: string | null;
    email?: string
    id: string | null;
    username: string | null;
    website: string | null;
};