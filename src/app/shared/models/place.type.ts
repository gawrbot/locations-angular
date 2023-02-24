export interface IPlace {
  /**
   * Identifier, used for requests
   */
  id: string;
  /**
   * Name of the place
   */
  name: string;
  /**
   * URL for an image for the place.
   */
  image_url: string | null;
  /**
   * Highest number of donation signups on a single day for current user.
   */
  best_result_self: number | null;
  /**
   * Highest number of donation signups on a single day for all users.
   */
  best_result_overall: number | null;
  /**
   * Number of visits for current user
   */
  visits_self: number;
  /**
   * Number of visits for all users
   */
  visits_overall: number;
}

export interface IPlaceListResponse {
  total: number;
  items: IPlace[];
}

export interface IPlaceListQuery {
  /**
   * When given, it filters for places where the name contains the given text
   */
  text?: string;
  /**
   * When given, it filters for places that were visited / not visited.
   */
  visited?: boolean;
}
