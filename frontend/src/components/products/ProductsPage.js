import {useParams} from "react-router-dom";
import ProductGrid from "./Product";
import {useFetch} from "../../hooks/useApi";

export default function ProductsPage() {
    const {slug} = useParams();
    const endpoint = slug
        ? `/category/${slug}/product`
        : `/product/`;
    const { data: products = [] } = useFetch(endpoint);

    return (
        <div className='container-fluid'>
            <h2>{slug ? `Category: ${slug.toUpperCase()}` : "All Products"}</h2>
            <ProductGrid products={products}/>
        </div>
    )
}