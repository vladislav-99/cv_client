import { educationsColumns, experienceColumns } from "./Columns";

export enum Tables {
    projects,
    users,
    educations,
    experioences
}


export const getColumns = (table: Tables) => {
    switch (table) {
        case Tables.educations:
            return educationsColumns

        case Tables.experioences:
            return experienceColumns

        default:
            return []
    }
}