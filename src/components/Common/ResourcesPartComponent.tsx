import React from 'react'
import helpers from '../../_helpers/common';
import { Link } from 'react-router-dom';

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
interface ResourceCategory {
    id: number;
    name: string;
    status: string;
    created_at: string;
    updated_at: string;
}
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(date);
};
const ResourcesPartComponent: React.FC<{ resource: Resource }> = ({ resource }) => (
    <div className="blog-items">
        <div className="blog-content-image">
            <div className="blog-featured-image">
                <div className="featured-div"><Link to={`/resource/detail/${resource.id}`} ><img className="img-fluid" src={resource.resource_image_path} alt="" title="" /></Link></div>
                <div className="blog-category">
                    <span>{resource.resource_category.name}</span>
                </div>
            </div>
            <div className="blog-content-info">
                <h3><a href="#">{resource.title}</a></h3>
                <p>{resource.short_description}</p>
            </div>
        </div>
        <div className="blog-meta-info">
            <div className="blog-date">
                <span>{formatDate(resource.created_at)}</span>
            </div>
            <div className="learn-more-btns">
                <Link to={`/resource/detail/${resource.id}`}>
                    <span className="link-texts d-flex align-items-center">
                        <span className="name-text">Learn More</span>
                        <img className="img-fluid" src="/assets/images/learn-more-icon.svg" alt="" title="" />
                    </span>
                </Link>
            </div>
        </div>
    </div>
);


export default ResourcesPartComponent