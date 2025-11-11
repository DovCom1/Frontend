export interface MainUser{
    id : string;
    uid : string;
    nickname : string;
    email : string;
    avatarUrl : string;
    gender : 'Мужской' | 'Женский';
    status : string;
    dateOfBirth : string;
    accountCreationTime : string;
}