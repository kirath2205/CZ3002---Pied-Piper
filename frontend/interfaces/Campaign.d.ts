export interface Campaign {
    pk?: number;
    location: string;
    skills: string[];
    date_time: Date;
    time: string;
    description: string;
    minimum_age: number;
    end_time: Date;
    volunteer_count: number;
    title: string;
    organization: string;
}
