async function getWeather() {
    const apiKey = '5f94a334f8b63b3c2cad895450d92994';
    const city = document.getElementById('city').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (response.ok) {
            let weatherMain = data.weather[0].main;
            let emoji = weatherMain === "Clear" ? "☀️" : weatherMain === "Rain" ? "🌧️" : "";
            document.getElementById('result').innerText = `${weatherMain} ${emoji}`;
            
            if (weatherMain === "Rain") {
                document.body.classList.add('rain');
                addRainEffect();
            } else {
                document.body.classList.remove('rain');
                removeRainEffect();
            }
        } else {
            document.getElementById('result').innerText = 'Ошибка: ' + data.message;
        }
    } catch (error) {
        document.getElementById('result').innerText = 'Ошибка запроса';
    }
}

function addRainEffect() {
    const rainContainer = document.body;
    for (let i = 0; i < 100; i++) {
        let raindrop = document.createElement('div');
        raindrop.classList.add('raindrop');
        raindrop.style.left = Math.random() * window.innerWidth + 'px';
        raindrop.style.animationDuration = (Math.random() * 1.5 + 0.5) + 's';
        rainContainer.appendChild(raindrop);
    }
}
function removeRainEffect() {
    document.querySelectorAll('.raindrop').forEach(drop => drop.remove());
}