import {useParams} from "react-router-dom";
import ProductGrid from "./Product";
import {useFetch} from "../../hooks/useApi";
import {Container} from "react-bootstrap";

export default function ProductsPage() {
    const {slug} = useParams();
    const endpoint = slug
        ? `/category/${slug}/product`
        : `/product/`;
    const { data: products = [] } = useFetch(endpoint);

    return (
        <Container fluid className="my-4 px-5">
            <div className="bg-light rounded-3 p-4 mb-4">
                <h1 className="fw-bold mb-2">
                    {slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : "All Products"}
                </h1>
                <p className="text-muted mb-0">
                    {slug ? "Browse all Mangas in this Genre" : ""}
                </p>
            </div>
            <ProductGrid products={products}/>
        </Container>
    )
}