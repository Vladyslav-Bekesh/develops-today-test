type Config = {
  corsOptions: {
    origin: string | string[] | boolean;
    methods: string[];
    allowedHeaders: string[];
    credentials: boolean;
  };
};
export const config = (): Config => ({
  corsOptions: {
    origin: true,
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH", "OPTIONS", "HEAD"],
    allowedHeaders: [
      "content-type",
      "access-token",
      "x-xsrf-token",
      "upload-offset",
      "upload-length",
      "upload-metadata",
      "x-http-method-override",
    ],
    credentials: true,
  },
});
