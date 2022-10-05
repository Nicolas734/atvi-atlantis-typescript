import { TipoDocumento } from "../enumeracoes/tipoDocumento"

export default class Documento {
    public numero: string
    public tipo: TipoDocumento
    public dataExpedicao: Date
}