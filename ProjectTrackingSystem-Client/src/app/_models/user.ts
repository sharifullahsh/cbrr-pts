export interface User {
    id: number;
    userName: string;
    lastActive: Date;
    provinceId: number;
    programId: number;
    roles?: string[];
}
