import {useFetch} from "../../hooks/useApi";
import {NavLink} from "react-router-dom";
import {Card, Col, Container, Row} from "react-bootstrap";

export default function CategoryPage() {
    const {data: categories = []} = useFetch('/categories/');

    return (
        <Container fluid className="my-4">
            <Row>
                <h2>Category Overview</h2>
                {categories.map((category) => (
                    <Col key={category.id} md={3}>
                        <NavLink to={`/product/${category.slug}`} className="text-decoration-none">
                            <div className="p-2">
                                <Card className="h-100 shadow-sm border-0 icon-link-hover">
                                    <Card.Body className="d-flex align-items-center justify-content-center">
                                        <Card.Title className="text-center fw-bold">
                                            {category.name}
                                        </Card.Title>
                                    </Card.Body>
                                </Card>
                            </div>
                        </NavLink>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}