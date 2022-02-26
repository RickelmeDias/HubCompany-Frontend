export interface IFormInput {
    title: string;
    id: string;
    placeholder: string;
    errorMessage: string;
    type: string;
    required: boolean;
    regex?: RegExp;
}

export interface IFormComponentProps {
    formProps: {
        title?: string;
        inputs: Array<IFormInput>;
        submit: {
            button: string;
            method: string;
            api: string;
            redirect?: string;
            reload?: boolean;
        },
        json?: [any[]]
        response?: React.Dispatch<any>
    }
}
