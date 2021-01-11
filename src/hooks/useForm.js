import { useState, useEffect, useCallback } from 'react';

function useForm(stateSchema, validationSchema = {}, callback) {
    const [state, setState] = useState(stateSchema);
    const [disable, setDisable] = useState(true);
    const [isDirty, setIsDirty] = useState(false);

    // Disable button in initial render.
    useEffect(() => {
        setDisable(true);
    }, []);

    // For every changed in our state this will be fired
    // To be able to disable the button
    useEffect(() => {
        if (isDirty) {
            setDisable(validateState());
        }
    }, [state, isDirty]);

    // Used to disable submit button if there's an error in state
    // or the required field in state has no value.
    // Wrapped in useCallback to cached the function to avoid intensive memory leaked
    // in every re-render in component
    const validateState = useCallback(() => {
        const hasErrorInState = Object.keys(validationSchema).some(key => {
            const isInputFieldRequired = validationSchema[key].required;
            const stateValue = state[key].value; // state value
            const stateError = state[key].error; // state error

            return (isInputFieldRequired && (!stateValue || stateValue.length === 0)) || stateError;
        });

        return hasErrorInState;
    }, [state, validationSchema]);

    // Used to handle every changes in every input
    const handleOnChange = useCallback(
        event => {
            setIsDirty(true);

            const name = event.target.name;
            const value = event.target.value;
            const label = event.target?.label;

            let error = '';
            if (validationSchema[name] !== undefined) {
                if (validationSchema[name].required) {
                    if (!value || value.length === 0) {
                        error = `Campo ${name} obrigatório`;
                    }
                }

                if (
                    validationSchema[name].validator !== null &&
                    typeof validationSchema[name].validator === 'object' &&
                    validationSchema[name].validator['regEx'] !== undefined
                ) {
                    if (value && !validationSchema[name].validator.regEx.test(value)) {
                        error = validationSchema[name].validator.error;
                    }
                }
               
            }

            setState(prevState => ({
                ...prevState,
                [name]: { value, error, label },
            }));
        },
        [validationSchema]
    );

    const handleOnSubmit = useCallback(
        event => {
            event.preventDefault();
            setDisable(true);
            // Make sure that validateState returns false
            // Before calling the submit callback function
            let payload = {}
            if (!validateState()) {
                normalizeToPost(payload);
                callback(payload);
            }
        },
        [state]
    );

    const normalizeToPost = ((payload = {}) => {
        Object.keys(state).map(k => Object.assign(payload, { [k]: state[k].value }));
    });

    return { state, disable, handleOnChange, handleOnSubmit, setState, setDisable };
}

export default useForm;