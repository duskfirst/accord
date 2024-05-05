export type _Message = {
    sender: string,
    receiver: string,
    time: Date,
    text?: string
    id: string,
    file?: File,
};

export type _Conversation = {
    "conversation": _Message[],
};

export interface Conversation {
    another: string,
    created_at: string,
    id: number,
    one: string,
};

export interface Message {
    content: string | null;
    conversation: number;
    deleted: boolean;
    edited: boolean;
    file_url: string | null;
    id: number;
    sent_at: string;
    sent_by: number;
};

export interface Profile {
    avatar_url: string | null;
    display_name: string | null;
    email?: string
    header_url: string | null;
    id: string;
    username: string;
    website: string | null;
};
