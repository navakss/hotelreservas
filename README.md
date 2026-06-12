# hotelreservas# Hotel Reservas

Sistema web para gerenciamento de quartos e reservas de um hotel.  
O objetivo do projeto é permitir o controle de quartos disponíveis e suas respectivas reservas, integrando front-end, back-end e banco de dados.

## Funcionalidades

### Quartos
- Cadastro de quartos
- Listagem de quartos
- Exclusão de quartos

### Reservas
- Cadastro de reservas associadas a um quarto
- Listagem de reservas
- Exclusão de reservas

## Tecnologias

### Back-end
- Node.js
- Express
- Prisma
- MySQL

### Front-end
- React
- JavaScript

## Banco de dados

### Quarto
- id (INT, PK)
- numero (VARCHAR)
- tipo (VARCHAR)

### Reserva
- id (INT, PK)
- hospede (VARCHAR)
- dataEntrada (DATETIME)
- dataSaida (DATETIME)
- quartoId (INT, FK)

## Relacionamento

- Um quarto possui várias reservas
- Uma reserva pertence a um quarto

## Como executar

### Backend
```bash
cd api
npm install
npx prisma db push
npm run dev