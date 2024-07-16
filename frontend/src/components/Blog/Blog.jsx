import { LazyLoadImage } from "react-lazy-load-image-component"
import { Link } from "react-router-dom"
import { formatDate } from "../../utils/functions"

const Blog = ({ _id, name, image, except, createdAt }) => {
    return(
        <div className="gap-2 relative w-full h-full">

            <div className="flex flex-col items-center gap-2 rounded-lg relative border border-gray-300 shadow-lg w-full h-full">
                {/* <!-- image --> */}
                <Link to={`/blog/${_id}/`} className="flex flex-col items-center text-center group w-full">
                    <div className="w-full h-48">
                        <LazyLoadImage 
                           className="w-full h-full object-cover rounded-t-lg " src={image.url} alt={name}
                        />
                    </div>
                </Link>
                {/* <!-- image --> */}

                {/* <!-- blog description --> */}
                <div className="flex flex-col gap-2 p-4 items-start w-full">
                    <p className="text-sm text-primary-green font-medium">{formatDate(createdAt)}</p>
                    <Link to={`/blog/${_id}/`} className="flex flex-col group w-full">
                        <h2 className="text-xl font-medium group-hover:text-primary-green">{name.length > 50 ? `${name.substring(0, 50)}...` : name}</h2>
                    </Link>
                    
                    <div className="flex items-start gap-1.5 text-sm">
                        {except}
                    </div>
                 
                </div>
                {/* <!-- blog description --> */}

                
            </div>

        </div>
    )
}
export default Blog