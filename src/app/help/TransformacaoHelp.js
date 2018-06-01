export default `
### Transformação de planilhas

Na configuração são informadas as colunas que devem ser enviadas a nova planilha criada 
e as transformações que serão aplicadas em cada coluna.

Exemplo de configuração:
\`\`\`yaml
temCabecalho: true #Informamos que há um cabeçalho, assim não aplicamos transformação na primeira linha

colunas: #Configuração das colunas
- nome: A #Informamos que queremos a coluna A
  descricao: Nome #Que vamos alterar o nome dela para Nome, essa linha não é obrigatória, assim o nome permanecerá como o original
  processadores: #Lista de processadores (vide a lista de processadores abaixo)
  - CaixaAlta
  - RemoverAcentos

- nome: C #Outra configuração de coluna
  descricao: Telefone
  processadores:
  - ConverterTexto
  - AjustarTelefone
\`\`\`

Processadores disponíveis:

* **AjustarCPF** - Ajusta uma coluna com CPFs, removendo pontuações, espaços e convertendo para texto
* **AjustarTelefone** - Ajusta uma coluna com dados de telefone para o padrão
* **CaixaAlta** - Altera os dados para estarem todos em maiúsculo
* **CaixaBaixa** - Altera os dados para estarem todos em minúsculo
* **ConverterData** - Ajusta as datas para o formato brasileiro dia/mes/ano
* **ConverterNumero** - Altera os dados de uma coluna para serem do tipo numérico
* **ConverterTexto** - Altera os dados de uma coluna para serem do tipo texto
* **RemoverAcentos** - Remove os acentos da coluna
* **RemoverEspacos** - Remove os espaços em branco da coluna
* **RemoverEspacosSobressalentes** - Remove os espaços laterais e espaços duplicados no meio do texto
* **RemoverPontuacoes** - Remove as pontuações do texto
`