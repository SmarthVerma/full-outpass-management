import 'react-router-dom';

declare module 'react-router-dom' {
  // Extending the useParams hook's types globally
  export interface RouteParams {
    hostel: string;  // Define any route parameters you want here
    token: string
  }
}