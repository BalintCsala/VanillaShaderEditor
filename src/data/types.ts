export interface JSONType {
    uniforms?: [{
        name: string;
        type: string;
        count: number;
        values: number[];
    }];
}

export enum Format {
    ENUM = "enum",
    FLOAT = "float",
    VEC2 = "vec2",
    VEC3 = "vec3",
    VEC4 = "vec4",
    INTEGER = "int",
    BOOLEAN = "bool",
}

export enum Type {
    UNIFORM = "uniform",
    CONSTANT = "constant",
    DEFINE = "define",
}

interface EnumValue {
    name?: string;
    value: number;
}

export interface Setting {
    type: Type;
    name: string;
    displayName?: string;
    format: Format;
    enumValues?: EnumValue[];
    defaultValue: any;
    description: string;
}

export interface ShaderData {
    url: string;
    link?: string;
    name: string;
    creator: string;
    creatorLink?: string;
    description: string;
    thumbnail?: string;
    settings: Setting[];
}