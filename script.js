const eventos = [
  { titulo: "Introdução ao Spring Boot", data: "2026-10-03", horario: "19:00", local: "Online - Discord" },
  { titulo: "Café com Tecnologia", data: "2026-10-12", horario: "09:30", local: "Hub de Inovação" },
  { titulo: "Workshop de JavaScript", data: "2026-10-18", horario: "14:00", local: "Sala Comunidade" }
];

const formulario = document.querySelector("#form-evento");
const listaEventos = document.querySelector("#lista-eventos");
const contadorEventos = document.querySelector("#contador-eventos");
const mensagemErro = document.querySelector("#mensagem-erro");
const mensagemSucesso = document.querySelector("#mensagem-sucesso");

function formatarData(data) {
  return new Date(`${data}T00:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function criarCartaoEvento(evento) {
  const data = new Date(`${evento.data}T00:00:00`);
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = data.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "");

  const cartao = document.createElement("article");
  cartao.className = "cartao-evento";
  cartao.innerHTML = `
    <div class="data-evento"><strong>${dia}</strong><span>${mes}</span></div>
    <div class="conteudo-evento">
      <h3>${evento.titulo}</h3>
      <div class="detalhes-evento">
        <span class="hora">${formatarData(evento.data)} às ${evento.horario}</span>
        <span class="local">${evento.local}</span>
      </div>
    </div>`;
  return cartao;
}

function exibirEventos() {
  listaEventos.innerHTML = "";
  contadorEventos.textContent = `${eventos.length} ${eventos.length === 1 ? "evento" : "eventos"}`;

  if (eventos.length === 0) {
    listaEventos.innerHTML = '<p class="estado-vazio">Nenhum evento cadastrado ainda.</p>';
    return;
  }

  eventos
    .sort((a, b) => `${a.data}${a.horario}`.localeCompare(`${b.data}${b.horario}`))
    .forEach((evento) => listaEventos.appendChild(criarCartaoEvento(evento)));
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  mensagemErro.textContent = "";
  mensagemSucesso.textContent = "";

  const novoEvento = {
    titulo: formulario.titulo.value.trim(),
    data: formulario.data.value,
    horario: formulario.horario.value,
    local: formulario.local.value.trim()
  };

  if (!novoEvento.titulo || !novoEvento.data || !novoEvento.horario || !novoEvento.local) {
    mensagemErro.textContent = "Preencha todos os campos para cadastrar o evento.";
    return;
  }

  eventos.push(novoEvento);
  exibirEventos();
  formulario.reset();
  mensagemSucesso.textContent = "Evento cadastrado com sucesso!";
  formulario.titulo.focus();
});

exibirEventos();
