import Prototipo from "../interfaces/prototipo"

export default class Telefone implements Prototipo{
    public ddd: string
    public numero: string

    clonar(): Prototipo {
        let telefone = new Telefone
        telefone.ddd = this.ddd
        telefone.numero = this.numero
        return telefone
    }
}