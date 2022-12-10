
type BaseJobType = {

    title: string
    category: string,
    description: string,
    requirements: string,
    salary: number,

}


export type JobNewOffer = BaseJobType & {

    picture: string,
    extension: string 

}


export type JobPreview = BaseJobType & {

    id: number,
    picture_url: string,


  }


export type JobSpecific = JobPreview

export type JobAll = JobPreview






// export type JobNewOffer = {

//     title: string 
//     category: string
//     description: string
//     requirements: string
//     salary: number
//     picture_url: string 

// }


// export type JobDetails = {

//     description: string
//     picture_url: string
//     requirements: string
//     category: string
//     salary: number
//     id: number
//     title: string
// }






