let propertyToEdit = {};

const loadProperties = async () =>{
    const propertyList = document.getElementById("property-list");
    const response = await fetch("http://localhost:3000/property/list");
    const data = await response.json();
    propertyList.innerHTML = " ";
    data.map(element => {
        if(element.property == "Casa"){
            var photo = "/images/casa.jpg"
        } else if(element.property == "Apartamento"){
            var photo = "/images/apartamento.jpg"
        }
        propertyList.innerHTML += `
            <div class="property-card">
            <div class="icon-property">
            <img src="${photo}" alt="">
            </div>
            <div class="texts">
                <h5 class="type">${element.type}</h5>
                <p class="endereco">${element.address}</p>
                <p class="nome">${element.property}</p>
                <button onclick="removeProperty(${element.id})">Excluir</button>
                <button onclick="prepareToEdit(${element.id}, ${element.type}, (${element.address}),${element.rooms},${element.property})">Editar</button>
            </div>
        </div>
        `
    });
}

const removeProperty = async (id) =>{
    const response = await fetch(`http://localhost:3000/property/${id}`,{
        method : `DELETE`,
        headers : { "Content-type" : "application/json"}
    });
    const data = await response.json();
    loadProperties();
}

const createProperty = async (event) =>{
    event.preventDefault();
    const property = {
        type: event.target.type.value,
        address: event.target.address.value,
        rooms: +event.target.rooms.value,
        property: event.target.property.value,
    }

    const response = await fetch(`http://localhost:3000/property/`,{
        method : `POST`,
        headers : { "Content-type" : "application/json"},
        body: JSON.stringify(property)
    });
    
    if(response.ok){
        const data = await response.json();
        alert(data.message)
        window.location = "index.html"
        return
    }
    alert("Imovel não cadastrado")
   
}
const prepareToEdit = (id, type, address, rooms, property) =>{
    console.log("aa")
        document.getElementById("propertyId").value = id
        document.getElementById("type").value = type
        document.getElementById("address").value = address
        document.getElementById("rooms").value = rooms
        document.getElementById("property").value = property

}
const editProperty = async (event) =>{
    event.preventDefault();
    const property = {
        type: event.target.type.value,
        address: event.target.address.value,
        rooms: +event.target.rooms.value,
        property: event.target.property.value,
    }

    const response = await fetch(`http://localhost:3000/property/${+event.target.propertyId.value}`,{
        method : `PUT`,
        headers : { "Content-type" : "application/json"},
        body: JSON.stringify(property)
    });
    if(response.ok){
        const data = await response.json();
        alert(data.message)
        return
    }
    alert("Imovel não editado")

}