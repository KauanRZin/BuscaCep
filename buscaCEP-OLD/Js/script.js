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
        document.getElementById("RUA").value = cep.logradouro;
        document.getElementById("ddd").value = cep.ddd;
      });
    console.log("CEP FORA", cep);
  }
}
function apagar() {
  document.getElementById("CEP").value = "";
  document.getElementById("ESTADO").value = "";
  document.getElementById("CIDADE").value = "";
  document.getElementById("BAIRRO").value = "";
  document.getElementById("RUA").value = "";
  document.getElementById("ddd").value = "";
}
