export interface ResponseData<T> {
    message?: string | null;
    response: T | null;
    status: number | null;
}

export interface Township {
    id?: number;
    name: string;
    stateId?: number;
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
    code?: string;
    price?: string;
    number?: string;
    building?: string;
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