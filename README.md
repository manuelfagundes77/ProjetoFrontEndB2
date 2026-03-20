# Mini Twitter 

Projeto desenvolvido para o processo seletivo de Estagio Desenvolvedor Front-end da **B2Bit**.

##  Sobre o Projeto

Mini rede social onde usuários podem criar posts, curtir, editar e interagir com outros usuários. O projeto consome uma API REST com autenticação JWT.

O backend foi disponibilizado pela **B2Bit** via Docker e já vem populado com dados iniciais. Após subir o container, a API estará disponível em `http://localhost:3000` e a documentação interativa pode ser acessada em `http://localhost:3000/swagger`.

##  Tecnologias Utilizadas

- **React** — biblioteca principal para construção da interface
- **TypeScript** — tipagem estática
- **Vite** — bundler e servidor de desenvolvimento
- **Tailwind CSS** — estilização
- **Axios** — requisições HTTP
- **TanStack Query** — gerenciamento de estado assíncrono e cache
- **React Hook Form** — gerenciamento de formulários
- **Zod** — validação de dados
- **React Router DOM** — navegação entre páginas
- **Context API** — estado global (autenticação e tema)

##  Funcionalidades

- Cadastro e login de usuários
- Logout com invalidação do token JWT
- Feed de posts com paginação
- Busca de posts por título
- Criação de posts com imagem (validação de até 5MB)
- Edição e exclusão dos próprios posts
- Curtir e descurtir posts com feedback visual
- Modo dark/light

##  Pré-requisitos

Antes de começar, você precisará ter instalado:

- [Node.js](https://nodejs.org/) — versão **22** ou superior

Verifique as versões instaladas:
```bash
node -v
npm -v

```

##  Como rodar o projeto

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/mini-twitter.git
cd mini-twitter
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Suba o backend com Docker

Clone o repositório do backend e suba o container:
```bash
docker-compose up -d
```

Popular o banco de dados com dados iniciais:
```bash
docker-compose exec api bun run seed
```

A API estará disponível em `http://localhost:3000`.

### 4. Rode o frontend
na Pasta raiz projeto abra o terminal e digite: 
```bash
npm run dev
```

Acesse `http://localhost:5173` no navegador.

##  Usuários de Teste

| Nome | E-mail | Senha |
|------|--------|-------|
| Alice Silva | alice@example.com | password123 |
| Bob Santos | bob@example.com | password123 |
| Charlie Oliveira | charlie@example.com | password123 |

##  Estrutura do Projeto
```
src/
├── components/
│   ├── feed/
│   │   ├── CardPost.tsx
│   │   ├── FormularioCriarPost.tsx
│   │   └── Paginacao.tsx
│   └── layout/
│       ├── BotaoTema.tsx
│       ├── Header.tsx
│       └── Footer.tsx
├── ContextAPI/
│   ├── ContextoLogado.tsx
│   └── ContextoTema.tsx
├── hooks/
│   ├── useBusca.ts
│   ├── useCardPost.ts
│   └── usePosts.ts
├── pages/
│   ├── FeedMiniTwitter.tsx
│   └── TelaAcesso.tsx
├── services/
│   ├── api.ts
│   ├── autenticacao.ts
│   └── posts.ts
└── types/
    └── tipos.ts
```

## 🔑 Variáveis de Ambiente

O projeto não requer variáveis de ambiente. A URL da API está configurada em `src/services/api.ts`:
```
http://localhost:3000
```