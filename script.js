document.addEventListener("DOMContentLoaded", function() {
    const updateBtn = document.getElementById('updateBtn');

    function getLocationAndZipCode() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=d55d5ac4c9e6434d854d02d1efc9fa9f`);
                const data = await response.json();

                if (data.results.length > 0) {
                    const address = data.results[0].components;
                    const zipCode = address.postcode || 'CEP não encontrado';
                    document.getElementById('cep').innerText = zipCode;
                } else {
                    document.getElementById('cep').innerText = 'CEP não encontrado';
                }
            });
        } else {
            document.getElementById('cep').innerText = 'Geolocalização não suportada';
        }
    }

    // Chama a função para obter a localização e o CEP ao carregar a página
    getLocationAndZipCode();

    // Adiciona um evento de clique ao botão "Atualizar"
    updateBtn.addEventListener('click', getLocationAndZipCode);
});

