import Header from '../common/header/index.js'

const AddSensor = {
    render: () => {
        return `
            <div class="add-sensor-page">
                <div class="add-sensor-main-wrapper">
                    ${Header.render()}
                    <main class="add-sensor-page-main">
                        <div class="add-sensor-page-page-main-top-header">
                            <h2 data-testid="add-sensor-title" class="section-title">Ajout d'un nouveau capteur</h2>
                        </div>
                        <form class="add-sensor-form" id="add-sensor-form" action="#" method="POST">
                            <fieldset>
                                <legend>Informations de base du capteur</legend>
                                <div class="form-group">
                                    <label for="sensor-name">Nom du capteur</label>
                                    <input id="sensor-name" name="name" type="text" placeholder="TempSensor" required>
                                </div>
                                <div class="form-group">
                                    <label for="sensor-type">Type du capteur</label>
                                    <input id="sensor-type" name="type" type="text" placeholder="temperature" required>
                                </div>
                            </fieldset>
                            <!-- Autres champs conservés pour l'UI -->
                            <div>
                                <button class="submit-btn" type="submit">Ajouter le capteur</button>
                            </div>
                            <div id="sensor-message" style="margin-top:1em;"></div>
                        </form>
                    </main>
                </div>
            </div>
        `
    },
    afterRender: () => {
        const form = document.getElementById('add-sensor-form');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const name = form.elements['name'].value;
                const type = form.elements['type'].value;
                const messageDiv = document.getElementById('sensor-message');
                try {
                    const res = await fetch('http://localhost:3001/sensors', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name, type })
                    });
                    const data = await res.json();
                    if (res.ok) {
                        messageDiv.textContent = `Capteur ajouté avec succès (id: ${data.id})`;
                        messageDiv.style.color = 'green';
                        form.reset();
                    } else {
                        messageDiv.textContent = data.error || 'Erreur lors de l\'ajout du capteur';
                        messageDiv.style.color = 'red';
                    }
                } catch (err) {
                    messageDiv.textContent = 'Erreur de connexion au backend';
                    messageDiv.style.color = 'red';
                }
            });
        }
    }
}

export default AddSensor
