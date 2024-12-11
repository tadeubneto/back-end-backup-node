// rodar o arquivo em partes kkkk

const fs = require('fs');
const path = require('path');

const pasta = path.join(__dirname, 'arquivos');

const criarArquivos = async () => {

  try {   
    if (!fs.existsSync(pasta)) {
      fs.mkdirSync(pasta, { recursive: true });
      console.log('Pasta "arquivos" criada com sucesso!');
    } else {
      console.log('Pasta "arquivos" já existe!');
    }

    for (let i = 1; i <= 6; i++) {
      const caminhoArquivo = path.join(pasta, `arquivo${i}.txt`);
          
      fs.writeFileSync(caminhoArquivo, `Conteúdo do arquivo ${i}`);
      console.log(`Arquivo "arquivo${i}.txt" criado com sucesso!`);
    }

  } catch (error) {
   
    console.error('Erro ao criar a pasta ou os arquivos:', error);
  }
};

criarArquivos();

class BackupSystem {
  constructor(pastaOrigem, pastaBackup) {
    this.pastaOrigem = pastaOrigem
    this.pastaBackup = pastaBackup
    this. logFile = path.join(pastaBackup, 'backup.log')

    if(!fs.existsSync(pastaBackup)) {
      fs.mkdirSync(pastaBackup, {recursive: true})
    }
  }

  iniciar(){

    fs.watch(this.pastaOrigem, (evento, arquivo) => {
      if(arquivo.startsWith('.'))
        return;
      
      console.log(`O tipo de evento foi : ${evento}`);
      console.log(`O Arquivo alterado foi: ${arquivo}`);
      this.realizarBackup(arquivo)
    });
  }

  realizarBackup(arquivo) {
    const origem = path.join(this.pastaOrigem, arquivo)
    const destino = path.join(this.pastaBackup, arquivo)

    if(fs.existsSync(origem)){
      try{
        fs.copyFileSync(origem, destino)

        const data = new Date().toISOString()
        const logMessage = `[${data}] Backup Realizado: ${arquivo}\n`
        fs.appendFileSync(this.logFile, logMessage)

        console.log(`Backup realizado: ${arquivo}:`, erro)
      }catch (erro) {
        console.error(`Erro ao fazer o backup de ${arquivo}:`, erro)
      }
    }
  }
}
const backup = new BackupSystem('./arquivos', './pasta-backup');
backup.iniciar();



// monitoramento da pasta e arquivos 

