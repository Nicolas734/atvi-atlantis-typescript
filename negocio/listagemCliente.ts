import Cliente from "../modelos/cliente";
import Listagem from "./listagem";

export default class ListagemCliente extends Listagem{
    private cliente: Cliente

    constructor(cliente: Cliente){
        super()
        this.cliente = cliente
    }

    public listar():void {

        console.log(`\nDados do cliente cadastrado:\n`);

            console.log(`Nome: ` + this.cliente.nome);
            console.log(`Nome Social: ` + this.cliente.nomeSocial);
            console.log(`Data de Nascimento: ` + this.cliente.dataNascimento);
            console.log(`Data de Cadastro: ` + this.cliente.dataCadastro);
            console.log(`\n-- Endereço --\n`);
            
            console.log(`CEP: ` + this.cliente.endereco.codigoPostal);
            console.log(`Rua: ` + this.cliente.endereco.rua);
            console.log(`Bairro: ` + this.cliente.endereco.bairro);
            console.log(`Cidade: ` + this.cliente.endereco.cidade);
            console.log(`Estado: ` + this.cliente.endereco.estado);
            console.log(`Pais: ` + this.cliente.endereco.pais);
            console.log('\n');

        if(this.cliente.documentos.length > 0){
            console.log(`\n-- Documentos --\n`);
            this.cliente.documentos.forEach((documento) => {
                console.log(`Tipo do Documento: ` + documento.tipo);
                console.log(`Numero do ${documento.tipo}: ` + documento.numero);
                console.log(`Data de expedição do ${documento.tipo}: ` + documento.dataExpedicao);
                console.log(`\n-------------------------------\n`);
            })
        }
    }
}