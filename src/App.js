
import './App.css';
import {useState, useEffect} from 'react'

// Custom Hook

import {useFetch} from './hooks/useFetch'

const url = "http://localhost:3000/products"

function App() {

  const [products, setProducts] = useState([])

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")

  // Custom Hook

  const {data: items, httpConfig, loading, error} = useFetch(url)

  // Resgatando Dados
  // useEffect(() => {
  //   async function fetchData() {

  //   const res = await fetch(url)

  //   const data = await res.json()

  //   setProducts(data)
  // }
  //   fetchData()
  // }, [])

  // Adição de Produtos 

  const handleSubmit = async (event) => {
    event.preventDefault()

    const products = {
      name: name,
      price: price
    }

    // const resposta = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(products),
    // })

    // // Carregamento Dinâmico 

    // const addedProduct = await resposta.json()
    // setProducts((prevProducts) => [...prevProducts, addedProduct])

    // Refatorando POST
    httpConfig(products, "POST")

    setName("")
    setPrice("")
  }

  return (
    <div className="App">
      <h1>MEUS PRODUTOS:</h1>
      {/* Loading */}
      {loading && <p> Carregando dados...</p>}
      {error && <p>{error}</p>}
      {!loading && (
        <ul>
          {items && items.map((product) => (
            <li key={product.id}>{product.name} - R${product.price}</li>
          ))}
        </ul>
      )}
      <div className="add_products">
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input type="text" value={name} name="name" onChange={(event) => setName(event.target.value)}/>
          </label>
          <label>
            Preço:
            <input type="number" value={price} name="price" onChange={(event) => setPrice(event.target.value)}/>
          </label>
          {/* State Loading no POST */}
          {loading && <input type="submit" disabled value="Aguarde..." />}
          {!loading && <input type="submit" value="Criar" />}
        </form>
      </div>
    </div>
  );
}

export default App;
