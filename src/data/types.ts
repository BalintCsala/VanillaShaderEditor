export interface JSONType {
    uniforms?: [{
        name: string;
        type: string;
        count: number;
        values: number[];
    }];
}