import { colors } from "./constants";
import { TodoSectionType } from "./types/models";

export function getHeaderBackgroundColor(section?: TodoSectionType): string {
    if(section === undefined) {
        return colors.grey;
    }

    const ratio: number = section.total != 0 ? Math.round(section.done / section.total * 100) : 0;

    if(ratio == 100) {
        return colors.green;
    } else if(ratio >= 80 && ratio < 100) {
        return colors.yellow;
    } else if(ratio >= 25 && ratio < 80) {
        return colors.orange;
    } else {
        return colors.red;
    }
}

export function getHeaderFontColor(section?: TodoSectionType): string {
    if(section === undefined) {
        return colors.black;
    }

    const ratio: number = section.total != 0 ? Math.round(section.done / section.total * 100) : 0;

    if(ratio == 100) {
        return colors.white;
    } else if(ratio >= 80 && ratio < 100) {
        return colors.black;
    } else if(ratio >= 25 && ratio < 80) {
        return colors.black;
    } else {
        return colors.white;
    }
}

export function getRatio(section: TodoSectionType): number {
    if(section === undefined) {
        return 0;
    }

    return section.total != 0 ? Math.round(section.done / section.total * 100) : 0
}