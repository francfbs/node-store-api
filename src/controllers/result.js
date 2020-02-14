exports.ok = (data) => {
    return {
        success: true,
        data: data
    };
}

exports.fail = (errors) => {
    return {
        success: false,
        errors: errors
    };
}
