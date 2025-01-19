
document.addEventListener("DOMContentLoaded", async function () {

    await CarregarTabela();

    const modal = document.getElementById("StaticBackdrop");
    modal.addEventListener("show.bs.modal", async function (event) {
        var botao = event.relatedTarget;
        var dataUrl = botao.getAttribute("data-url");
        await CarregarModal(dataUrl);
    })
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
        pageLength: 5,
        language:
        {
            search: "Search",
            searchPlaceholder: "",
            paginate:
            {
                previous: "Previus",
                next: "Next"
            },
            info: "Showing _START_ to _END_ of _TOTAL_ records",
            infoEmpty: "Nenhum registro disponível",
            loadingRecords: "Loading...",
            zeroRecords: "No records found",
            processing: "Processing...",
            emptyTable: "No data available"
        },
        responsive: true,
        data: [],
        columns: [
            { title: "ID" },
            { title: "Name" },
            { title: "Species" },
            { title: "Gender" },
            { title: "Card" }
        ]
    });

    return tabela;
}

function DesenharLinhaTabela(tabela, dados) {

    dados.results.forEach(item => {
        tabela.row.add([
            item.id,
            item.name,
            item.species,
            item.gender,
            RetornarImagem(item.image, item.name, item.url)
        ]);
    });
}

function RetornarImagem(pathImagem, nome, dataUrl) {

    const botao = document.createElement('button');
    botao.id = "openModalButton2";
    botao.className = 'btn';
    botao.setAttribute('data-bs-toggle', 'modal');
    botao.setAttribute('data-bs-target', '#StaticBackdrop');
    botao.setAttribute('data-url', dataUrl);
    
    const imagem = document.createElement('img');
    imagem.src = pathImagem;
    imagem.className = "border rounded-3 fa-beat";
    imagem.style.width = "75px";
    imagem.style.height = "75px";
    imagem.alt = "Imagem 3x4 - " + nome;

    botao.appendChild(imagem);

    return botao;
}

async function CarregarModal(dataUrl) {

    var dadosCharacter = await CarregarDados(dataUrl);

    document.getElementById("CardCharacterImage").src = dadosCharacter.image;
    document.getElementById("CardCharacterImage").className = "rounded-3";

    //document.getElementById("CardCharacterId").textContent = `ID: ${dadosCharacter.id}`;
    document.getElementById("CardCharacterName").textContent = `Name: ${dadosCharacter.name}`;
    document.getElementById("CardCharacterStatus").textContent = `Status: ${dadosCharacter.status}`;
    document.getElementById("CardCharacterSpecies").textContent = `Species: ${dadosCharacter.species}`;
    document.getElementById("CardCharacterType").textContent = `Type: ${dadosCharacter.type}`;
    document.getElementById("CardCharacterGender").textContent = `Gender: ${dadosCharacter.gender}`;

    var dadosCharacterOriginLocation = await CarregarDados(dadosCharacter.location.url);

    //document.getElementById("CardOriginLocationId").textContent = `ID: ${dadosCharacterOriginLocation.id}`;
    document.getElementById("CardOriginLocationName").textContent = `Name: ${dadosCharacterOriginLocation.name}`;
    document.getElementById("CardOriginLocationType").textContent = `Type: ${dadosCharacterOriginLocation.type}`;
    document.getElementById("CardOriginLocationDimension").textContent = `Dimension: ${dadosCharacterOriginLocation.dimension}`;

    var dadosCharacterLocation = await CarregarDados(dadosCharacter.location.url);

    //document.getElementById("CardLocationId").textContent = `ID: ${dadosCharacterLocation.id}`;
    document.getElementById("CardLocationName").textContent = `Name: ${dadosCharacterLocation.name}`;
    document.getElementById("CardLocationType").textContent = `Type: ${dadosCharacterLocation.type}`;
    document.getElementById("CardLocationDimension").textContent = `Dimension: ${dadosCharacterLocation.dimension}`;

    document.getElementById("CardEpisodeList").innerHTML = '';

    for (var item of dadosCharacter.episode) {

        var dadosEpisode = await CarregarDados(item);

        var lista = document.createElement("ul");
        lista.className = "list-group flex-fill list-group-horizontal justify-content-center";

        var episode = document.createElement("l1");
        episode.className = "list-group-item";
        episode.textContent = `${dadosEpisode.episode}`;

        var episodeName = document.createElement("l1");
        episodeName.className = "list-group-item";
        episodeName.textContent = `${dadosEpisode.name}`;

        lista.appendChild(episode);
        lista.appendChild(episodeName);

        document.getElementById("CardEpisodeList").appendChild(lista);
    };
}