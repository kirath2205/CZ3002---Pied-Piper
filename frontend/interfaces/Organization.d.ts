export interface Organization {
    name: string;
    type: 'ORG';
    email: string;
    phone_number: number;
    address: string;
}

export interface OrganizationProfile {
    name: string;
    email: string;
    phone_number: number;
    address: string;
}

export interface OrganizationNotification {
    campaign_id: string;
    status: string;
    campaign_name: string;
    user_name: string;
    user_id: number;
    pk?: number;
}

export interface OrganizationWithPW extends Organization {
    password: string;
}
