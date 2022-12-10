

export const urlPaths = {
    
    home: "",
    dashboard: "job/dashboard",

    register: "user/register",
    login: "user/login",
    logout: "user/logout",

    profile: "user/profile",
    editUser: "user/profile/edit",
    deleteUser: "user/profile/delete",

    myJobs: "user/jobs",

    newJob: "job/create",
    showJob: "job/details", //takes <int:job_id>
    editJob: "job/details/edit", //takes <int:job_id>
    deleteJob: "job/delete", //takes <int:job_id>

    

}