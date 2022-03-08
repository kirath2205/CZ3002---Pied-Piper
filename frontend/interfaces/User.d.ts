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

export interface UserWithPW extends User {
    password: string;
}
