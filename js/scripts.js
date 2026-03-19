function mostrar() {
  console.log("OI ,meu cep é:", document.getElementById("CEP").value);
}

function preencher() {
  cep = document.getElementById("CEP").value;
  url = `https://viacep.com.br/ws/${cep}/json/`;
  if (cep == "") {
    alert("Coloque o cep");
  } else {
    //buscando cep usando fetch
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((cep) => {
        console.log(cep);
        document.getElementById("ESTADO").value = cep.estado;
        document.getElementById("CIDADE").value = cep.localidade;
        document.getElementById("BAIRRO").value = cep.bairro;
        document.getElementById("LUGADOURO").value = cep.logradouro;
        document.getElementById("DDD").value = cep.ddd;
        M.updateTextFields();
      });
    console.log("CEP FORA", cep);
  }
}

function apagar() {
  document.getElementById("CEP").value = "";
  document.getElementById("ESTADO").value = "";
  document.getElementById("CIDADE").value = "";
  document.getElementById("BAIRRO").value = "";
  document.getElementById("LUGADOURO").value = "";
  document.getElementById("DDD").value = "";
}
//Buscar Por cep
function MostrarRua() {
  uf = $("#Uf").val();
  cidade = $("#Uf-CIDADE").val();
  logradouro = $("#Uf-LUGADOURO").val();
  url = `https://viacep.com.br/ws/${uf}/${cidade}/${logradouro}/json/`;
  if (uf == "" || cidade == "" || logradouro == "") {
    alert("Coloque o estado, cidade e logradouro");
  } else {
  fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);

        let arrayRuas = "";

        for(let i of res){

          dadosRua = ""
          arrayRuas += `<li class="collection-item avatar">
          <span class="title">${i.cep}</span>
          <p>
            ${i.logradouro} <br>
            ${i.bairro} <br>
            ${i.localidade}<br>
            ${i.estado}<br>
            
          </p>
          <a href="#!" class="secondary-content"></a>
        </li>`
        }
        document.getElementById("lista-ruas").innerHTML = arrayRuas;

        M.updateTextFields();
      });
    }

  console.log(uf, cidade, logradouro);
}