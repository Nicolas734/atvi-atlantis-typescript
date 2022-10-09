import Entrada from "../app/entrada";
import { TipoDocumento } from "../enumeracoes/tipoDocumento";
import Cliente from "../modelos/cliente";
import Documento from "../modelos/documento";
import Endereco from "../modelos/endereco";
import Casdastro from "./cadastro";
import ListagemCliente from "./listagemCliente";

export default class CadastroCliente extends Casdastro{
    private entrada: Entrada

    constructor(){
        super()
        this.entrada = new Entrada()
    }

    public cadastrar(): void {

        let cliente = new Cliente()
        let endereco = new Endereco()

        this.cadastrarDadosCliente(cliente)
        this.cadastrarEndereco(cliente,endereco)
        this.cadastroDocumento(cliente)

        let dependente = new Cliente()
        dependente.nome = `Isabel Cristina Leopoldina Augusta Micaela`
        dependente.nomeSocial = `Princesa Isabel`
        dependente.dataCadastro = new Date(1921, 10, 14)
        dependente.dataNascimento = new Date(1846, 6, 29)
        dependente.endereco = (cliente.endereco.clonar() as Endereco)
        dependente.titular = cliente

        
        let listagemCliente = new ListagemCliente(cliente)
        listagemCliente.listar()
        
        console.log(dependente);

        console.log(`\n Cadastro concluído. \n`);

    }

    cadastrarDadosCliente(cliente:Cliente){

        console.log(`\nInício do cadastro do cliente.\n`);

        //  ---- dados do cliente ----
        let nome = this.entrada.receberTexto(`Por favor informe o nome do cliente: `)
        let nomeSocial = this.entrada.receberTexto(`Por favor informe o nome social do cliente: `)
        let dataNascimento = this.entrada.receberData(`Por favor informe a data de nascimento do cliente`)
        let dataCadastro = new Date().toLocaleString().split(' ')

        let cadData = dataCadastro[0].split('/')
        let ano = new Number(cadData[2].valueOf()).valueOf()
        let mes = new Number(cadData[1].valueOf()).valueOf()
        let dia = new Number(cadData[0].valueOf()).valueOf()
        let dataCadastroFormatado =  new Date(ano, mes, dia);

        cliente.nome = nome
        cliente.nomeSocial = nomeSocial
        cliente.dataNascimento = dataNascimento
        cliente.dataCadastro = dataCadastroFormatado
    }

    cadastrarEndereco(cliente:Cliente, endereco:Endereco){

        console.log(`\nInício do cadastro do endereço.\n`);

        // ---- endereco do cliente ----
        let rua = this.entrada.receberTexto(`Por favor informe a rua: `)
        let bairro = this.entrada.receberTexto(`Por favor informe o bairro: `)
        let cidade = this.entrada.receberTexto(`Por favor informe a cidade: `)
        let estado = this.entrada.receberTexto(`Por favor informe o estado: `)
        let pais = this.entrada.receberTexto(`Por favor informe o pais: `)
        let cep = this.entrada.receberTexto(`Por favor informe o CEP, no padrão xxxxx-xxx: `)

        endereco.rua = rua
        endereco.bairro = bairro
        endereco.cidade = cidade
        endereco.estado = estado
        endereco.pais = pais
        endereco.codigoPostal = cep

        cliente.endereco = endereco
    }

    cadastroDocumento(cliente:Cliente){

        let execucao = true 

        while(execucao){
            let cadastrar = this.entrada.receberTexto(`Deseja cadastrar um documento ? [ SIM / NAO ] `)
            if(cadastrar.toLocaleUpperCase() === "SIM"){
                let documento = new Documento()
                
                console.log(`\nOpções de documentos:

            [1] CPF

            [2] RG

            [3] Passaporte
                `);
                
                let opcaoTipoDocumento = this.entrada.receberNumero('Escolha um tipo de documento em que deseja cadastrar: ')
                let tipoDocumento

                switch (opcaoTipoDocumento) {
                    case 1:
                        tipoDocumento = TipoDocumento.CPF
                        break;
                    case 2:
                        tipoDocumento = TipoDocumento.RG
                        break;
                    case 3:
                        tipoDocumento = TipoDocumento.Passaporte
                        break;
                    default:
                        break;
                }

                let numero = this.entrada.receberTexto(`Digite o numero do ${tipoDocumento} por favor: `)
                let dataExpedicao = this.entrada.receberData(`Digite a data de expedição do ${tipoDocumento} por favor: `)

                documento.tipo = tipoDocumento
                documento.numero = numero
                documento.dataExpedicao = dataExpedicao
                
                cliente.documentos.push(documento)
            }else{
                execucao = false
            }
        }

    }


    //EM PROGRESSO
    cadastrartDependente(cliente:Cliente){
        let convidado = this.entrada.receberTexto(`Voçê é um convidado ? [ SIM / NAO ]`)
        if(convidado.toLocaleUpperCase() === 'SIM'){
        }
    }
    
}