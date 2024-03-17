export interface TypeServiceResponse {
    data: any | null,
    result: boolean,
    message: string | null,
    error: Error | null,
}

export default class ServiceResponse<T> {
    data: T | null;
    result: boolean;
    error: Error | null;
    message: string | null;
    
    constructor() {
        this.data = null;
        this.result = false;
        this.error = null;
        this.message = null;
    }

    public success(data: T, message: string) {
        this.data = data;
        this.result = true;
        this.message = message;
        return this;
    }

    public failure(error: Error | null, message: string) {
        this.error = error;
        this.result = false;
        this.message = message;
        return this;
    }

    public toJSON() : TypeServiceResponse {
        return {
            data: this.data,
            result: this.result,
            error: this.error,
            message: this.message
        };
    }
}