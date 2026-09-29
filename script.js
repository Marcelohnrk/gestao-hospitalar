const dadosSalvos = localStorage.getItem("agendamentos");
const agendamentos = dadosSalvos ? JSON.parse(dadosSalvos) : [];

const form = document.getElementById("form-agendamento");
const lista = document.getElementById("lista-agendamentos");
const campoBusca = document.getElementById("campo-busca");

const campoData = document.getElementById("data-agendamento");

const hoje = new Date();
const limite = new Date();
limite.setFullYear(hoje.getFullYear() + 1);

campoData.min = hoje.toLocaleDateString("en-CA");
campoData.max = limite.toLocaleDateString("en-CA");

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

function exibirAgendamentos(listaParaExibir = agendamentos) {
    lista.innerHTML = "";

    if (listaParaExibir.length === 0) {
        lista.innerHTML = "<li>Nenhum agendamento encontrado.</li>";
        return;
    }

    listaParaExibir.forEach(function (agendamento) {
        const index = agendamentos.indexOf(agendamento);

        const item = document.createElement("li");
        item.textContent = agendamento.nome + " - " + formatarData(agendamento.data) + " - " + agendamento.tipo + " - " + agendamento.medico + " ";

        const botaoCancelar = document.createElement("button");
        botaoCancelar.textContent = "❌Cancelar";
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
}function formatarData(dataISO) {
    const partes = dataISO.split("-");
    return partes[2] + "/" + partes[1] + "/" + partes[0];
}
campoBusca.addEventListener("input", function () {
    const termo = campoBusca.value.toLowerCase();

    const filtrados = agendamentos.filter(function (agendamento) {
        return agendamento.nome.toLowerCase().includes(termo) ||
               agendamento.tipo.toLowerCase().includes(termo) ||
               agendamento.medico.toLowerCase().includes(termo);
    });

    exibirAgendamentos(filtrados);
});