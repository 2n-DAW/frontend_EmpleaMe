export interface Inscription {
    job: string;
    user_email: string;
}

export interface UpdateInscription {
    job: string;
    user_email: string;
    status: number;
}

export interface InscriptionList {
    job: string;
    user_email: string;
    status: number;
    date: Date;
}