import { Injectable } from "@angular/core"


@Injectable({
    providedIn: "root"
})


export class JobNewModel {

    title: string = ""
    category: string = ""
    description: string = ""
    requirements: string = ""
    salary: string = ""
    picture_url: string = ""
}

@Injectable({
    providedIn: "root"
})

export class JobExistingModel extends JobNewModel {

    id: number = 0
}


