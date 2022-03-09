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
    COLOR = "color"
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
    defaultValue: any;
    description: string;
}

export interface EnumSetting extends Setting {
    enumValues: EnumValue[];
}

export interface FloatSetting extends Setting {
    min?: number;
    max?: number;
    step?: number;
}

export interface VecSetting extends Setting {
    min?: number[];
    max?: number[];
    step?: number[];
}

export interface IntegerSetting extends Setting {
    min?: number;
    max?: number;
}

export interface BooleanSetting extends Setting {

}

export interface ShaderData {
    url: string;
    link?: string;
    name: string;
    creator: string;
    creatorLink?: string;
    description: string;
    longDescription?: string;
    thumbnail?: string;
    settings: Setting[];
}

export interface ShaderDataLink {
    name: string;
    settingsLink: string;
}