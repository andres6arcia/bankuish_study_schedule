export default {
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
        ROUTES:{
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
        MESSAGES:{
            SAVE_OK: 'Data saved successfully',
            GET_OK: 'Data retrieved successfully',
            USER_NOT_FOUND: 'Parameter userId not found',
            USER_WITHOUT_COURSES: 'The user sent has no courses',
            MISSING_USERID: 'The data sent are not valid: userId not found',
            MISSING_COURSES: 'The data sent are not valid: courses not found',
            MISSING_DESIRED_COURSE: 'The data sent are not valid: desiredCourse not found',
            MISSING_REQUIRED_COURSE:'The data sent are not valid: requiredCourse not found',
            CYCLE_COURSE_FOUND: 'Error cycle course(desiredCourse = requiredCourse) found'
        }
    },
    TEST: {
        USER: 'testing',
        NON_EXISTING_USER: 'XXXX',
        TEST_DATA: { "userId": "testing", "courses": [{ "desiredCourse": "test" }] },
        CYCLIC_COURSE: { "userId": "cyclic", "courses": [{ "desiredCourse": "cycle_test", "requiredCourse": "cycle_test" }] },
        CYCLIC_COURSES: { "userId": "multiple_cyclic", "courses": [
            { "desiredCourse": "course1", "requiredCourse": "course2" },{"desiredCourse": "course2", "requiredCourse": "course1" } 
        ] },
        MUST_RETURN_ERROR: 'Must return an error',
        CYCLIC_ERROR: 'Maximum call stack size exceeded'
    }
}