
document.addEventListener("DOMContentLoaded", async function () {
    await CarregarTabela();
});

async function CarregarTabela() {

    var tabelaRickAndMorty = CriarTabela();

    var pathPesquisa = "https://rickandmortyapi.com/api/character";

    do {
        var dados = await CarregarDados(pathPesquisa);
        DesenharLinhaTabela(tabelaRickAndMorty, dados);
        pathPesquisa = dados.info.next;
    } while (pathPesquisa != null);

    tabelaRickAndMorty.draw();
}

async function CarregarDados(path) {

    try {
        const response = await fetch(path);
        if (!response.ok) {
            console.error("Erro Response...");
            return;
        }
        const dados = await response.json();
        return dados;
    } catch (erro) {
        console.error("Erro durante o fetch:", erro);
    };
}

function CriarTabela() {

    var tabela = $('#TabelaRickAndMorty').DataTable({
        paging: true,
        searching: true,
        ordering: true,
        lengthChange: false,
        info: true,
        pageLength: 15,
        language:
        {
            search: "Pesquisar:",
            searchPlaceholder: "",
            paginate:
            {
                previous: "Anterior",
                next: "Próximo"
            },
            info: "Mostrando de _START_ a _END_ de _TOTAL_ registros",
            infoEmpty: "Nenhum registro disponível",
            loadingRecords: "Carregando...",
            zeroRecords: "Nenhum registro encontrado",
            processing: "Processando...",
            emptyTable: "Não há dados disponíveis na tabela"
        },
        responsive: true,
        data: [],
        columns: [
            {title: "ID"},
            {title: "Name"},
            {title: "Status"},
            {title: "Species"},
            {title: "Gender"}
        ]
    });

    return tabela;
}

function DesenharLinhaTabela(tabela, dados) {

    dados.results.forEach(item => {
        tabela.row.add([
            item.id,
            item.name,
            item.status,
            item.species,
            item.gender
        ]);
    });
}
