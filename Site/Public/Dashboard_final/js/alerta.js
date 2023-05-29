var alertas = [];

function obterdados(idRegistro) {
    fetch(`/medidas/tempo-real/${idRegistro}`)
        .then(resposta => {

            if (resposta.ok) {
                resposta.json().then(resposta => {

                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    alertar(resposta, idRegistro);
                });
            } else {

                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
        });

}

function alertar(resposta, idRegistro) {
    var temp = resposta[0].temperatura;

    console.log(idRegistro === resposta[0].fk_sensor)
    
    var grauDeAviso ='';


    var limites = {
        muito_quente: 23,
        quente: 22,
        ideal: 20,
        frio: 10,
        muito_frio: 5
    };

    var classe_temperatura = 'cor-alerta';

    if (temp >= limites.muito_quente) {
        classe_temperatura = 'cor-alerta perigo-quente';
        grauDeAviso = 'perigo quente'
        grauDeAvisoCor = 'cor-alerta perigo-quente'
        exibirAlerta(temp, idRegistro, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp < limites.muito_quente && temp >= limites.quente) {
        classe_temperatura = 'cor-alerta alerta-quente';
        grauDeAviso = 'alerta quente'
        grauDeAvisoCor = 'cor-alerta alerta-quente'
        exibirAlerta(temp, idRegistro, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp < limites.quente && temp > limites.frio) {
        classe_temperatura = 'cor-alerta ideal';
        removerAlerta(idRegistro);
    }
    else if (temp <= limites.frio && temp > limites.muito_frio) {
        classe_temperatura = 'cor-alerta alerta-frio';
        grauDeAviso = 'alerta frio'
        grauDeAvisoCor = 'cor-alerta alerta-frio'
        exibirAlerta(temp, idRegistro, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp <= limites.muito_frio) {
        classe_temperatura = 'cor-alerta perigo-frio';
        grauDeAviso = 'perigo frio'
        grauDeAvisoCor = 'cor-alerta perigo-frio'
        exibirAlerta(temp, idRegistro, grauDeAviso, grauDeAvisoCor)
    }

    var card;

    if (idRegistro == 1) {
        temp_aquario_1.innerHTML = temp + "°C";
        card = card_1
    } else if (idRegistro == 2) {
        temp_aquario_2.innerHTML = temp + "°C";
        card = card_2
    } else if (idRegistro == 3) {
        temp_aquario_3.innerHTML = temp + "°C";
        card = card_3
    } else if (idRegistro == 4) {
        temp_aquario_4.innerHTML = temp + "°C";
        card = card_4
    }

    card.className = classe_temperatura;
}

function exibirAlerta(temp, idRegistro, grauDeAviso, grauDeAvisoCor) {
    var indice = alertas.findIndex(item => item.idRegistro == idRegistro);

    if (indice >= 0) {
        alertas[indice] = { idRegistro, temp, grauDeAviso, grauDeAvisoCor }
    } else {
        alertas.push({ idRegistro, temp, grauDeAviso, grauDeAvisoCor });
    }

    exibirCards();
    
// Dentro da div com classe grauDeAvisoCor há um caractere "invisível", 
// que pode ser inserido clicando com o seu teclado em alt+255 ou pelo código adicionado acima.
}

function removerAlerta(idRegistro) {
    alertas = alertas.filter(item => item.idRegistro != idRegistro);
    exibirCards();
}
 
function exibirCards() {
    alerta.innerHTML = '';

    for (var i = 0; i < alertas.length; i++) {
        var mensagem = alertas[i];
        alerta.innerHTML += transformarEmDiv(mensagem);
    }
}

function transformarEmDiv({ idRegistro, temp, grauDeAviso, grauDeAvisoCor }) {
    return `<div class="mensagem-alarme">
    <div class="informacao">
    <div class="${grauDeAvisoCor}">&#12644;</div> 
     <h3>Aquário ${idRegistro} está em estado de ${grauDeAviso}!</h3>
    <small>Temperatura ${temp}.</small>   
    </div>
    <div class="alarme-sino"></div>
    </div>`;
}
