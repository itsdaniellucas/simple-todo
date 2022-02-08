import { baseUrl } from "../constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

export class ApiService {

    private static globalErrorHandler: Function = () => {};

    public static SetGlobalErrorHandler(handler: Function) {
        this.globalErrorHandler = handler;
    }

    private static async Request<T = any>(req: Partial<RequestInput>): Promise<T | null> {
        const url = `${baseUrl}/${req.endpoint}`;

        let headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }

        if(req.auth) {
            const token = await AsyncStorage.getItem('@token');

            headers = Object.assign({
                Authorization: `Bearer ${token}`
            }, headers);
        }

        try
        {
            const result = await fetch(url, {
                method: req.method,
                headers: headers,
                body: req.method == 'POST' ? JSON.stringify(req.data) : undefined,
            })

            const json = await result.json() as Promise<T>;

            if((json as any).statusCode) {
                if(this.globalErrorHandler) {
                    this.globalErrorHandler(json);
                }

                if(req.onError) {
                    req.onError(json);
                }

                return null;
            }
    
            return json;
        } catch(ex) {
            if(this.globalErrorHandler) {
                this.globalErrorHandler(ex);
            }

            if(req.onError) {
                req.onError(ex);
            }

            return null;
        }
    }

    static async Post<T = any>(endpoint: string, data?: any, onError?: Function): Promise<T> {
        return (await this.Request<T>({
            endpoint: endpoint,
            data: data,
            method: 'POST',
            onError: onError
        })) as T;
    }

    static async Get<T = any>(endpoint: string, onError?: Function): Promise<T> {
        return (await this.Request({
            endpoint: endpoint,
            method: 'GET',
            onError: onError
        })) as T;
    }

    static async PostAuth<T = any>(endpoint: string, data?: any, onError?: Function): Promise<T> {
        return (await this.Request({
            endpoint: endpoint,
            data: data,
            method: 'POST',
            auth: true,
            onError: onError
        })) as T;
    }

    static async GetAuth<T = any>(endpoint: string, onError?: Function): Promise<T> {
        return (await this.Request({
            endpoint: endpoint,
            method: 'GET',
            auth: true,
            onError: onError
        })) as T;
    }
}

export interface RequestInput {
    endpoint: string,
    data: any,
    method: string,
    auth: boolean,
    onError: Function,
}