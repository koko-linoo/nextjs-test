export interface ResponseData<T> {
    message?: string | null;
    response: T | null;
    status: number | null;
}

export interface State {
    id?: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface Township {
    id?: number;
    name: string;
    stateId?: number;
    state?: State;
    createdAt: string;
    updatedAt: string;
}

export interface PropertyType {
    id?: number;
    code: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface FileDB {
    id?: number;
    key: string;
    url: string;
    sourceId?: number;
    sourceName?: string;
}

export interface Estate {
    title?: string;
    id?: number;
    length?: number;
    width?: number;
    area?: number;
    code?: string;
    price?: string;
    no?: string;
    street1?: string;
    street2?: string;
    building?: string;
    floor?: string;
    agentName?: string;
    agentPhone?: string;
    ownerName?: string;
    ownerPhone?: string;
    townshipId?: number;
    township?: Township;
    propertyTypeId?: number;
    propertyType?: PropertyType;
    typeId?: number;
    type?: string;
    unit?: string;
    contactPhono?: string;
    contactPhonoOne?: string;
    contactPhonoTwo?: string;
    files: FileDB[] | [];
    description?: string;
}