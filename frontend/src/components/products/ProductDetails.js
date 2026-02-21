import {useFetch} from "../../hooks/useApi";
import {useParams} from "react-router-dom";
import {Button, Card} from "react-bootstrap";
import {useCart} from "../cart/CartContext";


export function ProductDetails() {
    const { product_id} = useParams();
    const { data: product = {}} = useFetch(`product/${product_id}`);
    const { addToCart } = useCart()

    return (
        <div className='container-fluid'>
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <Card.Img variant="top" src={product.cover
                            ? "/images/" + product.cover
                            : "/images/op_cover.jpeg"}/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title"><strong>{product.title}</strong></h5>
                            <p className="card-text">{product.description}</p>
                            <Card.Title>{product.price} €</Card.Title>
                            <Button onClick={() => addToCart(product)}>Add to Cart</Button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}