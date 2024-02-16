import { render, screen } from '@testing-library/react';
import Comment from './Comment';

describe('Comment Component', () => {
    const comment = {
        authorImg: 'path/to/image.jpg',
        name: 'John Doe',
        rating: 4,
        commentMsg: 'Great comment!',
    };

    it('renders comment details correctly', () => {
        render(<Comment comment={comment} refetch={() => { }} />);

        // Check if author image is rendered
        const authorImage = screen.getByAltText('author');
        expect(authorImage).toBeInTheDocument();

        // Check if author name is rendered
        const authorName = screen.getByText('John Doe');
        expect(authorName).toBeInTheDocument();

        // Check if star rating is rendered
        const starRating = screen.getByTestId('star-rating');
        expect(starRating).toBeInTheDocument();

        // Check if comment message is rendered
        const commentMsg = screen.getByText('Great comment!');
        expect(commentMsg).toBeInTheDocument();

        // Check if LikeAndDislike component is rendered
        const likeAndDislike = screen.getByTestId('like-and-dislike');
        expect(likeAndDislike).toBeInTheDocument();
    });

    it('renders default image if author image is not provided', () => {
        const commentWithoutImage = { ...comment, authorImg: null };
        render(<Comment comment={commentWithoutImage} refetch={() => { }} />);

        const defaultImage = screen.getByAltText('author');
        expect(defaultImage).toBeInTheDocument();
    });
});
