
module.exports = {
    MIN_PASSWORD_LENGTH: 8,
    MAX_PASSWORD_LENGTH: 40,
    MIN_NAME_LENGTH: 1,
    MAX_NAME_LENGTH: 30,
    MAX_EMAIL_LENGTH: 129,
    MIN_USERNAME_LENGTH: 4,
    MAX_USERNAME_LENGTH: 16,
    MAX_LNG_COORD: 180,
    MIN_LNG_COORD: -180,
    MAX_LAT_COORD: 90,
    MIN_LAT_COORD: -90,
    MIN_RADIUS: 0,
    MAX_RADIUS: 50,
    MAX_COMMENT_LENGTH: 300,

    USERNAME_REGEX: /^[a-z1-9]*$/,
    USER_NAME_REGEX: /^[A-Z][A-Za-z\s-]*$/,
    PASSWORD_BASE_REGEX: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
    PASSWORD_LENGTH: /^.{8,40}$/,
    PASSWORD_SPACE_ONLY_REGEX: /^\S+$/,

    MAX_PHOTO_SIZE: 10 * 1024 * 1024, //10Mb
    PHOTO_MIME_TYPES: [
        'image/jpeg',
        'image/png'
    ]
};
