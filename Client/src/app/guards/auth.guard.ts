import { CanActivateFn } from '@angular/router';
import { BlogApiService } from '../blog-api.service';


// guards return a true/false value based on conditions
// if the return value is true it allows you to get access to certain links/activities
export const authGuard: CanActivateFn = (route, state) => {
  /*
  if(this.service.isLoggedIn()){
      return true;
    }else{
      return false;
    }
    */
   return true;
};
