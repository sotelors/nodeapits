export default interface IBusinessModel {
    id: number
    keylegalrepresentative: string
    firstnamelegalrepresentative: string
    secondnamelegalrepresentative: string
    firstsurnamelegalrepresentative: string
    secondsurnamelegalrepresentative: string
    keybusiness: string
    businessname: string
    businessfantasyname: string
    apikey: string
    country: string
    department: number
    municipality: number
    description: string
    iduser: number
    active: boolean
    createdate: Date
    modifyby: number | undefined
    lastupdatedate: Date | undefined
}
