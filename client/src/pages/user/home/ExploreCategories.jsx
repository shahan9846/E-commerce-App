import React, { useContext } from 'react'
import categoryPerfume1 from '../../../assets/images/categoryPerfume1.png'
import { ProductsContext } from '../../../contexts/ProductsContext'
import { Link } from 'react-router-dom'

const ExploreCategories = () => {

    const { products } = useContext(ProductsContext)


    return (
        <section>
            <div className="explore-categories">

                <article>
                    <div className="explore-categories_head">
                        <h1 className="explore-categories_title">Explore Categories</h1>
                        <Link to='/all-products'>See All</Link>
                    </div>
                </article>

                <article>
                    <div className="explore-categories_items">

                        {products.slice(10, 15).map((product) => (
                            <Link to={`/product/${product.id}`}>
                                <div className="explore-categories_card" key={product.id}>
                                    <div className="explore-categories_images">
                                        <img src={product.image} alt="" />
                                    </div>
                                    <div className="explore-categories_card-title">{product.title.split(" ").splice(0, 3).join(" ") + "..."}</div>
                                </div>
                            </Link>
                        ))}


                        {/* <div className="explore-categories_card">
                            <div className="explore-categories_images">
                                <img src={categoryPerfume1} alt="" />
                            </div>
                            <div className="explore-categories_card-title">Eau De Parfum</div>
                        </div>
                        <div className="explore-categories_card">
                            <div className="explore-categories_images">
                                <img src={categoryPerfume1} alt="" />
                            </div>
                            <div className="explore-categories_card-title">Eau De Parfum</div>
                        </div>
                        <div className="explore-categories_card">
                            <div className="explore-categories_images">
                                <img src={categoryPerfume1} alt="" />
                            </div>
                            <div className="explore-categories_card-title">Eau De Parfum</div>
                        </div>
                        <div className="explore-categories_card">
                            <div className="explore-categories_images">
                                <img src={categoryPerfume1} alt="" />
                            </div>
                            <div className="explore-categories_card-title">Eau De Parfum</div>
                        </div> */}
                    </div>
                </article>
            </div>
        </section>

    )
}

export default ExploreCategories