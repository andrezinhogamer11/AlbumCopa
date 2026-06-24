# Álbum de Figurinhas da Copa do Mundo

## Nome Completo do Aluno: [Seu Nome Completo Aqui]
## Nome do Curso: [Seu Curso Aqui]
## Unidade Curricular: [Sua Unidade Curricular Aqui]

## Explicação do Conteúdo do Repositório

Este repositório contém a implementação da interface gráfica de um aplicativo de figurinhas da Copa do Mundo, desenvolvido como atividade prática. O projeto foca na arquitetura, componentização e apresentação visual, utilizando Vue 3 com Ionic e TypeScript. Todos os dados são gerenciados em vetores na memória, sem persistência externa, conforme os requisitos do exercício [1].

### Funcionalidades Implementadas:

*   **Autenticação:** Telas de Login e Cadastro com validação de campos e mensagens de erro (senhas fracas, e-mail já cadastrado).
*   **Recuperação de Senha:** Tela dedicada para simular o envio de e-mail de redefinição.
*   **Álbum de Figurinhas:** Tela principal que exibe um resumo do álbum (total e coletadas) e a lista de figurinhas.
*   **Coleção de Figurinhas:** Funcionalidade para marcar/desmarcar figurinhas como coletadas, com estado mantido em memória.
*   **Pesquisa e Filtros:** Capacidade de buscar figurinhas por nome de jogador ou seleção, e filtrar por status (todas, coletadas, pendentes).
*   **Perfil do Usuário:** Tela para exibir informações do usuário e realizar logout.
*   **Navegação:** Utilização de menu de abas (tabs) para as principais seções do aplicativo.
*   **Componentização:** Divisão da interface em componentes reutilizáveis (formulários, cards de figurinhas, cabeçalho).
*   **Composables:** Uso de composables (`useAuth`, `useAlbum`) para encapsular a lógica de autenticação e gerenciamento do álbum.

### Estrutura do Projeto:

O projeto segue uma estrutura modular para facilitar a organização e manutenção:

```
src/
├── components/       # Componentes de UI reutilizáveis (ex: LoginForm, StickerCard)
├── composables/     # Funções de lógica reutilizáveis (ex: useAuth, useAlbum)
├── data/             # Arquivos com os dados simulados (figurinhas, usuários)
├── views/            # Telas principais do aplicativo (ex: LoginPage, AlbumPage)
├── tabs/             # Componente para a navegação por abas
└── router/           # Configuração das rotas do Vue Router
```

### Tecnologias Utilizadas:

*   **Vue.js 3:** Framework progressivo para construção de interfaces de usuário.
*   **Ionic Framework:** Kit de ferramentas de UI de código aberto para construir aplicativos móveis e web de alto desempenho.
*   **TypeScript:** Superset tipado de JavaScript que adiciona tipagem estática.
*   **Vue Router:** Roteador oficial para Vue.js.
*   **Vite:** Ferramenta de build frontend que oferece uma experiência de desenvolvimento extremamente rápida.

## Como Rodar o Projeto

Para configurar e executar este projeto localmente, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter o Node.js e o npm (ou Yarn/pnpm) instalados em sua máquina.

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO]
    cd [nome-do-repositorio]
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou yarn install
    # ou pnpm install
    ```

### Execução

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
# ou yarn dev
# ou pnpm dev
```

O aplicativo estará disponível em `http://localhost:5173` (ou outra porta, dependendo da configuração do Vite).

### Credenciais de Teste

Para testar as funcionalidades de login, utilize as seguintes credenciais:

*   **E-mail:** `test@example.com`
*   **Senha:** `Password123!`

Você também pode criar novas contas através da tela de cadastro.

## Referências

[1] exercicio_album_copa.pdf (PDF fornecido para a atividade prática)

## Instalar no projeto Ionic Vue
npm intall @capacitor-community/sqlite
npx cap sync

