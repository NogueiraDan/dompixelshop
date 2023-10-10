# DompixelShop

## Sobre

Sistema de Cadastro de Produtos do Desafio Dom Pixel. 

### 📋 Lista de features

- [x] CRUD de Produtos com Nest.js 
- [x] Front da aplicação com Next.js
- [x] Página inicial com formulário para cadastro de produto
- [x] Página de Listagem de Produtos
- [x] Modal de Atualização das informações do Produto
- [x] Modal de Exlusão de Produto

### 🔧 Instalação

Instalando as dependencias:

```
npm install
```

Entre na pasta do client e instale as dependências do front também:

```
npm install
```

Após instalar todas dependências necessárias, inicie o servidor na pasta raiz com:

```
npm run start:dev
```

Em seguida, inicie o front entrando na pasta client, e rodando o script:
```
npm run dev
```

### 💭​ Observações

O servidor usa o Prisma como ORM e o SQLITE como banco de dados. Há no repositorio já a migration da tabela do banco de dados, porém se for preterido também é possivel gerar uma nova migration. 
Outro ponto que há também um seed para fazer uma população inicial do banco, para fins de testes dos endpoints.

## ✒️ Autor

* **Daniel Nogueira** - *Web Developer* - [Github](https://github.com/NogueiraDan)

