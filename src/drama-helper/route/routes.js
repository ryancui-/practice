import NewGame from '@/components/NewGame';
import InputInfo from '@/components/InputInfo';
import ReviewInfo from '@/components/ReviewInfo';

const routes = [{
  path: '/',
  component: NewGame
}, {
  path: '/input',
  component: InputInfo
}, {
  path: '/review',
  component: ReviewInfo
}];

export default routes;
