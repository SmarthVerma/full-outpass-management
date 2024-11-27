const config = {
    schema: "https://api.cartql.com",
    documents: ["src/resolvers/*.{ts,tsx}"],
    ignoreNoDocuments: true,
    generates: {
        "./gql/": {
            preset: "client",
            plugins: [],
        },
    },
};
export default config;
//# sourceMappingURL=codegen.js.map