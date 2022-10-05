import CadastroCliente from "../negocio/cadastroCliente";
import Entrada from "./entrada";


console.log(`Bem-vindo ao cadastro de clientes do Resort Atlantis`)

let execucao = true

while(execucao){

    console.log(`\nOpções: \n`);

    // --- Menu ---
    console.log(`[1] Cliente. `);

    // --- Sair ---
    console.log();
    console.log(`[0] Sair \n`);

    let entrada = new Entrada();
    let opcao = entrada.receberNumero("Por favor, escolha uma opção");

    switch(opcao){

        case 1:
            let cadastro = new CadastroCliente();
            cadastro.cadastrar();
            break;

        case 0:
            execucao = false;
            console.log(`\nAté mais \n`);
            break;

        default:
            console.log(`\nOperação não entendida`);

    }

}
