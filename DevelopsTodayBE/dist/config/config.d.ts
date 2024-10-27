type Config = {
    corsOptions: {
        origin: string | string[] | boolean;
        methods: string[];
        allowedHeaders: string[];
        credentials: boolean;
    };
};
export declare const config: () => Config;
export {};
