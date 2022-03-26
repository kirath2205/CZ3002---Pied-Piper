export interface Campaign {
    pk?: number;
    location: string;
    skills: string[];
    date_time: Date;
    description: string;
    minimum_age: number;
    end_time: Date;
    volunteer_count: number;
    title: string;
    org_email: string;
    org_name?: string;
}
