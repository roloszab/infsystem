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
        state?: number | State
    ) {
        this.id = id || null;
        this.type = type || Type.book;
        this.author = author || null;
        this.title = title || null;
        this.sourceDate = sourceDate || new Date();
        switch (state) {
            case 0:
                this.state = State.available;
                break;
            case 1:
                this.state = State.reserved;
                break;
            case 2:
                this.state = State.waste;
                break;
            default:
                this.state = State.available;
        }
    }
}
