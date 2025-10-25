import * as yup from "yup";


const JobSchema = yup.object({
    title: yup.string().required("Job title is required").min(3, "Title must be at least 3 characters long"),
    category: yup.string().required("Please select a job category"),
    type: yup.string().required("Job type is required"),
    location: yup.string().required("Location is required"),
    openings: yup.number().transform((value, orignalValue) => (orignalValue === "" ? undefined : Number(orignalValue))).typeError("Openings must be a number").min(1, "There must be at least one opening").required("Number of openings is required"),

    // STEP 2: Job Details

    description: yup.string().required("Job description is required").min(20, "Description should be at least 20 characters"),
    responsibilities: yup.array().of(yup.string().trim().min(5, "Each responsibility must be at least 5 characters long").required("Responsibilities are required")).min(1, "At least one responsibility is required"),
    requirements: yup.array().of(yup.string().trim().min(5, "Each requirment must be at least 5 characters long").required("Requirements are required")).min(1, "At least one requirement is required"),
    experienceLevel: yup.string().required("Please select an experience level"),
    educationLevel: yup.string().required("Please select an education level"),
    skills: yup.array().of(yup.string()).min(1, "Please add at least one skill"),

    // STEP 3: Salary & Benefits


    minSalary: yup.number().typeError("Minimum salary must be a number").required("Minimum salary is required"),
    maxSalary: yup
        .number()
        .typeError("Maximum salary must be a number")
        .required("Maximum salary is required")
        .when("minSalary", (minSalary, schema) => {
            if (minSalary) {
                return schema.min(minSalary, "Max salary must be greater than min salary");
            }
            return schema;
        }),
    currency: yup.string().required("Currency is required"),
    negotiable: yup.boolean(),
    perks: yup.array().of(yup.string()).min(1, "Select at least one perk").required("Select at least one perk"),
    workSchedule: yup.string().required("Work schedule is required"),

    // STEP 4: Application Settings


    applyMethod: yup.string().required("Apply method is required"),
    applicationUrl: yup.string().when("applyMethod", {
        is: "external",
        then: (schema) =>
            schema.url("Invalid URL format").required("Application URL is required")
    }),
    contactEmail: yup.string().email("Invalid email format").required("Contact email is required"),
    applicationDeadline: yup.date()
        .typeError("Invalid date format")
        .required("Application deadline is required"),
    visibility: yup.string().required("Visibility option is required"),
})

export default JobSchema;