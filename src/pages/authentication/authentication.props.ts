import { User, AuthenticatedUser } from '../../shared';

export interface AuthenticationProps {
  user?: AuthenticatedUser;
  isLoading: boolean;
}

export interface LoginProps extends AuthenticationProps {
  login: (user: User) => void;
}

export interface RegisterProps extends AuthenticationProps {
  register: (user: User) => void;
}
