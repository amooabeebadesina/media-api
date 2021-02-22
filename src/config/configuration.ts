export default (): Record<string, any> => ({
    port: process.env.PORT || 3000,
    database: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiration: process.env.JWT_EXPIRATION_TIME,
        issuer: process.env.JWT_ISSUER
    },
    cloudinary: {
        cloud_name:'dzzknxffr',
        api_key:'648257538649885',
        api_secret: 'pJNN5KA61VDYZb0wS04FDIVQlZY'
    }
});
