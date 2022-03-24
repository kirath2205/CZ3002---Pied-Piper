export type Gender = 'M' | 'F' | 'T';

export interface User {
    first_name: string;
    last_name: string;
    age: number;
    gender: Gender;
    email: string;
    phone_number: string;
    skills: string[];
    address: string;
    type: 'USER';
}

export interface UserProfile {
    first_name: string;
    last_name: string;
    age: number;
    gender: Gender;
    email: string;
    phone_number: string;
    skills: string[];
    address: string;
}

export interface UserWithPW extends User {
    password: string;
}

export interface UserCampaign {
    campaign_id: number;
    campaign_name: string;
    organization_name: string;
    status: string;
    pk?: number;
}
