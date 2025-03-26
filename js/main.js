const loadProperties = async () =>{
    const propertyList = document.getElementById("property-list");
    const response = await fetch("http://localhost:3000/property/list");
    const data = await response.json();
    
    data.forEach(element => {
        propertyList.innerHTML += `
            <div class="property-card">
            <div class="icon-property">
                <p>${element.property}</p>
            </div>
            <div class="texts">
                <h5 class="type">${element.type}</h5>
                <p class="endereco">${element.address}</p>
                <p class="nome">${element.property}</p>
            </div>
        </div>
        `
    });
    console.log(data);
}

loadProperties();
