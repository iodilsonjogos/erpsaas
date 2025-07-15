import axios from "axios";
const api = process.env.REACT_APP_API_URL;

// Exportar relatório (baixar Excel/PDF)
export async function exportarRelatorio(modulo, formato, filtros = {}) {
  const token = localStorage.getItem("token");
  let url = `${api}/relatorios/${modulo}`;
  let params = {};
  if (filtros.data_ini) params.data_ini = filtros.data_ini;
  if (filtros.data_fim) params.data_fim = filtros.data_fim;
  if (formato === "excel") url += "/excel";
  if (formato === "pdf") url += "/pdf";

  // Axios: download de blob (arquivo)
  const res = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
    params,
    responseType: "blob"
  });

  // Download forçado no navegador
  const blob = new Blob([res.data], { type: formato === "pdf" ? "application/pdf" : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = `${modulo}_relatorio.${formato === "pdf" ? "pdf" : "xlsx"}`;
  link.click();
}
