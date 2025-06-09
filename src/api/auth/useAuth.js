import { useMutation } from '@tanstack/react-query';
import { fetchAuthLogin } from './auth';

export const useAuthLogin = () => {
    return useMutation({
        mutationFn: fetchAuthLogin,
    });
};
