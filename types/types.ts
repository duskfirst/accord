export interface Conversation {
    another: string,
    created_at: string,
    id: string,
    one: string,
};

export interface Message {
    content: string | null;
    conversation: number;
    deleted: boolean;
    edited: boolean;
    file_url: string | null;
    file_type: string | null;
    id: number;
    sent_at: string;
    sent_by: string;
};

export interface Profile {
    avatar_url: string | null;
    display_name: string | null;
    email?: string;
    header_url: string | null;
    id: string;
    username: string;
    website: string | null;
};
