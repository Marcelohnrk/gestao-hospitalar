const dadosSalvos = localStorage.getItem("agendamentos");
const agendamentos = dadosSalvos ? JSON.parse(dadosSalvos) : [];

const form = document.getElementById("form-agendamento");
const lista = document.getElementById("lista-agendamentos");

exibirAgendamentos();

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome-paciente").value;
    const data = document.getElementById("data-agendamento").value;
    const tipo = document.getElementById("tipo-agendamento").value;
    const medico = document.getElementById("medico").value;

    const novoAgendamento = {
        nome: nome,
        data: data,
        tipo: tipo,
        medico: medico
    };

    agendamentos.push(novoAgendamento);
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
    exibirAgendamentos();
    form.reset();
});

function exibirAgendamentos() {
    lista.innerHTML = "";

    agendamentos.forEach(function (agendamento, index) {
        const item = document.createElement("li");
        item.textContent = agendamento.nome + " - " + agendamento.data + " - " + agendamento.tipo + " - " + agendamento.medico + " ";

        const botaoCancelar = document.createElement("button");
        botaoCancelar.textContent = "Cancelar";
        botaoCancelar.addEventListener("click", function () {
            removerAgendamento(index);
        });

        item.appendChild(botaoCancelar);
        lista.appendChild(item);
    });
}

function removerAgendamento(index) {
    agendamentos.splice(index, 1);
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
    exibirAgendamentos();
}