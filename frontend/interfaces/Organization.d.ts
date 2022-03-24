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
    user_id: number;
}

export interface OrganizationWithPW extends Organization {
    password: string;
}
