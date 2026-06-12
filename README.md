# Hotel Pavan

Sistema web full-stack para gerenciamento de quartos e reservas de um hotel.

O projeto permite o cadastro de quartos, visualização de quartos cadastrados, criação de reservas vinculadas a quartos e exclusão de registros, com integração entre front-end, back-end e banco de dados.

---

## Funcionalidades

### Quartos
- Cadastro de quartos com número e tipo
- Listagem de quartos cadastrados
- Exclusão de quartos
- Acesso às reservas de cada quarto

### Reservas
- Cadastro de reservas vinculadas a um quarto
- Listagem de reservas por quarto selecionado
- Exclusão de reservas
- Visualização de dados do hóspede e datas

---

## Regras do sistema

- Um quarto pode ter várias reservas
- Cada reserva pertence a apenas um quarto
- As reservas são filtradas por quarto selecionado
- O quarto selecionado é salvo no localStorage

---

## Banco de dados (Prisma)

### Quarto
- id (Int, PK, auto incremento)
- numero (String)
- tipo (String)

### Reserva
- id (Int, PK, auto incremento)
- hospede (String)
- dataEntrada (DateTime)
- dataSaida (DateTime)
- quartoId (Int, FK)

Relacionamento:
- Quarto 1 → N Reservas

---

## Tecnologias

### Backend
- Node.js
- Express
- Prisma ORM
- MySQL
- CORS

### Frontend
- HTML
- CSS
- JavaScript (Fetch API)

---

## Estrutura do projeto

```
hotelreservas/
├── api/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── data/
│   │   └── server.js
│   ├── prisma/
│   │   └── schema.prisma
│
├── web/
│   ├── index.html
│   ├── reservas.html
│   ├── style.css
│   └── script.js
│
├── docs/
└── README.md
```

---

## Como executar

### Backend
```bash
cd api
npm install
npx prisma migrate dev
node server.js
```

Servidor:
```
http://localhost:3000
```

---

### Frontend
Abra:
```
web/index.html
```

ou use Live Server.

---

## Endpoints

### Quartos
- GET /quarto/listar
- POST /quarto/cadastrar
- DELETE /quarto/excluir/:id

### Reservas
- GET /reserva/listar
- POST /reserva/cadastrar
- DELETE /reserva/excluir/:id

---

## Fluxo do sistema

1. Criar quarto
2. Listar quartos
3. Abrir reservas de um quarto
4. Criar reservas vinculadas ao quarto
5. Excluir quartos e reservas

---

## Interface

- Layout simples estilo dashboard
- Sidebar fixa
- Tabelas para dados
- Modal para cadastro de quartos
- Botões de ação para ver e excluir

---

## Observações

- Backend precisa estar rodando para o front funcionar
- Datas devem seguir padrão YYYY-MM-DD
- Relacionamento gerenciado pelo Prisma
- Front consome API via fetch

---