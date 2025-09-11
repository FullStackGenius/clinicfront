import React, { useEffect, useState } from 'react'
import Header from './layouts/partials/Header'
import Footer from './layouts/partials/Footer'
import Loader from './Common/Loader';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../_helpers/axiosInstance';
interface ResourceCategory {
    id: number;
    name: string;
    status: string;
    created_at: string;
    updated_at: string;
}

interface Resource {
    id: number;
    title: string;
    resource_category_id: number;
    short_description: string;
    description: string;
    resource_image: string;
    status: string;
    created_at: string;
    updated_at: string;
    resource_image_path: string;
    resource_category: ResourceCategory;
}



function SingleResourceDetail() {

    const [loading, setLoading] = useState(true);
    const [resourceDetail, setResourceDetail] = useState<Resource | null>(null);
    const [resourceRandom, setResourceRandom] = useState<Resource[] | []>([]);
    const segment = useParams();


    useEffect(() => {
        fetchResourceDetail();
    }, []);



    const fetchResourceDetail = async () => {
        try {
            setLoading(true);
            const response: any = await axiosInstance({
                url: `resources-detail/${segment.resource_id}`,
                method: "GET",

            });

            if (response.error === "false") {
                setResourceDetail(response.data.resource)
                setResourceRandom(response.data.resrandomResourcesource)
            }
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500);

        }
    };


    return (
        <>
            <Loader isLoading={loading} />
            <Header />
            <section className="single-post-full-content">
                <div className="main-container">
                    <div className="single-banner-text">
                        <div className="single-title-block">
                            <h1>{resourceDetail?.title}</h1>
                        </div>
                        {resourceDetail?.resource_image_path &&
                            <div className="blog-featured-image">
                                <img className="img-fluid" src={resourceDetail?.resource_image_path} alt="" title="" />
                                <div className="blog-category">
                                    <span> {resourceDetail?.resource_category?.name}</span>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="post-intros-content">
                       
                        <p>{resourceDetail?.short_description}</p>
                        <hr />
                        { resourceDetail?.description && <p dangerouslySetInnerHTML={{ __html: resourceDetail?.description }} ></p> }
                        
                    </div>

                </div>
            </section>


            <section className="recent-post-section">
                <div className="main-container">
                    <div className="recent-post-title">
                        <h2>You May Also Like</h2>
                    </div>
                    <div className="resources-blog-section">
                        <div className="blog-grid-container">

                            {resourceRandom && resourceRandom.map((resource) => (
                                <div className="blog-items" key={resource.id}>
                                    <div className="blog-content-image">
                                        <div className="blog-featured-image">
                                            <div className="featured-div">
                                                <Link to={`/resource/detail/${resource.id}`}>
                                                    <img
                                                        className="img-fluid"
                                                        src={resource.resource_image_path}
                                                        alt={resource.title}
                                                        title={resource.title}
                                                    />
                                                </Link>
                                            </div>
                                            <div className="blog-category">
                                                <span>{resource.resource_category.name}</span>
                                            </div>
                                        </div>
                                        <div className="blog-content-info">
                                            <h3>
                                                <a href="#">{resource.title}</a>
                                            </h3>
                                            <p>{resource.short_description}</p>
                                        </div>
                                    </div>
                                    <div className="blog-meta-info">
                                        <div className="blog-date">
                                            <span>{new Date(resource.created_at).toDateString()}</span>
                                        </div>
                                        <div className="learn-more-btns">
                                            <Link to={`/resource/detail/${resource.id}`}>
                                                <span className="link-texts d-flex align-items-center">
                                                    <span className="name-text">Learn More</span>
                                                    <img
                                                        className="img-fluid"
                                                        src="/assets/images/learn-more-icon.svg"
                                                        alt="Learn More"
                                                    />
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}

                           
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>

    )
}

export default SingleResourceDetail