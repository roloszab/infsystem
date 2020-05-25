import { State, Type } from ".";

export class Stock {
    id: string;
    type: Type;
    author: string;
    title: string;
    sourceDate: Date;
    state: State;

    constructor(
        id?: string,
        type?: Type,
        author?: string,
        title?: string,
        sourceDate?: Date,
        state?: State
    ) {
        this.id = id || null;
        this.type = type || Type.book;
        this.author = author || null;
        this.title = title || null;
        this.sourceDate = sourceDate || new Date();
        this.state = state || State.available;
    }
}