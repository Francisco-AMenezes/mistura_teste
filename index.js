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
      </div>`;
  } catch (error) {
    console.error("Erro ao buscar dados do cliente:", error);
    clientDetailsElement.innerHTML = `
      <div class="card-body text-danger">
        <p>Ocorreu um erro ao carregar os detalhes do cliente.</p>
      </div>`;
  }
});

document
  .getElementById("add-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    //pegando os valores do form
    const name = document.getElementById("name").value;
    const rg = document.getElementById("rg").value;
    const disc = document.getElementById("disc").value;
    const image = document.getElementById("image").value;

    try {
      //envia os dados pra api via post
      const response = await fetch("https://misturafeminina.com.br/vip.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rg, name, disc, image }),
      });

      const result = await response.json();

      // exibição da resposta do servidor
      const responseMessage = document.getElementById("response-message");
      if (response.ok) {
        responseMessage.innerHTML = `<div class="alert alert-success">${
          result.success || "Cadastro realizado com sucesso!"
        }</div>`;
      } else {
        responseMessage.innerHTML = `<div class="alert alert-danger">${
          result.error || "Erro ao cadastrar."
        }</div>`;
      }
    } catch (err) {
      console.error("Erro na requisição:", err);
      document.getElementById(
        "response-message"
      ).innerHTML = `<div class="alert alert-danger">Erro na comunicação com o servidor.</div>`;
    }
  });
