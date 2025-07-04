import { ApiService } from '../../../services/api.service';

export abstract class BaseRatingService extends ApiService {
   protected readonly _ratingsCacheKey: string = 'bowler-ratings';
}