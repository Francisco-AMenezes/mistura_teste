document.addEventListener("DOMContentLoaded", async () => {
  const clientDetailsElement = document.getElementById("client-details");

  // Extrai o RG da URL
  const urlParams = new URLSearchParams(window.location.search);
  const rg = urlParams.get("rg");

  if (!rg) {
    clientDetailsElement.innerHTML = `
      <div class="card-body text-danger">
        <p>RG não especificado na URL.</p>
      </div>`;
    return;
  }

  try {
    // Faz a requisição para a API
    const response = await fetch(
      `https://misturafeminina.com.br/vip.php?rg=${rg}`,
      { timeout: 10000 }
    );
    const client = (await response.json())[0];
    console.log(client);

    if (!response.ok || !client.name) {
      clientDetailsElement.innerHTML = `
        <div class="card-body text-danger">
          <p>Cliente não encontrado.</p>
        </div>`;
      return;
    }

    // Renderiza os detalhes do cliente
    clientDetailsElement.innerHTML = `
      <div class="card-body">
        <h2>${client.name}</h2>
        <p><strong>RG:</strong> ${client.rg}</p>
        <p><strong>Desconto:</strong> ${client.disc}%</p>
         <p><strong>Foto</strong> ${client.image}%</p>
      </div>`;
  } catch (error) {
    console.error("Erro ao buscar dados do cliente:", error);
    clientDetailsElement.innerHTML = `
      <div class="card-body text-danger">
        <p>Ocorreu um erro ao carregar os detalhes do cliente.</p>
      </div>`;
  }
});