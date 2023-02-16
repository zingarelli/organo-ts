# Migrando para o TS

Necessário **instalar** o TS e algumas bibliotecas adicionais:

    npm install --save typescript @types/node @types/react @types/react-dom @types/jest

- `--save` informa para salvar no package.json os pacotes que serão instalados;

- `@types/{node, react, react-dom, jest}`: são **bibliotecas com tipagens adicionais** (que não vêm por padrão no TS) fornecidas pelo node, react, react-dom e jest. A motivação para instalá-las foi baseado no que havia de dependência do package.json (se seu projeto não tem o jest como dependência, por exemplo, não há necessidade de instalar a tipagem para ele).

Depois, precisamos criar um **arquivo de configuração `tsconfig.json`**, que contém as "regras" que desejamos que o TS siga ao avaliar/validar o código. Essas configurações dão flexibilidade para que a validação seja mais (ou menos) rigorosa. Este arquivo pode ser criado na mão ou via NPX (que já cria um arquivo com algumas configurações iniciais):

    npx tsc --init

- no `tsconfig.json`, você deve adicionar a linha a seguir para informar que o JSX gerado está vindo de um projeto React

    "jsx": "react", 

Agora precisa importar o React em todo arquivo que for utilizá-lo:

    import React from 'react';

- esse import explícito, no entanto, **não é necessário** se você fizer a seguinte alteração no `tsconfig.json` (talvez seja uma novidade na versão 16+ do React):


    "jsx": "react-jsx",


Padrão de nomenclatura: quando seu componente retornar um JSX, nomeie o arquivo como `.tsx`. Outros arquivos podem ser nomeados como `.ts`. Isso auxilia tanto a IDE quanto outros programadores a diferenciarem o que se espera do arquivo.

Outro padrão que pode ser seguido é como tipar as props de um componente. Dentro do próprio componente (ou em um arquivo externo, se preferir), podemos definir uma interface (convenção de nome `NomeDoComponenteProps`) e nessa interface listar as props que são aceitas e seus tipos:

```ts
import './Banner.css';

interface BannerProps {
    enderecoImagem: string;
    // o ? ao lado do nome significa que é uma prop opcional (aceita undefined)
    textoAlternativo?: string;
}

const Banner = ({ enderecoImagem, textoAlternativo}: BannerProps) => {
    return (
        <header className="banner">
            <img src={enderecoImagem} alt={textoAlternativo} />
        </header>
    )
}

export default Banner;
```

```ts
//Exemplo de tipagem de uma prop que é função, não retorna nada e recebe como parâmetro uma string:
aoAlterado: (valor: string) => void;
```

Dica para tipar eventos: escreva uma função para o evento e depois passe o mouse no argumento de evento para que o VS Code dê uma dica do tipo dele. Um tipo mais genérico é `React.SyntheticEvent<InputEvent>`

```ts
// passe o mouse sobre "e" para ver o tipo
onChange={ e => ... }
```

A pasta `shared/interfaces` é onde posso colocar as interfaces de entidades que são utilizadas por diferentes componentes da aplicação, uma interface por arquivo, com a convenção `INomeDoComponente.ts` (ts, pois não irá produzir um JSX). Desse modo, centralizo a tipagem de uma entidade em uma interface exportável, que pode ser importada por vários componentes.

```ts
// shared/interfaces/IColaborador.ts
export interface IColaborador {
    nome: string;
    cargo: string;
    imagem: string;
}

// componentes/Time/index.tsx
import { IColaborador } from '../../shared/interfaces/IColaborador';

interface TimeProps {
    corPrimaria: string;
    corSecundaria: string;
    nome: string;
    colaboradores: IColaborador[] // notação para indicar que é um array
}
```

## JSX.Element, ReactNode e ReactElement
O ReactElement é um objeto com um tipo e props.

O ReactNode é um ReactElement, um ReactFragment, uma string, um number ou uma lista de ReactNodes, ou null, undefined ou boolean.

O JSX.Element é um ReactElement com o tipo genérico para props e type sendo any. Ele existe para permitir que outras bibliotecas implementem o JSX de seu próprio jeito customizado.

# Dúvidas e TODO

- Passar o README a limpo.

- Continuar da aula de Tipos incompatíveis (só vi o vídeo, mas não codei)



---

![Integrando seu projeto React com APIs](thumbnail.png)

# Organo

O Organo é aplicação desenvolvida no curso <a href="https://cursos.alura.com.br/course/react-desenvolvendo-javascript" target="_blank">React: desenvolvendo com JavaScript</a>. 
Foi pensado e idealizado para ser o primeiro projeto em contato com o React.

<img src="screencapture.png" alt="Imagem do Organo" width="50%">


## 🔨 Funcionalidades do projeto

Você pode passear <a href="https://cursos.alura.com.br/course/react-desenvolvendo-javascript" target="_blank">no figma</a> para entender a arte conceitual do projeto.

## ✔️ Técnicas e tecnologias utilizadas

Se liga nessa lista de tudo que usaremos nessa formação:

- `React`
- `React Hooks`
- `TypeScript`

E muito mais!

## 🛠️ Abrir e rodar o projeto

Para abrir e rodar o projeto, execute `npm i` para instalar as dependências e `npm start` para inicar o projeto.

Depois, acesse <a href="http://localhost:3000/">http://localhost:3000/</a> no seu navegador.

