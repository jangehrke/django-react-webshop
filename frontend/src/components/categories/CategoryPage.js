import {useFetch} from "../../hooks/useApi";
import {NavLink} from "react-router-dom";

export default function CategoryPage() {
    const {data: categories = [], error} = useFetch('/categories/');

    return (
        <div className='container-fluid'>
            <h2>Category Overview</h2>
            <ul className="list-group p-lg-3">
                {categories.map((category) => (
                    <li key={category.slug}>
                        <NavLink to={`/product/${category.slug}`} key={category.id}>
                            {category.name}
                        </NavLink>
                    </li >
                ))}
            </ul>
        </div>
    )
}