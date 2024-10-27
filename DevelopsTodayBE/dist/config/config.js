"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const config = () => ({
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
exports.config = config;
//# sourceMappingURL=config.js.map