
import React, { useState, useEffect } from "react";
import {
  getProfissionaisAtivos,
  getAgendamentosDia,
  getDatasEspeciais,
  getListaEspera
} from "./homeService";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import "../../styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function HomePage() {
  const [profissionais, setProfissionais] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);
  const [datasEspeciais, setDatasEspeciais] = useState([]);
  const [listaEspera, setListaEspera] = useState([]);
  const [totalAgendamentos, setTotalAgendamentos] = useState(0);
  const [dataAtual, setDataAtual] = useState(new Date());
  const [profissionalSelecionado, setProfissionalSelecionado] = useState(null);

  useEffect(() => {
    getProfissionaisAtivos().then(setProfissionais);
    getAgendamentosDia(dataAtual).then((ags) => {
      setAgendamentos(ags);
      setTotalAgendamentos(ags.length);
    });
    getDatasEspeciais().then(setDatasEspeciais);
    getListaEspera().then(setListaEspera);
  }, [dataAtual]);

// FILTRO: Retorna apenas os agendamentos do profissional selecionado
  const agendamentosFiltrados = profissionalSelecionado
    ? agendamentos.filter(a => a.profissional_id === profissionalSelecionado.id)
    : agendamentos;

  function handleSelecionarProfissional(profissional) {
    setProfissionalSelecionado(profissional);
  }

  function handleLimparFiltro() {
    setProfissionalSelecionado(null);
  }

  return (
    <div className="container-fluid py-3 home-main">
     {/* LINHA DOS PROFISSIONAIS */}
<div className="row-profissionais-cards">
  {profissionais.map((p) => (
    <div
      key={p.id}
      className={`profissional-card d-flex align-items-center px-2 py-1 ${profissionalSelecionado && profissionalSelecionado.id === p.id ? "selected" : ""}`}
      onClick={() => handleSelecionarProfissional(p)}
      tabIndex={0}
    >
      <img
        src={p.avatar || "/img/avatar-default.png"}
        alt={p.nome}
        className="avatar-colaborador me-2"
      />
      <div className="info">
        <span className="nome">{p.nome}</span>
        <div className="qtd-agendamentos">
          <span className="qtd-agendamentos-destaque">{p.agendamentos_hoje}</span> agendamentos
        </div>
      </div>
    </div>
  ))}
  {profissionalSelecionado && (
    <button
      className="btn btn-outline-secondary btn-sm ms-2"
      onClick={handleLimparFiltro}
    >Ver todos</button>
  )}
  <div className="ms-auto">
    <span className="badge bg-primary fs-6">
      Total agendamentos hoje: {totalAgendamentos}
    </span>
  </div>
</div>
      <div className="row">
        {/* PAINEL ESQUERDO */}
        <div className="col-12 col-md-4 col-lg-3 mb-3">
          <div className="card mb-3 p-2">
            <strong>Calendário</strong>
            <MiniCalendar
              dataAtual={dataAtual}
              setDataAtual={setDataAtual}
              datasEspeciais={datasEspeciais}
            />
          </div>
          <div className="card mb-3 p-2">
            <strong>Datas especiais</strong>
            <ul className="list-unstyled mb-0" style={{ fontSize: 13 }}>
              {datasEspeciais.map((d, i) => (
                <li key={i}>
                  <i className="bi bi-gift" /> <b>{d.nome}</b> {d.data}
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-2">
            <strong>Lista de espera</strong>
            <button className="btn btn-success btn-sm mb-2">+ Add</button>
            {listaEspera.map((l, i) => (
              <div className="d-flex justify-content-between align-items-center mb-1" key={i}>
                <span>{l.nome}</span>
                <span className="badge bg-secondary">{l.tempo_espera}</span>
                <button className="btn btn-success btn-sm">✔</button>
                <button className="btn btn-danger btn-sm">✖</button>
              </div>
            ))}
          </div>
        </div>
        {/* FULLCALENDAR (PAINEL PRINCIPAL) */}
        <div className="col-12 col-md-8 col-lg-9">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridDay"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={agendamentosFiltrados.map(a => ({
              ...a,
              title: a.title,
              date: a.start,
            }))}
            locales={[ptBrLocale]}
            locale="pt-br"
            dayHeaderFormat={{ weekday: "short", day: "2-digit" }}
            dayCellContent={renderDayCellContent}
            height={650}
            nowIndicator={true}
            editable={false}
            selectable={true}
            slotLabelFormat={[
              { hour: "2-digit", minute: "2-digit", hour12: false }
            ]}
          />
        </div>
      </div>
    </div>
  );
}

// MINI CALENDÁRIO DINÂMICO (refinado)
function MiniCalendar({ dataAtual, setDataAtual, datasEspeciais }) {
  const [mes, setMes] = useState(dataAtual.getMonth());
  const [ano, setAno] = useState(dataAtual.getFullYear());

  useEffect(() => {
    setMes(dataAtual.getMonth());
    setAno(dataAtual.getFullYear());
  }, [dataAtual]);

  const diasNoMes = new Date(ano, mes + 1, 0).getDate();
  const primeiraSemana = new Date(ano, mes, 1).getDay();
  const semanas = [];
  let dias = [];
  for (let i = 0; i < primeiraSemana; i++) dias.push(null);
  for (let d = 1; d <= diasNoMes; d++) {
    dias.push(d);
    if (dias.length === 7) {
      semanas.push(dias);
      dias = [];
    }
  }
  if (dias.length) semanas.push(dias);

  const nomesDias = ["dom.", "seg.", "ter.", "qua.", "qui.", "sex.", "sáb."];
  const datasMap = datasEspeciais.reduce((map, item) => {
    map[item.data] = item;
    return map;
  }, {});

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-1">
        <button
          className="btn btn-light btn-sm"
          onClick={() => setDataAtual(new Date(ano, mes - 1, 1))}
        >&lt;</button>
        <strong>{new Date(ano, mes).toLocaleString("pt-BR", { month: "long", year: "numeric" })}</strong>
        <button
          className="btn btn-light btn-sm"
          onClick={() => setDataAtual(new Date(ano, mes + 1, 1))}
        >&gt;</button>
      </div>
      <table className="table table-sm table-borderless mb-0">
        <thead>
          <tr>
            {nomesDias.map((n, i) => (
              <th key={i} style={{ color: i === 0 ? "red" : "#333", fontWeight: 600, fontSize: 12 }}>{n}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {semanas.map((semana, i) => (
            <tr key={i}>
              {semana.map((d, j) => (
                <td
                  key={j}
                  style={{
                    background: d && new Date(ano, mes, d).toDateString() === new Date().toDateString() ? "#bee3db" : "",
                    color: d && datasMap[`${String(d).padStart(2, "0")}/${String(mes + 1).padStart(2, "0")}`] ? "#008b8b" : "#222",
                    cursor: d ? "pointer" : "default",
                    borderRadius: "40%",
                    fontWeight: d === dataAtual.getDate() ? "bold" : "",
                  }}
                  onClick={() => d && setDataAtual(new Date(ano, mes, d))}
                >
                  {d || ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="list-unstyled mt-2 mb-0" style={{ fontSize: 13 }}>
        {datasEspeciais
          .filter(d => d.data.endsWith(`/${String(mes + 1).padStart(2, "0")}`))
          .map((d, i) => (
            <li key={i} style={{ color: "#119f7f" }}>
              <b>{d.nome}</b>: {d.data}
            </li>
          ))}
      </ul>
    </div>
  );
}

// Dia customizado do calendário (ex: dom. 27)
function renderDayCellContent(arg) {
  const dia = arg.date.getDate();
  const nome = arg.date.toLocaleDateString("pt-BR", { weekday: "short" });
  return <span>{nome} {String(dia).padStart(2, "0")}</span>;
}
