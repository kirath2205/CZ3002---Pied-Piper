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

export interface ApprovedUser {
    user_id: number;
    campaign_id: number;
    campaign_name: string;
    user_name: string;
    org_name: string;
    phone_number: number;
    pk?: number;
}
