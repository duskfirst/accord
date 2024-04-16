export type Message = {
    sender: string,
    receiver: string,
    time?: Date,
    text: string 
    id: string,
}

export type Conversation = {
    "conversation" : Message[],
}