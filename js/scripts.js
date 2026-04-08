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
        Log("BuscarPeloCep",cep,cep.logradouro)
        M.updateTextFields();
        confetti();
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

function apagarRua() {
  document.getElementById("lista-estados").value = "";
  document.getElementById("lista-cidades").value = "";
  document.getElementById("Uf-LUGADOURO").value = "";

  document.getElementById("lista-ruas").innerHTML = ""
}
//Buscar Por cep

function buscarUfs(){
  url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/'
  listaUfs = '<option value="" disabled selected>Coloque o estado</option>'

  fetch(url)
  .then((res) => {
    return res.json();
  })
  .then((res)=> {
    for(let uf of res){
      listaUfs += `<option value="${uf.sigla}">${uf.sigla}</option>`
    }
    document.getElementById("lista-estados").innerHTML = listaUfs
    console.log(res)
  })
}


function buscarCidades(uf){
  url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
  listaCidades = '<option value="" disabled selected>Coloque o estado</option>'

  fetch(url)
  .then((res) => {
    return res.json();
  })
  .then((res)=> {
    for(let cidade of res){
      listaCidades += `<option value="${cidade.nome}">${cidade.nome}</option>`
    }
    document.getElementById("lista-cidades").innerHTML = listaCidades
    console.log(res)
  })
}
//colocar para pegar as coisas 
function MostrarRua() {
  uf = $("#lista-estados").val();
  cidade = $("#lista-cidades").val();
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
        Log("BuscarRuas","lista",arrayRuas)
        M.updateTextFields();
        confetti();
      });
    }

  console.log(uf, cidade, logradouro);
}

function Log(type,cep,rua){
  document.querySelector("tbody").innerHTML += 
  `
  <tr>
    <td>${type}</td>
    <td>${cep}</td>
    <td>${rua}</td>
  </tr>
  `
}


