import {useRoutes} from 'react-router-dom';
import {ProtectedRoute} from "./ProtectedRoute.tsx";
import {Home} from "../features/misc/routes/Home.tsx";
import {SignIn} from "../features/auth/routes/SignIn.tsx";
import {SignOut} from "../features/auth/routes/SignOut.tsx";
import {SignUpConfirmation} from "../features/auth/routes/SignUpConfirmation.tsx";
import {ChallengeCallback} from "../features/auth/routes/ChallengeCallback.tsx";
import MainLayout from "../components/Layout/MainLayout.tsx";
import {Features} from "../features/misc/routes/Features.tsx";
import {ForgotPassword} from "../features/account/routes/ForgotPassword.tsx";
import {ResetPassword} from "../features/account/routes/ResetPassword.tsx";
import {ResetPasswordConfirmation} from "../features/account/routes/ResetPasswordConfirmation.tsx";
import {ConfirmEmail} from "../features/account/routes/ConfirmEmail.tsx";
import {MyAccount} from "../features/account/routes/MyAccount.tsx";
import {ResendEmailConfirmation} from "../features/account/routes/ResendEmailConfirmation.tsx";
import {SignUpExternal} from "../features/auth/routes/SignUpExternal.tsx";
import {SignUp} from '../features/auth/routes/SignUp.tsx';

export const AppRoutes = () => {
    const routes = [
        {path: '/signin', element: <SignIn/>},
        {path: '/signout', element: <SignOut/>},
        
        {path: '/signup', element: <SignUp/>},
        // Uncomment the following line to enable sign up with additional fields
        // {path: '/signup', element: <SignUpExtended/>},
        
        {path: '/signup-external', element: <SignUpExternal/>},
        // Uncomment the following line to enable external sign up with additional fields
        // {path: '/signup-external', element: <SignUpExternalExtended/>},
        {
            element: <MainLayout/>,
            children: [
                {path: '/profile', element: <ProtectedRoute><MyAccount/></ProtectedRoute>},
                {path: '/', element: <Home/>},
                {path: '/features', element: <Features/>},
                {path: '/signup/confirmation', element: <SignUpConfirmation/>},
                {path: '/resend-confirm-email', element: <ResendEmailConfirmation/>},
                {path: '/external-challenge-callback/:provider', element: <ChallengeCallback/>},
                {path: '/forgot-password', element: <ForgotPassword/>},
                {path: '/reset-password', element: <ResetPassword/>},
                {path: '/reset-password/confirmation', element: <ResetPasswordConfirmation/>},
                {path: '/confirm-email', element: <ConfirmEmail/>},
            ]
        },
    ];

    const element = useRoutes([...routes]);

    return <>{element}</>;
};
