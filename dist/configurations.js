"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    SERVER: {
        SETTINGS: {
            PORT: 3000,
            PROPERTY_PORT: "port",
            MORGAN_SETTINGS: 'dev'
        },
        MESSAGES: {
            SERVER_ON: "Server on port ",
            SERVER_STATE_RUNNING: "Server is running: ",
        },
        ROUTES: {
            INDEX: '/',
            POST_COURSES: '/courses',
            GET_COURSES: '/courses/:userId'
        }
    },
    DB: {
        POSTGRES: {
            TYPE: "postgres",
            LOGGING: false,
            URL: 'postgres://postgres:pwddb@localhost:5432/db',
            SYNCHRONIZE: true
        },
    },
    CORE: {
        MESSAGES: {
            SAVE_OK: 'Data saved successfully',
            GET_OK: 'Data retrieved successfully',
            USER_NOT_FOUND: 'Parameter userId not found',
            USER_WITHOUT_COURSES: 'The user sent has no courses',
            MISSING_USERID: 'The data sent are not valid: userId not found',
            MISSING_COURSES: 'The data sent are not valid: courses not found',
            MISSING_DESIRED_COURSE: 'The data sent are not valid: desiredCourse not found',
            MISSING_REQUIRED_COURSE: 'The data sent are not valid: requiredCourse not found',
            CYCLE_COURSE_FOUND: 'Error cycle course(desiredCourse = requiredCourse) found'
        }
    },
    TEST: {
        USER: 'testing',
        NON_EXISTING_USER: 'XXXX',
        TEST_DATA: { "userId": "testing", "courses": [{ "desiredCourse": "test" }] },
        CYCLIC_COURSE: { "userId": "cyclic", "courses": [{ "desiredCourse": "cycle_test", "requiredCourse": "cycle_test" }] },
        CYCLIC_COURSES: {
            "userId": "multiple_cyclic", "courses": [
                { "desiredCourse": "course1", "requiredCourse": "course2" }, { "desiredCourse": "course2", "requiredCourse": "course1" }
            ]
        },
        MUST_RETURN_ERROR: 'Must return an error',
        CYCLIC_ERROR: 'Maximum call stack size exceeded',
        E2E_COMPLEX_DATA: {
            "userId": "e2e_testing", "courses": [
                { "desiredCourse": "10", "requiredCourse": ["3", "11"] },
                { "desiredCourse": "9", "requiredCourse": ["11", "8"] },
                { "desiredCourse": "2", "requiredCourse": "11" },
                { "desiredCourse": "8", "requiredCourse": ["3", "7"] },
                { "desiredCourse": "11", "requiredCourse": ["5", "7"] },
                { "desiredCourse": "3" },
                { "desiredCourse": "7" },
                { "desiredCourse": "5" },
            ]
        },
        E2E_COMPLEX_DATA_SOLUTION: ["7", "5", "11", "2", "3", "10", "8", "9"],
        E2E_OTHER_DATA: {
            "userId": "e2e_simple", "courses": [
                { "desiredCourse": "Calculus I", "requiredCourse": "Algebra" },
                { "desiredCourse": "Algorithms", "requiredCourse": "Logyc I" },
                { "desiredCourse": "Algebra" },
                { "desiredCourse": "OOP", "requiredCourse": "Algorithms" },
            ]
        },
        E2E_OTHER_DATA_SOLUTION: ["Algebra", "Calculus I", "Logyc I", "Algorithms", "OOP"],
        E2E_NUMERIC_DATA: {
            "userId": "e2e_other", "courses": [
                { "desiredCourse": "3", "requiredCourse": "2" },
                { "desiredCourse": "1", "requiredCourse": ["3", "4"] },
                { "desiredCourse": "2", "requiredCourse": "5" },
                { "desiredCourse": "0", "requiredCourse": ["5", "4"] },
                { "desiredCourse": "5" },
                { "desiredCourse": "4" }
            ]
        },
        E2E_NUMERIC_DATA_SOLUTION: ["5", "2", "3", "4", "1", "0"],
    },
    FIREBASE: {
        GOOGLE_APPLICATION_CREDENTIALS: 'E:\Escritorio\firebase-key.json'
    }
};
