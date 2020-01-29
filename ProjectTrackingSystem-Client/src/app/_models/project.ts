export interface Project {
    id: number;
    projectCode: string;
    projectName: string;
    budget: number;
    startDate: Date;
    endDate: Date;
    currency: string;
    programme: string;
    currencyId: number;
    programmeId: number;

}
