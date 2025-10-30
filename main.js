const pledges = [];
let idCounter = 1;

function submitPledge(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const profile = document.getElementById('profile').value;
    const state = document.getElementById('state').value.trim();
    const commitments = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map(cb => cb.value);
    const date = new Date().toLocaleDateString();
    const entry = {
        id: idCounter++,
        name,
        state,
        profile,
        date,
        love: "❤️".repeat(commitments.length || 1)
    };
    pledges.push(entry);
    updateKPIs();
    updateWall();
    showCertificate(name, commitments.length || 1);
    document.getElementById('pledge').reset();
}

function updateKPIs() {
    document.getElementById('totalPledges').textContent = pledges.length;
    document.getElementById('studentsCount').textContent = pledges.filter(p => p.profile === "Student").length;
    document.getElementById('prosCount').textContent = pledges.filter(p => p.profile === "Professional").length;
    document.getElementById('otherCount').textContent = pledges.filter(p => p.profile === "Other").length;
}

function updateWall() {
    const tbody = document.getElementById('pledgeWall');
    tbody.innerHTML = "";
    pledges.slice().reverse().forEach(entry => {
        tbody.innerHTML += `<tr>
            <td>${entry.id}</td>
            <td>${entry.name}</td>
            <td>${entry.date}</td>
            <td>${entry.state}</td>
            <td>${entry.profile}</td>
            <td>${entry.love}</td>
        </tr>`;
    });
}

function showCertificate(name, hearts) {
    document.getElementById('certName').textContent = name;
    document.getElementById('certHearts').textContent = "❤️".repeat(hearts);
    document.getElementById('certificate').style.display = 'block';
}
