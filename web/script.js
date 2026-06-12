const API = "http://localhost:3000";

let quartos = [];

function abrirModalQuarto() {
    const modal = document.getElementById("modal-quarto");
    if (modal) modal.style.display = "flex";
}

function fecharModalQuarto() {
    const modal = document.getElementById("modal-quarto");
    if (modal) modal.style.display = "none";
}

async function carregarQuartos() {
    try {
        const res = await fetch(`${API}/quarto/listar`);
        const data = await res.json();
        quartos = data;
        renderQuartos();
    } catch (error) {
        console.error("Erro ao carregar quartos:", error);
    }
}

function renderQuartos() {
    const tbody = document.getElementById("tabela-quartos");
    if (!tbody) return;

    tbody.innerHTML = "";

    if (quartos.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align:center; color:#888;">Nenhum quarto cadastrado.</td></tr>`;
        return;
    }

    quartos.forEach(q => {
        tbody.innerHTML += `
        <tr>
            <td>${q.numero}</td>
            <td>${q.tipo}</td>
            <td>
                <button class="btn-blue" onclick="verReservas(${q.id})">Ver Reservas</button>
                <button class="btn-red" onclick="deletarQuarto(${q.id})">Excluir</button>
            </td>
        </tr>
        `;
    });
}

async function criarQuarto() {
    const numero = document.getElementById("numeroQuarto").value.trim();
    const tipo = document.getElementById("tipoQuarto").value.trim();

    if (!numero || !tipo) {
        alert("Preencha todos os campos.");
        return;
    }

    try {
        const res = await fetch(`${API}/quarto/cadastrar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ numero, tipo })
        });

        if (!res.ok) throw new Error("Erro na requisição");

        document.getElementById("numeroQuarto").value = "";
        document.getElementById("tipoQuarto").value = "";

        fecharModalQuarto();
        carregarQuartos();

    } catch (error) {
        console.error("Erro ao criar quarto:", error);
        alert("Não foi possível cadastrar o quarto.");
    }
}

async function deletarQuarto(id) {
    if (!confirm("Deseja excluir este quarto?")) return;

    try {
        const res = await fetch(`${API}/quarto/excluir/${id}`, {
            method: "DELETE"
        });

        if (!res.ok) throw new Error("Erro na requisicão");

        carregarQuartos();

    } catch (error) {
        console.error("Erro ao deletar quarto:", error);
        alert("Não foi possivel excluir o quarto.");
    }
}

function verReservas(id) {
    localStorage.setItem("quartoId", id);
    window.location.href = "reservas.html";
}

function abrirModalReserva() {
    const modal = document.getElementById("modal-reserva");
    if (modal) modal.style.display = "flex";
}

function fecharModalReserva() {
    const modal = document.getElementById("modal-reserva");
    if (modal) modal.style.display = "none";
}

async function criarReserva() {
    const quartoId = localStorage.getItem("quartoId");

    if (!quartoId) {
        alert("Nenhum quarto selecionado");
        return;
    }

    const hospede = document.getElementById("hospede").value.trim();
    const dataEntrada = document.getElementById("dataEntrada").value;
    const dataSaida = document.getElementById("dataSaida").value;

    if (!hospede || !dataEntrada || !dataSaida) {
        alert("Preencha todos os campos.");
        return;
    }

    if (new Date(dataSaida) <= new Date(dataEntrada)) {
        alert("A data de saída deve ser posterior a data de entrada.");
        return;
    }

    try {
        const res = await fetch(`${API}/reserva/cadastrar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                hospede,
                dataEntrada,
                dataSaida,
                quartoId: parseInt(quartoId)
            })
        });

        if (!res.ok) throw new Error("Erro na requisição");

        document.getElementById("hospede").value = "";
        document.getElementById("dataEntrada").value = "";
        document.getElementById("dataSaida").value = "";

        fecharModalReserva();
        carregarReservas();

    } catch (error) {
        console.error("Erro ao criar reserva:", error);
        alert("Não foi possível cadastrar a reserva.");
    }
}

async function deletarReserva(id) {
    if (!confirm("Deseja excluir esta reserva?")) return;

    try {
        const res = await fetch(`${API}/reserva/excluir/${id}`, {
            method: "DELETE"
        });

        if (!res.ok) throw new Error("Erro na requisição");

        carregarReservas();

    } catch (error) {
        console.error("Erro ao deletar reserva:", error);
        alert("Não foi possível excluir a reserva.");
    }
}

async function carregarReservas() {
    try {
        const quartoId = localStorage.getItem("quartoId");

        if (!quartoId) {
            alert("Nenhum quarto selecionado, voltando para a página principal.");
            window.location.href = "index.html";
            return;
        }

        const resQuartos = await fetch(`${API}/quarto/listar`);
        const listaQuartos = await resQuartos.json();
        const quarto = listaQuartos.find(q => q.id == quartoId);

        const titulo = document.querySelector(".titulo");
        if (titulo && quarto) {
            titulo.innerText = `Reservas do Quarto ${quarto.numero} — ${quarto.tipo}`;
        }

        const res = await fetch(`${API}/reserva/listar`);
        const reservas = await res.json();

        const filtradas = reservas.filter(r => r.quartoId == quartoId);

        const tbody = document.getElementById("tabela-reservas");
        if (!tbody) return;

        tbody.innerHTML = "";

        if (filtradas.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#888;">Nenhuma reserva encontrada.</td></tr>`;
            return;
        }

        filtradas.forEach(r => {
            tbody.innerHTML += `
            <tr>
                <td>${r.id}</td>
                <td>${r.hospede}</td>
                <td>${new Date(r.dataEntrada).toLocaleDateString("pt-BR")}</td>
                <td>${new Date(r.dataSaida).toLocaleDateString("pt-BR")}</td>
                <td>
                    <button class="btn-red" onclick="deletarReserva(${r.id})">Excluir</button>
                </td>
            </tr>
            `;
        });

    } catch (error) {
        console.error("Erro a carregar reservas:", error);
    }
}

window.onload = () => {
    if (document.getElementById("tabela-quartos")) {
        carregarQuartos();
    }

    if (document.querySelector(".titulo")) {
        carregarReservas();
    }
};