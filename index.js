import { select, input } from '@inquirer/prompts';
import figlet from 'figlet';

figlet("Bem Vindos!!", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
  menu();
});

async function menu() {
    const answer = await select({
      message: 'Selecione o serviço desejado',
      choices: [
        {
          name: 'CEP',
          value: 'cep',
          description: 'Busca por CEP com múltiplos providers de fallback.',
        },
        {
          name: 'DDD',
          value: 'ddd',
          description: 'Retorna estado e lista de cidades por DDD.',
        },
        {
          name: 'Listar moedas',
          value: 'moedas',
          description: 'Retorna a lista de moedas.',
        },
        {
          name: 'Cambio',
          value: 'cotacao',
          description: 'Busca pelo câmbio do Real com outra moeda, em uma data específica.',
        },
        {
          name: 'Taxas',
          value: 'taxas',
          description: 'Retorna as taxas de juros e alguns índices oficiais do Brasil.',
        },
        {
          name: 'Sair',
          value: 'sair',
          description: 'Sair do programa.',
        }
      ],
    });  
    
    if(answer === 'cep'){
        buscarCep();
    } else if(answer === 'ddd'){
        buscarDdd();
    }else if(answer === 'moedas'){
        listaMoedas();
    }else if(answer === 'cotacao'){
        cambio();
    }else if(answer === 'taxas'){
        taxas();
    } else{
        process.exit(0);
    }
    
    return answer;
}

async function buscarCep(){
    console.clear();
    const answer = await input({ message: 'Digite o CEP...' });
    const dados = await fetch(`https://brasilapi.com.br/api/cep/v1/${answer}`);
    console.log(await dados.json());

    await menu();

}

async function buscarDdd(){
    console.clear();
    const answer = await input({ message: 'Digite o DDD...' });
    const dados = await fetch(`https://brasilapi.com.br/api/ddd/v1/${answer}`);
    console.log(await dados.json());

    await menu();
}

async function listaMoedas(){
    console.clear();
    const dados = await fetch(`https://brasilapi.com.br/api/cambio/v1/moedas`);
    console.log(await dados.json());

    await menu();
}

async function cambio(){
    try{
        console.clear();
        const answerMoeda = await input({ message: 'A moeda alvo desejada (AUD, CAD, CHF, DKK, EUR, GBP, JPY, SEK, USD): ' });
        const answerData = await input({ message: 'A data desejada, o formato deve ser: YYYY-MM-DD. Os dados só estão disponíveis a partir de 28/11/1984: ' });
        const dados = await fetch(`https://brasilapi.com.br/api/cambio/v1/cotacao/${answerMoeda}/${answerData}`);
        console.log(await dados.json());
        await menu();
    } catch(error){
        console.log(`Erro ao solicitar serviço! ${error}`);
    }
}

async function taxas(){
    console.clear();
    const dados = await fetch(`https://brasilapi.com.br/api/taxas/v1`);
    console.log(await dados.json());

    await menu();
}
