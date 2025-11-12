// Verifica usuário logado
function checkUser() {
  const user = localStorage.getItem('user');
  if (!user) window.location.href = 'cadastro.html';
}

// Salva usuário
function saveUser(name,email,avatar){
  const user = {name,email,avatar:avatar||''};
  localStorage.setItem('user',JSON.stringify(user));
}

// Carrega perfil
function loadProfile(){
  const user = JSON.parse(localStorage.getItem('user'));
  if(!user) return;
  document.getElementById('profileName').innerText = user.name;
  document.getElementById('profileEmail').innerText = user.email;
  document.getElementById('profileAvatar').src = user.avatar || 'assets/img/default-avatar.png';
}

// Inicializa mapa
function initMap(){
  if(!document.getElementById('map')) return;

  const bounds = [[-4.650, -40.950], [-4.550, -40.800]];
  const map = L.map('map',{center:[-4.60,-40.875],zoom:12,maxBounds:bounds,maxBoundsViscosity:1.0});

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',{
    attribution:'&copy; OpenStreetMap &copy; CARTO',
    subdomains:'abcd',maxZoom:19
  }).addTo(map);

  const icon = L.icon({iconUrl:'https://cdn-icons-png.flaticon.com/512/684/684908.png',iconSize:[32,32],iconAnchor:[16,32]});

  const pontos = [
    {nome:'Pires Ferreira - Centro', coords:[-4.311,-40.663]},
    {nome:'Ipu - Centro', coords:[-4.323,-40.710]}
  ];

  pontos.forEach(p=>L.marker(p.coords,{icon}).addTo(map).bindPopup(`<b>${p.nome}</b><br>Área de coleta.`));
}

window.onload = ()=>{
  checkUser();
  loadProfile();
  initMap();
};
function initMap(){
  if(!document.getElementById('map')) return;

  // Limites do mapa (Pires Ferreira e Ipu)
  const bounds = [[-4.650, -40.950], [-4.550, -40.800]];

  // Cria o mapa
  const map = L.map('map', {
    center: [-4.60, -40.875],
    zoom: 12,
    maxBounds: bounds,
    maxBoundsViscosity: 1.0,
  });

  // TileLayer OpenStreetMap estilo escuro
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  // Ícone personalizado
  const truckIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  });

  // Pontos de rastreamento
  const trucks = [
    { name: 'Pires Ferreira - Centro', coords: [-4.311, -40.663] },
    { name: 'Ipu - Centro', coords: [-4.323, -40.710] }
  ];

  // Adiciona marcadores
  trucks.forEach(truck => {
    L.marker(truck.coords, { icon: truckIcon })
      .addTo(map)
      .bindPopup(`<b>${truck.name}</b><br>Área de coleta`);
  });

  // Atualiza info-card com localização (simulação)
  const locationElement = document.getElementById('currentLocation');
  const updateElement = document.getElementById('lastUpdate');
  if(locationElement) locationElement.innerText = trucks[0].name;
  if(updateElement) updateElement.innerText = new Date().toLocaleTimeString();
}
function initMap() {
  if(!document.getElementById('map')) return;

  // Limites do mapa
  const bounds = [[-4.650, -40.950], [-4.550, -40.800]];

  // Cria o mapa
  const map = L.map('map', {
    center: [-4.60, -40.875],
    zoom: 12,
    maxBounds: bounds,
    maxBoundsViscosity: 1.0,
  });

  // TileLayer OpenStreetMap (estilo escuro)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  // Ícone do caminhão
  const truckIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  });

  // Ponto inicial do caminhão
  const path = [
    [-4.311, -40.663],
    [-4.315, -40.670],
    [-4.318, -40.680],
    [-4.323, -40.690],
    [-4.323, -40.710]
  ];

  let index = 0;

  const marker = L.marker(path[index], { icon: truckIcon }).addTo(map)
    .bindPopup("<b>Pires Ferreira - Centro</b><br>Área de coleta")
    .openPopup();

  // Atualiza info-card
  const locationElement = document.getElementById('currentLocation');
  const updateElement = document.getElementById('lastUpdate');

  function updateTruck() {
    index++;
    if(index >= path.length) index = 0; // loop
    const pos = path[index];
    marker.setLatLng(pos);
    const locationName = index < path.length-1 ? "Caminhão em rota" : "Ipu - Centro";
    if(locationElement) locationElement.innerText = locationName;
    if(updateElement) updateElement.innerText = new Date().toLocaleTimeString();
    marker.getPopup().setContent(`<b>${locationName}</b><br>Área de coleta`);
  }

  // Atualiza a cada 3 segundos
  setInterval(updateTruck, 3000);
}
// Verifica usuário cadastrado
function checkUser() {
  const user = localStorage.getItem('user');
  if (!user) window.location.href = 'cadastro.html';
}

// Carrega perfil
function loadProfile() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return;
  document.getElementById('profileName').innerText = user.name;
  document.getElementById('profileEmail').innerText = user.email;
  const avatarImg = document.getElementById('profileAvatar');
  avatarImg.src = user.avatar || 'assets/img/default-avatar.png';
}
