# Organo

[Click here to read the English version of this Readme](#credits)

Faça um mapa organizacional da sua empresa, adicionando membros aos times de tecnologia disponíveis

| :placard: Vitrine.Dev |     |
| -------------  | --- |
| :sparkles: Nome        | **Organograma de empresa de tecnologia**
| :label: Tecnologias | React
| :rocket: URL         | https://organo-ts-nine.vercel.app
| :fire: Curso     | https://www.alura.com.br/curso-online-react-migrando-typescript

![](https://user-images.githubusercontent.com/19349339/212753062-f3894d49-cc1f-412e-95d6-1ea9115b1b69.png#vitrinedev)

## Créditos

Este projeto foi desenvolvido no curso [React: migrando para TypeScript](https://www.alura.com.br/curso-online-react-migrando-typescript) oferecido pela [Alura](https://www.alura.com.br).

Instrutores: 

- **[Paulo Silveira](https://www.linkedin.com/in/paulosilveira/)**

- **[Vinicios Neves](https://www.linkedin.com/in/vinny-neves/)**

## Detalhes do projeto

Esta é uma migração do projeto Organo para o TypeScript. 

O Organo é uma aplicação em que é possível cadastrar as pessoas colaboradoras de uma empresa e organizá-las como membros de times de tecnologia. 

O projeto original, com mais detalhes sobre sua implementação e componentes criados, pode ser visto [neste repo do GitHub](https://github.com/zingarelli/organo#detalhes-do-projeto).

Você pode ver o projeto online [clicando aqui](https://organo-ts-nine.vercel.app).

## Instalação 🛠️

O projeto foi criado com o Create React App, utilizando Node.js (versão v16.15.1) e npm (versão 8.11.0). É necessário possuir ambos instalados em sua máquina para rodar a aplicação.

Após clonar/baixar o projeto, abra um terminal, navegue até a pasta do projeto e rode o seguinte comando para instalar todas as dependências necessárias

    npm install

Após isso, você pode rodar a aplicação em modo de desenvolvimento com o seguinte comando: 

    npm start

A aplicação irá rodar no endereço http://localhost:3000.

## O que eu aprendi ✔️

### Migrando para o TypeScript (TS)

É necessário **instalar** o TS e algumas bibliotecas adicionais:

    npm install --save typescript @types/node @types/react @types/react-dom @types/jest

- `--save` informa para salvar no package.json os pacotes que serão instalados;

- `@types/{node, react, react-dom, jest}`: são **bibliotecas com tipagens adicionais** (que não vêm por padrão no TS) fornecidas pelo node, react, react-dom e jest. A motivação para instalá-las foi baseado no que havia de dependência do package.json (se seu projeto não tem o jest como dependência, por exemplo, não há necessidade de instalar a tipagem para ele).

Após instalado, precisamos criar um **arquivo de configuração `tsconfig.json`**, que contém as "regras" que desejamos que o TS siga ao avaliar/validar o código. Essas configurações dão flexibilidade para que a validação seja mais (ou menos) rigorosa. Este arquivo pode ser criado na mão ou via NPX (que já cria um arquivo com algumas configurações iniciais):

    npx tsc --init

No `tsconfig.json`, você deve adicionar a linha a seguir para informar que o JSX gerado está vindo de um projeto React

    "jsx": "react", 

Com essa regra habilitada, é necessário importar o React em todo arquivo que for utilizá-lo:

    import React from 'react';

Esse import explícito, no entanto, **não é necessário** se você fizer a seguinte alteração no `tsconfig.json` (talvez seja uma novidade na versão 16+ do React):

    "jsx": "react-jsx",

[Documentação do tsconfig](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) e [propriedades explicadas](https://www.typescriptlang.org/tsconfig).

### Convenções e dicas

Padrão de nomenclatura dos arquivos TS: quando seu componente retornar um JSX, nomeie o arquivo como `.tsx`. Outros arquivos podem ser nomeados como `.ts`. Isso auxilia tanto a IDE quanto outros programadores a diferenciarem o que se espera do arquivo.

Outro padrão que pode ser seguido é como tipar as props de um componente. Dentro do próprio componente (ou em um arquivo externo, se preferir), podemos definir uma interface (convenção de nome `NomeDoComponenteProps`) e nessa interface listar as props que são aceitas e seus tipos.

**Exemplo criando uma interface e a utilizando para tipar as props do componente `<Banner />`:**

```ts
import './Banner.css';

interface BannerProps {
    enderecoImagem: string;
    // o ? ao lado do nome significa que é uma prop opcional (aceita undefined)
    textoAlternativo?: string;
}

// posso aplicar o destruct para obter as props da interface
const Banner = ({ enderecoImagem, textoAlternativo}: BannerProps) => {
    return (
        <header className="banner">
            <img src={enderecoImagem} alt={textoAlternativo} />
        </header>
    )
}

export default Banner;
```

Funções também podem ser tipadas: 

```ts
//Exemplo de tipagem de uma prop que é função, não retorna nada e recebe como parâmetro uma string:
aoAlterado: (valor: string) => void;
```

Eventos passados como argumentos para uma função também precisam ser tipados. Segue uma **dica para descobrir o tipo do evento**: escreva uma função para o evento e depois passe o mouse no argumento de evento para que o VS Code dê uma dica do tipo dele. Caso não queira ser específico, é possível utilizar um tipo mais genérico: `React.SyntheticEvent<InputEvent>`

```ts
// No VS Code, passe o mouse sobre "e" para ver o tipo
onChange={ e => ... }
```

Uma boa prática é criar uma pasta `shared/interfaces` para colocar as interfaces de entidades que são utilizadas por diferentes componentes da aplicação. Cria-se uma interface por arquivo, com a convenção `INomeDoComponente.ts` (ts, pois não irá produzir um JSX). Desse modo, centralizo a tipagem de uma entidade em uma interface exportável, que pode ser então importada por vários componentes.

```ts
// em shared/interfaces/IColaborador.ts:
export interface IColaborador {
    nome: string;
    cargo: string;
    imagem: string;
}

// em componentes/Time/index.tsx:
import { IColaborador } from '../../shared/interfaces/IColaborador';

// posso até usá-la como tipagem dentro de outra interface
interface TimeProps {
    corPrimaria: string;
    corSecundaria: string;
    nome: string;
    colaboradores: IColaborador[] // notação para indicar que é um array
}
```

Quando usamos a exclamação (`!`) ao final de uma função que pode retornar nulo, estamos garantindo ao TS (e nos responsabilizando) que aquela função **não** retornará nulo. Dessa forma, o TS irá ignorar o possível erro que isso poderia causar. É uma forma de forçar o TS a aceitar uma situação que poderia ocasionar em retorno de null.

### Tipos JSX.Element, ReactNode e ReactElement

O ReactElement é um objeto com um tipo e props.

O ReactNode é um ReactElement, um ReactFragment, uma string, um number ou uma lista de ReactNodes, ou null, undefined ou boolean.

O JSX.Element é um ReactElement com o tipo genérico para props e type sendo any. Ele existe para permitir que outras bibliotecas implementem o JSX de seu próprio jeito customizado.

---

## Credits

This project was developed in the course "React: migrating to TypeScript" (["React: migrando para TypeScript"](https://www.alura.com.br/curso-online-react-migrando-typescript) in portuguese) from [Alura](https://www.alura.com.br).

Instructors: 

- **[Paulo Silveira](https://www.linkedin.com/in/paulosilveira/)**

- **[Vinicios Neves](https://www.linkedin.com/in/vinny-neves/)**

## Project Details

This is a migration of the Organo project, from React to TypeScript. Organo is an app in which one can register employees of a company and organize them into technology teams.

The original project, with more details about its implementation and components that were created, can be [checked in this GitHub Repo](https://github.com/zingarelli/organo).

You can view the app online [by clicking here](https://organo-ts-nine.vercel.app).

## Installation 🛠️

This project was bootstrapped with Create React App, using Node.js (version v16.15.1) and npm (version 8.11.0). You need Node.js and npm installed in order to run this project.

After cloning or downloading this project, open a terminal, navigate to the project's folder and run the following command in order to install all necessary dependencies:

    npm install

After that, you can run the app in the development mode with the following command:

    npm start

The app will run at http://localhost:3000.