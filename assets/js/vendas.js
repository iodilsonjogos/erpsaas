export function inicializarVendas() {
    // Exemplo de código para página de vendas
    // Exemplo: cadastrar venda, adicionar itens, calcular totais, etc.
    const form = document.getElementById('formCadastroVenda');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // ... processar venda via AJAX ...
        });
    }
}
