import Entrada from "../app/entrada";
import { TipoDocumento } from "../enumeracoes/tipoDocumento";
import Cliente from "../modelos/cliente";
import Documento from "../modelos/documento";
import Endereco from "../modelos/endereco";
import Telefone from "../modelos/telefone";
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
        let telefone = new Telefone()

        this.cadastrarDadosCliente(cliente)
        this.cadastrarTelefone(cliente,telefone)
        this.cadastrarEndereco(cliente,endereco)
        this.cadastroDocumento(cliente)
        const dependente = this.cadastrarDependente(cliente)
        cliente.dependentes.push(...dependente)

        // let listagemCliente = new ListagemCliente(cliente)
        // listagemCliente.listar()

        console.log(cliente);
        console.log(dependente);

        console.log(`\n Cadastro concluído. \n`);

    }


    /**
     * 
     * Cadastro Dos Clientes
     */
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


    /**
     * 
     * Cadastro Dos Telefones
     */
    cadastrarTelefone(cliente:Cliente, telefone:Telefone){
        console.log(`\nInício do cadastro do telefone.\n`);

        let execucao:Boolean = true

        while(execucao){
            let cadastrar = this.entrada.receberTexto(`Deseja cadastrar um telefone ? [ SIM / NAO ] `)
            if(cadastrar.toLocaleUpperCase() === "SIM"){
                let dddNumero = this.entrada.receberTexto(`Por favor informe o DDD e o numero de telefone, no padrão (xx) xxxx-xxxx: `)

                let separacao = dddNumero.split(')')
                let dadosNumero = separacao[0] + ")-" + separacao[1]

                let numeroEddd = dadosNumero.split("-")

                let ddd = new String(numeroEddd[0].valueOf()).valueOf()
                let numero = new String(numeroEddd[1].valueOf()).valueOf()

                telefone.ddd = ddd
                telefone.numero = numero

                cliente.telefones.push(telefone)
                console.log('\n');

            }else{
                execucao = false
            }
        }

    }


    /**
     * 
     * Cadastro Do Endereco
     */
    cadastrarEndereco(cliente:Cliente, endereco:Endereco){

        console.log(`\nInício do cadastro do endereço.\n`);
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


    /**
     * 
     * Cadastro Dos Documentos
     */
    cadastroDocumento(cliente:Cliente){
        let execucao:Boolean = true

        while(execucao){
            console.log('\n');
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
                let dataExpedicao = this.entrada.receberData(`Digite a data de expedição do ${tipoDocumento}`)
                documento.tipo = tipoDocumento
                documento.numero = numero
                documento.dataExpedicao = dataExpedicao
                cliente.documentos.push(documento)
            }else{
                execucao = false
            }
        }
    }


    /**
     * 
     * Cadastro Dos Dependentes
     */
    cadastrarDependente(titular:Cliente){
        let execucao:Boolean = true
        let dependentes:Array<Cliente> = []

        while(execucao){

            console.log('\n');
            let convidado = this.entrada.receberTexto(`Deseja cadastrar um convidado para este titular ? [ SIM / NAO ] `)

            if(convidado.toLocaleUpperCase() === 'SIM'){
                let dependente = new Cliente()
                let nome = this.entrada.receberTexto(`Por favor informe o nome do convidado: `)
                let nomeSocial = this.entrada.receberTexto(`Por favor informe o nome social do convidado: `)
                let dataNascimento = this.entrada.receberData(`Por favor informe a data de nascimento do convidado`)
                let dataCadastro = new Date().toLocaleString().split(' ')
                let cadData = dataCadastro[0].split('/')
                let ano = new Number(cadData[2].valueOf()).valueOf()
                let mes = new Number(cadData[1].valueOf()).valueOf()
                let dia = new Number(cadData[0].valueOf()).valueOf()
                let dataCadastroFormatado =  new Date(ano, mes, dia);
                dependente.nome = nome
                dependente.nomeSocial = nomeSocial
                dependente.dataNascimento = dataNascimento
                dependente.dataCadastro =dataCadastroFormatado
                dependente.endereco = (titular.endereco.clonar() as Endereco)
                dependente.telefones.push(titular.telefones[0].clonar() as Telefone)
                dependente.titular = titular
                dependentes.push(dependente)

            }else{
                execucao = false
                return dependentes
            }
        }
    }
}