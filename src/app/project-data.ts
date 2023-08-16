export interface ProjectData {
    id: number,
    projectDetails: {
        organization: string,
        category: string,
        activity: string,
        title: string,
        minimum: number,
        maximum: number,
        description: string,
    },
    projectFile: Array<{}>,
    projectCost: Array<{
        cost: number;
        duration: number;
    }>,
    projectIncludes: Array<{
        description: string
        includesCondition: string
    }>,
    projectDate: Array<{
        date: Date
    }>
}
