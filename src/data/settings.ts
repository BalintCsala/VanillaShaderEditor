
import JSZip, {JSZipObject} from "jszip";
import {Format, JSONType, Setting, Type} from "./types";

type SettingsApply = {
    [key in Type]: (setting: Setting, value: any, zip: JSZip) => Promise<JSZip>
}

const SHADERS_PATH = "assets/minecraft/shaders/";
const CONST_REGEX = /^\s*const\s+(\S+)\s+(\S+)\s*=/;
const DEFINE_REGEX = /^\s*(?:\/\/\s*)?#define\s+(\S+)/;

function serializeValue(format: Format, value: any) {
    switch (format) {
        case Format.ENUM:
        case Format.FLOAT:
            return (value as number).toFixed(8);
        case Format.VEC2:
            const vec2 = value as number[];
            return `vec2(${vec2[0]}, ${vec2[1]})`;
        case Format.VEC3:
            const vec3 = value as number[];
            return `vec3(${vec3[0]}, ${vec3[1]}, ${vec3[2]})`;
        case Format.VEC4:
            const vec4 = value as number[];
            return `vec4(${vec4[0]}, ${vec4[1]}, ${vec4[2]}, ${vec4[3]})`;
        case Format.INTEGER:
            return (value as number).toFixed(0);
        case Format.BOOLEAN:
            return (value as boolean) ? "true" : "false";
    }
}

export const settingApply: SettingsApply = {
    [Type.UNIFORM]: async (setting: Setting, value: any, zip: JSZip) => {
        let files: [string, JSZipObject][] = [];
        zip.folder(SHADERS_PATH)?.forEach((relativePath, file) => {
            if (file.dir || !relativePath.endsWith(".json"))
                return;
            files.push([relativePath, file]);
        });

        await Promise.all(files.map(async ([relativePath, file]) => {
            let content = JSON.parse(await file.async("string")) as JSONType;
            let changed = false;

            for (let uniform of content.uniforms ?? []) {
                if (uniform.name === setting.name) {
                    uniform.values = (setting.format === Format.FLOAT || setting.format === Format.ENUM) ? [value] : value;
                    changed = true;
                }
            }
            if (changed) {
                let result = JSON.stringify(content);
                zip.file(SHADERS_PATH + relativePath, result);
            }
        }));

        return zip;
    },
    [Type.DEFINE]: async (setting: Setting, value: any, zip: JSZip) => {
        let files: [string, JSZipObject][] = [];
        zip.folder(SHADERS_PATH)?.forEach((relativePath, file) => {
            if (file.dir || !/\.(vsh)|(fsh)|(glsl)/g.test(relativePath))
                return;
            files.push([relativePath, file]);
        });

        await Promise.all(files.map(async ([relativePath, file]) => {
            let content = await file.async("string");
            let lines = content.split("\n");
            let changed = false;

            for (let i = 0; i < lines.length; i++) {
                const match = lines[i].match(DEFINE_REGEX);
                if (match !== null && match.length > 0) {
                    const name = match[1];
                    if (name === setting.name) {
                        if (setting.format === Format.BOOLEAN) {
                            lines[i] = `${(value as boolean) ? "// "  : ""}#define ${name}`;
                        } else {
                            lines[i] = `#define ${name} ${serializeValue(setting.format, value)}`;
                        }
                        changed = true;
                    }
                }
            }

            let result = lines.join("\n");
            if (changed) {
                zip.file(SHADERS_PATH + relativePath, result);
            }
        }));

        return zip;
    },
    [Type.CONSTANT]: async (setting: Setting, value: any, zip: JSZip) => {
        let files: [string, JSZipObject][] = [];
        zip.folder(SHADERS_PATH)?.forEach((relativePath, file) => {
            if (file.dir || !/\.(vsh)|(fsh)|(glsl)/g.test(relativePath))
                return;
            files.push([relativePath, file]);
        });

        await Promise.all(files.map(async ([relativePath, file]) => {
            let content = await file.async("string");
            let lines = content.split("\n");
            let changed = false;

            for (let i = 0; i < lines.length; i++) {
                const match = lines[i].match(CONST_REGEX);
                if (match !== null && match.length > 0) {
                    const format = match[1];
                    const name = match[2];
                    if (format === setting.format && name === setting.name) {
                        lines[i] = `const ${format} ${name} = ${serializeValue(setting.format, value)};`;
                        changed = true;
                    }
                }
            }

            let result = lines.join("\n");
            if (changed) {
                zip.file(SHADERS_PATH + relativePath, result);
            }
        }));

        return zip;
    },
};