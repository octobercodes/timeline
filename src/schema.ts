/**
 * @module octobercodes/timeline
 */

export interface Label {
    text: string;
    attrs?: any;
}

export interface Event {
    date: Date[];
    title: string;
    label?: string | Label;
    options?: any;
    attrs?: any;
}
