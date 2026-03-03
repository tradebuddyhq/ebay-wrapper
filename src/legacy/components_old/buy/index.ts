import type { IConstructorOptions } from "../../";

export class Buy {
    /**
     * The Buy api's manager
     * @description The Buy api's manager
     * @param {IConstructorOptions} options
     */
    private options: IConstructorOptions = {
        api: {
        key: "",
        },
        locale: "",
    };
    
    constructor(options: IConstructorOptions) {
     this.options = options;
     void this.options
    }
}