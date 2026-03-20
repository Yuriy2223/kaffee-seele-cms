import { Quote } from 'lucide-react';
import { Review } from './Reviews';
import { StarRating } from './StarRating';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => (
  <div className="group bg-white rounded-2xl p-6 shadow-lg relative hover:shadow-2xl hover:scale-[1.03] transition-all duration-500 ease-spring transform-style-3d">
    <Quote className="absolute top-4 right-4 text-warm-brown/10 w-8 h-8 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-125" />
    <div className="flex items-center mb-4">
      <div className="w-10 h-10 bg-warm-brown/5 rounded-full flex items-center justify-center mr-3 group-hover:bg-sage-green/10 transition-colors duration-500">
        <span className="text-warm-brown font-bold text-lg group-hover:text-sage-green">
          {review.name[0]}
        </span>
      </div>
      <div>
        <h5 className="font-semibold text-warm-brown group-hover:text-sage-green transition-colors duration-300">
          {review.name}
        </h5>
        <div className="flex items-center mt-1">
          <div className="transition-transform duration-300 group-hover:scale-105 origin-left">
            <StarRating rating={review.rating} />
          </div>
          <span className="ml-2 text-sm text-dark-text opacity-60">
            {new Date(review.date).toLocaleDateString('uk-UA', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>
    </div>
    <p className="text-dark-text leading-relaxed group-hover:text-warm-brown transition-colors duration-300">
      {review.text}
    </p>
  </div>
);
