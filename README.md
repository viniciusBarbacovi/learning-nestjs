# Inventory Hub - Sistema de Gestão de Inventário Multi-Tenant

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)

<br>

> Sistema de gestão de inventário SaaS, projetado com uma arquitetura back-end para atender às necessidades de pequenos negócios.

<br>


## 🎯 Sobre o Projeto

O Inventory Hub nasceu como uma solução para um problema comum em pequenos negócios: a falta de uma ferramenta acessível e eficiente para controle de estoque. A proposta é oferecer uma plataforma onde múltiplos negócios (tenants) possam gerenciar seus inventários de forma isolada e segura.

### Funcionalidades Implementadas (V1):

- ✅ **Autenticação de Usuários:** Sistema completo de registro e login com JWT.
- ✅ **Gestão de Perfil:** Usuários podem visualizar, atualizar e deletar suas próprias contas.
- ✅ **Arquitetura Multi-Tenant:**
    - Um usuário pode criar e ser membro de múltiplas empresas.
    - Isolamento total dos dados entre as empresas.
- ✅ **Sistema de Permissões (RBAC):**
    - Diferenciação entre `OWNER` (proprietário) e `EMPLOYEE` (funcionário).
    - `OWNERs` têm controle administrativo total sobre a empresa.
    - `EMPLOYEEs` têm acesso de apenas leitura.
- ✅ **CRUD Completo de Inventário:**
    - Gestão de Produtos (Criação, Leitura, Atualização, Deleção).
    - Gestão de Categorias.
- ✅ **Sistema de Convites:** `OWNERs` podem gerar códigos de convite para adicionar `EMPLOYEEs` à sua empresa.

---

## 💻 Tecnologias Utilizadas

- **Back-end:**
    - [NestJS](https://nestjs.com/)
    - [TypeScript](https://www.typescriptlang.org/)
    - [Prisma](https://www.prisma.io/)
    - [PostgreSQL](https://www.postgresql.org/)
    - [JWT](https://jwt.io/) para autenticação
    - [Passport.js](http://www.passportjs.org/) para estratégias de autenticação
    - [Class-Validator](https://github.com/typestack/class-validator) & [Class-Transformer](https://github.com/typestack/class-transformer) para validação de DTOs
 
      
## 🚀 Guia de Instalação e Execução

**Pré-requisitos:** Node.js, Docker (ou uma instância local do PostgreSQL).

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/](https://github.com/)[SEU-USUARIO]/[NOME-DO-REPOSITORIO].git
    ```

2.  **Instale as dependências do Back-end:**
    ```bash
    cd [NOME-DO-REPOSITORIO]
    npm install
    ```

3.  **Configure o Ambiente:**
    - Renomeie o arquivo `.env.example` para `.env`.
    - Preencha a variável `DATABASE_URL` com a sua string de conexão do PostgreSQL.
    ```
    DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME"
    ```

4.  **Aplique as migrações do banco de dados:**
    ```bash
    npx prisma migrate dev
    ```

5.  **Inicie a aplicação em modo de desenvolvimento:**
    ```bash
    npm run start:dev
    ```
    O servidor estará disponível em `http://localhost:3000`.

---


## 📫 Contato

**[Vinícius Paulo Barbacovi]**

- **LinkedIn:** [https://www.linkedin.com/in/viniciusbarbacovi/](https://www.linkedin.com/in/viniciusbarbacovi/)
- **E-mail:** [viniciusbarbacovi@gmail.com](mailto:viniciusbarbacovi@gmail.com)
