export interface Organization {
    name: string;
    type: 'ORG';
    email: string;
    phone_number: string;
    address: string;
}

export interface OrganizationWithPW extends Organization {
    password: string;
}
