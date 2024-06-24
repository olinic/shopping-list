export default interface Item {
    id: number,
    text: string,
    isComplete: boolean
}

export type ItemEventHandler = (item: Item) => void;