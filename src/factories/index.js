let id = 0;

const defaultOptions = {
    vertical: 'top', horizontal: 'right', severity: 'success'
};

export default function createToast(options) {
    return {
        ...defaultOptions,
        ...options,
        id: id++
    };
}