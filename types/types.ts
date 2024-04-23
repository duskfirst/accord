export type Message = {
    sender: string,
    receiver: string,
    time?: Date,
    text?: string 
    id: string,
    file?: File,
}

export type Conversation = {
    "conversation" : Message[],
}