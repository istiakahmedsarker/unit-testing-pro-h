import { Link } from 'react-router-dom';

const LatestBlog = ({ blog }) => {
  if (!blog || !blog._id || !blog.heading) {
    // Return null or handle the case when blog data is incomplete or missing
    return null;
  }

  const { _id, heading, images } = blog;

  return (
    <div className="flex gap-4">
      {images && images[0] && (
        <img
          className="w-24 h-24 rounded-md object-cover"
          src={images[0]}
          alt=""
        />
      )}
      <Link
        to={`/blogs/${_id}`}
        className="cursor-pointer hover:text-[#EB6753] duration-200 font-bold leading-6"
      >
        {heading}
      </Link>
    </div>
  );
};

export default LatestBlog;
