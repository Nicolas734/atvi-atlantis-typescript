import Entrada from "../app/entrada";
import Cliente from "../modelos/cliente";
import Endereco from "../modelos/endereco";
import Casdastro from "./cadastro";

export default class CadastroCliente extends Casdastro{
    private entrada: Entrada

    constructor(){
        super()
        this.entrada = new Entrada()
    }

    public cadastrar(): void {

        console.log(`\nInício do cadastro do cliente.\n`);

        let nome = this.entrada.receberTexto(`Por favor informe o nome do cliente`)
        let nomeSocial = this.entrada.receberTexto(`Por favor informe o nome social do cliente`)
        let dataNascimento = this.entrada.receberData('Por favor informe a data de nascimento do cliente')
        let dataCadastro = new Date().toLocaleString().split(' ')
        
        let endereco = new Endereco()
        endereco.rua = `R. do Catete`
        endereco.bairro = `Copacabana`
        endereco.cidade = `Rio de Janeiro`
        endereco.estado = `Rio de Janeiro`
        endereco.pais = `Brasil`
        endereco.codigoPostal = `22220-000`

        let cadData = dataCadastro[0].split('/')
        let ano = new Number(cadData[2].valueOf()).valueOf()
        let mes = new Number(cadData[1].valueOf()).valueOf()
        let dia = new Number(cadData[0].valueOf()).valueOf()
        let dataEmissao =  new Date(ano, mes, dia);
        
        let cliente = new Cliente()


        cliente.nome = nome
        cliente.nomeSocial = nomeSocial
        cliente.dataNascimento = dataNascimento
        cliente.dataCadastro = dataEmissao
        cliente.endereco = endereco


        let dependente = new Cliente()
        dependente.nome = `Isabel Cristina Leopoldina Augusta Micaela`
        dependente.nomeSocial = `Princesa Isabel`
        dependente.dataCadastro = new Date(1921, 10, 14)
        dependente.dataNascimento = new Date(1846, 6, 29)
        dependente.endereco = (cliente.endereco.clonar() as Endereco)
        dependente.titular = cliente

        console.log(cliente);
        console.log(dependente);

        console.log(`\n Cadastro concluído. \n`);


    }
    
}