const campoTarefa = document.getElementById("campoTarefa");
const botaoAdicionar = document.getElementById("botaoAdicionar");
const listaTarefas = document.getElementById("listatarefas");
const botoesFiltro = document.querySelectorAll(".filtros button");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
let filtroAtual = "todas";

function salvar() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function mostrarTarefas() {
    listaTarefas.innerHTML = "";
    tarefas.forEach((tarefa, index) => {
        if (filtroAtual === "pendentes" && tarefa.concluida) return;
        if (filtroAtual === "concluidas" && !tarefa.concluida) return;

        const li = document.createElement("li");
        if (tarefa.concluida) li.classList.add("concluida");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tarefa.concluida;
        checkbox.addEventListener("change", () => concluirTarefa(index));

        const span = document.createElement("span");
        span.textContent = tarefa.texto;

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.classList.add("excluir");
        botaoExcluir.addEventListener("click", () => excluirTarefa(index));

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(botaoExcluir);
        listaTarefas.appendChild(li);
    });
}

function adicionarTarefa() {
    const texto = campoTarefa.value.trim();
    if (texto === "") return;
    tarefas.push({ texto: texto, concluida: false });
    campoTarefa.value = "";
    salvar();
    mostrarTarefas();
}

function concluirTarefa(index) {
    tarefas[index].concluida = !tarefas[index].concluida;
    salvar();
    mostrarTarefas();
}

function excluirTarefa(index) {
    tarefas.splice(index, 1);
    salvar();
    mostrarTarefas();
}

botoesFiltro.forEach((botao) => {
    botao.addEventListener("click", () => {
        filtroAtual = botao.dataset.filtro;
        botoesFiltro.forEach((b) => b.classList.remove("ativo"));
        botao.classList.add("ativo");
        mostrarTarefas();
    });
});

botaoAdicionar.addEventListener("click", adicionarTarefa);

campoTarefa.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") adicionarTarefa();
});

mostrarTarefas();