/*when u are fetchong and loading data this is array how to add first element
.then((data) => {
        setCategories(data);
      });*/
/*We will remove product url becaues product is coming from ther will will input url that is it is expecting url
tbody should repeat for every cartitem in array to generate a row fr every item*/

import { useEffect, useState } from "react";

export default function FakeStore() {
  const [Categories, setCategories] = useState([]);
  const [products, setProduct] = useState([]);
  const [cartItem, setCartItem] = useState([]);
  const [itemCount, setItemCount] = useState(0);

  function CountItem() {
    setItemCount(cartItem.length);
  }
  function LoadCategories() {
    fetch("https://fakestoreapi.com/products/categories")
      .then((response) => response.json())
      .then((data) => {
        data.unshift("all");
        setCategories(data);
      });
  }
  function LoadProduct(url) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      });
  }
  useEffect(() => {
    LoadCategories();
    LoadProduct("https://fakestoreapi.com/products");
  }, [cartItem.length]);
  function HandleChange(e) {
    if (e.target.value === "all") {
      LoadProduct("https://fakestoreapi.com/products");
    } else {
      LoadProduct(
        `https://fakestoreapi.com/products/category/${e.target.value}`
      );
    }
  }
  function HandleButtonClick(e) {
    alert("Item Added");
    fetch(`https://fakestoreapi.com/products/${e.target.id}`)
      .then((resp) => resp.json())
      .then((data) => {
        cartItem.push(data);
        CountItem();
      });
  }
  return (
    <div className="container-fluid">
      <header className="bg-danger text-white text-center p-2">
        <h1>
          <span className="bi bi-cart4"></span>Amazon Shopping
        </h1>
      </header>
      <section className="row">
        <nav className="col-3">
          <div>
            <label className="form-label">Select A category</label>
            <div>
              <select className="form-select" onChange={HandleChange}>
                {Categories.map((category) => (
                  <option value={category} key={category}>
                    {category.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </nav>
        <main className="col-7 d-flex flex-wrap">
          {products.map((product) => (
            <div className="card w-25 p--2 m-2">
              <img
                src={product.image}
                className="card-image-top"
                height="150"
              ></img>
              <div className="card-header">
                <p>{product.title}</p>
              </div>
              <div className="card-body">
                <dl>
                  <dt>Price</dt>
                  <dd>{product.price}</dd>
                  <dt>Rate</dt>
                  <dd>
                    <span className="bi bi-star-fill text-success"></span>
                    {product.rating.rate}
                  </dd>
                </dl>
              </div>
              <div className="card-footer">
                <button
                  id={product.id}
                  onClick={HandleButtonClick}
                  className="btn btn-danger w-100"
                >
                  <span className="bi bi-cart4"></span>Add to Card
                </button>
              </div>
            </div>
          ))}
        </main>
        <aside className="col-2">
          <button className="btn btn-danger w-100 mt-3">
            <span className="bi bi-cart4"></span>[{itemCount}]Add item
          </button>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Preview</th>
              </tr>
            </thead>
            <tbody>
              {cartItem.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>
                    <img src={item.image} width="50" height="50" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </aside>
      </section>
    </div>
  );
}
