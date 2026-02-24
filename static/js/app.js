const API_URL = "http://localhost:8000/api/products/";
let originalProduct = {};

document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
});

document.getElementById("productForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        stock: document.getElementById("stock").value
    };

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(() => {
            loadProducts();
            document.getElementById("productForm").reset();
        })
        .catch(error => console.error(error));
});

function loadProducts() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById("productList");
            list.innerHTML = "";

            data.forEach(product => {
                const li = document.createElement("li");
                li.className = "list-group-item d-flex justify-content-between align-items-start";

                li.innerHTML = `
                    <div>
                        <strong>${product.name}</strong><br>
                        <small>${product.description || ""}</small><br>
                        $${product.price} - Stock: ${product.stock}
                    </div>
                    <div>
                        <button class="btn btn-sm btn-secondary me-2"
                            onclick='openEditModal(${JSON.stringify(product)})'>
                            Editar
                        </button>
                        <button class="btn btn-sm btn-danger"
                            onclick="deleteProduct(${product.id})">
                            Eliminar
                        </button>
                    </div>
                `;

                list.appendChild(li);
            });
        });
}

function deleteProduct(id) {
    fetch(API_URL + id + "/", {
        method: "DELETE"
    })
        .then(() => loadProducts());
}

function openEditModal(product) {
    originalProduct = { ...product };

    document.getElementById("editId").value = product.id;
    document.getElementById("editName").value = product.name;
    document.getElementById("editDescription").value = product.description || "";
    document.getElementById("editPrice").value = product.price;
    document.getElementById("editStock").value = product.stock;

    const modal = new bootstrap.Modal(document.getElementById("editModal"));
    modal.show();
}

function updateProductPUT() {
    const id = document.getElementById("editId").value;

    const data = {
        name: document.getElementById("editName").value,
        description: document.getElementById("editDescription").value,
        price: document.getElementById("editPrice").value,
        stock: document.getElementById("editStock").value
    };

    fetch(API_URL + id + "/", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(() => {
            loadProducts();
            bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();
        });
}

function updateProductPATCH() {
    const id = document.getElementById("editId").value;

    const data = {
        name: document.getElementById("editName").value,
        description: document.getElementById("editDescription").value,
        price: document.getElementById("editPrice").value,
        stock: document.getElementById("editStock").value
    };

    fetch(API_URL + id + "/", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(() => {
            loadProducts();
            bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();
        });
}

function updateProduct() {
    const id = document.getElementById("editId").value;

    const updatedData = {
        name: document.getElementById("editName").value,
        description: document.getElementById("editDescription").value,
        price: document.getElementById("editPrice").value,
        stock: document.getElementById("editStock").value
    };

    let changedFields = {};

    Object.keys(updatedData).forEach(key => {
        if (updatedData[key] != originalProduct[key]) {
            changedFields[key] = updatedData[key];
        }
    });

    let method;
    let bodyData;

    if (Object.keys(changedFields).length === Object.keys(updatedData).length) {
        method = "PUT";
        bodyData = updatedData;
        console.log("Usando PUT");
    } else {
        method = "PATCH";
        bodyData = changedFields;
        console.log("Usando PATCH");
    }

    fetch(API_URL + id + "/", {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyData)
    })
        .then(response => response.json())
        .then(() => {
            loadProducts();
            bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();
        });
}
