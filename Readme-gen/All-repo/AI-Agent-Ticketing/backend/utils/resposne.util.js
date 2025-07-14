export const apiResponse = (res, status, message, data = {}, token) => {
    res.status(status).json({
        Message: message,
        Data: data,
        Token: token ?? '',
    });
};
