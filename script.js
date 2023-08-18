document.getElementById("itemForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission behavior

    const priceInput = document.getElementById("price");
    const productInput = document.getElementById("product");

    const price = priceInput.value;
    const product = productInput.value;

     

    const item = {
        price: price,
        product: product,
    };

    axios
        .post("https://crudcrud.com/api/c93a3dee01874af98eba4316fa569236/details", item)
        .then((response) => {
            showItemOnScreen(response.data);
            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        });

    // Clear input fields after adding item
    priceInput.value = "";
    productInput.value = "";
});

function showItemOnScreen(item) {
    const parentEle = document.getElementById("listOfItems");
    const li = document.createElement("li");
    li.textContent = "Price: " + item.price + ", Product: " + item.product;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
        deleteItem(item._id, li); // Pass the item ID and the list item element
    });

    li.appendChild(deleteButton);

    parentEle.appendChild(li);
}
function deleteItem(itemId, listItem) {
    axios
        .delete("https://crudcrud.com/api/c93a3dee01874af98eba4316fa569236/details/" + itemId)
        .then(() => {
            listItem.remove(); // Remove the item from the screen
            console.log("Item deleted:", itemId);
        })
        .catch((err) => {
            console.log(err);
        });
}
