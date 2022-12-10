

type BaseUserType = {

    full_name: string
    email: string
    entry_date: string
    role: string 
    
}

export type UserProfileType = BaseUserType & {

    id: string 
    picture_url: string

}

