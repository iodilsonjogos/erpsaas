// HomePage.jsx
import React, { useState, useEffect } from "react";
import {
  getProfissionaisAtivos,
  getAgendamentosDia,
  getDatasEspeciais,
  getListaEspera,
  confirmarListaEspera,
  excluirListaEspera
} from "./homeService";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import ListaEsperaModal from "../../components/ListaEsperaModal";
import "../../styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function HomePage() {
  const [profissionais, setProfissionais] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);
  const [datasEspeciais, setDatasEspeciais] = useState([]);
  const [listaEspera, setListaEspera] = useState([]);
  const [dataAtual, setDataAtual] = useState(new Date());
  const [visao, setVisao] = useState("timeGridDay");
  const [profissionalSelecionado, setProfissionalSelecionado] = useState(null);
  const dataFormatada = dataAtual.toISOString().split("T")[0];
  const [modalAberto, setModalAberto] = useState(false);

  const atualizarListaEspera = () => {
    getListaEspera().then(setListaEspera);
  };

  useEffect(() => {
    getProfissionaisAtivos().then(setProfissionais);
    getAgendamentosDia(dataFormatada).then(setAgendamentos);
    getDatasEspeciais().then(setDatasEspeciais);
    atualizarListaEspera();
  }, [dataAtual]);

  const agendamentosFiltrados = profissionalSelecionado
    ? agendamentos.filter((a) => a.profissional === profissionalSelecionado.nome)
    : agendamentos;

  const totalPorPeriodo = () => {
    if (visao === "dayGridMonth") return `Total no mês: ${agendamentos.length}`;
    if (visao === "timeGridWeek") return `Total na semana: ${agendamentos.length}`;
    return `Total hoje: ${agendamentos.length}`;
  };

  const handleConfirmar = (id) => {
    confirmarListaEspera(id).then(atualizarListaEspera);
  };

  const handleExcluir = (id) => {
    excluirListaEspera(id).then(atualizarListaEspera);
  };

  return (
    <div className="container-fluid py-3 home-main">
      {/* LINHA DE PROFISSIONAIS */}
      <div className="d-flex overflow-auto mb-2">
        {profissionais.map((p) => (
          <div
            key={p.id}
            className={`text-center me-2 ${profissionalSelecionado?.id === p.id ? "border border-primary" : ""
              }`}
            onClick={() => setProfissionalSelecionado(p)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={p.avatar || "/img/avatar-default.png"}
              alt={p.nome}
              className="rounded-circle"
              width={48}
              height={48}
            />
            <div style={{ fontSize: 12 }}>{p.nome.split(" ")[0]}</div>
          </div>
        ))}
        {profissionalSelecionado && (
          <button className="btn btn-sm btn-outline-secondary ms-2" onClick={() => setProfissionalSelecionado(null)}>
            Ver todos
          </button>
        )}
      </div>

      <div className="row">
        {/* LATERAL ESQUERDA */}
        <div className="col-12 col-md-4 col-lg-3 mb-3">
          <MiniCalendar
            dataAtual={dataAtual}
            setDataAtual={setDataAtual}
            datasEspeciais={datasEspeciais}
          />

          <div className="card p-2 mb-3">
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
            <button className="btn btn-success btn-sm mb-2" onClick={() => setModalAberto(true)}>+ Add</button>
            <ListaEsperaModal open={modalAberto} setOpen={setModalAberto} atualizarLista={atualizarListaEspera} />

            {listaEspera.map((l) => (
              <div
                key={l.id}
                className="d-flex justify-content-between align-items-center mb-1"
              >
                <span>{l.nome}</span>
                <span className="badge bg-secondary">{l.tempo_espera}</span>
                <button onClick={() => handleConfirmar(l.id)} className="btn btn-link p-0 text-success">✔</button>
                <button onClick={() => handleExcluir(l.id)} className="btn btn-link p-0 text-danger">✖</button>
              </div>
            ))}
          </div>
        </div>

        {/* CALENDÁRIO PRINCIPAL */}
        <div className="col-12 col-md-8 col-lg-9">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={visao}
            locale={ptBrLocale}
            headerToolbar={{
              left: "today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            dayHeaderFormat={{ weekday: "short", day: "2-digit" }}
            events={agendamentosFiltrados}
            height={650}
            nowIndicator={true}
            editable={false}
            selectable={true}
            slotLabelFormat={[{ hour: "2-digit", minute: "2-digit", hour12: false }]}
            dayCellContent={(arg) => <span>{arg.date.getDate()}</span>}
            datesSet={(arg) => setVisao(arg.view.type)}
          />
          <div className="mt-2 text-end small text-muted">{totalPorPeriodo()}</div>
        </div>
      </div>
    </div>
  );
}

// MINI CALENDÁRIO
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
    <div className="card p-2 mb-3">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <button className="btn btn-light btn-sm" onClick={() => setDataAtual(new Date(ano, mes - 1, 1))}>&lt;</button>
        <strong>{new Date(ano, mes).toLocaleString("pt-BR", { month: "long", year: "numeric" })}</strong>
        <button className="btn btn-light btn-sm" onClick={() => setDataAtual(new Date(ano, mes + 1, 1))}>&gt;</button>
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
    </div>
  );
}
