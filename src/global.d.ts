// src/custom.d.ts
declare module '*.module.css' {
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module '*.css' {
    const content: { [key: string]: any };
    export default content;
}
