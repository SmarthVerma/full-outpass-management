// App.js or App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthorizeYourAccount, Home, Login, NotFound, NotVerifiedAccount, Signup, StudentDashboard } from "@/pages";
import { useQuery } from '@apollo/client';
import { GET_AUTHENTICATED_USER } from './graphql/queries/user.query';
import { useDispatch } from 'react-redux';
import { storeAuthData } from './redux/authSlice';
import { GetAuthenticatedUserResponse } from './types and schemas/getAuthenticatedUser.query';
import { BackgroundGrid, Loading, Navbar } from './components';
import { FacultyDashboard } from "@/pages/FacultyDashboard";
import VerificationPage from './pages/VerificationPage';
import { OutpassCard } from './components/OutpassCard';

function AppRoutes() {
    const dispatch = useDispatch()
    const { data, loading } = useQuery<GetAuthenticatedUserResponse>(GET_AUTHENTICATED_USER)
    const student = data?.authUser?.isStudent
    const auth = !!data?.authUser


    useEffect(() => {
        if (data) dispatch(storeAuthData(data))
    }, [data, loading])

    if (loading) return <Loading />

    return (
        <Router>
            <BackgroundGrid >

                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={auth ? <Navigate to={'/'} /> : <Login />} />
                    <Route path="/signup" element={auth ? <Navigate to={'/'} /> : <Signup />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path='/dashboard/:hostel' element={auth ? student ? <StudentDashboard /> : <FacultyDashboard /> : <Navigate to={'/login'} />} />
                    <Route path='/verify/:token' element={<VerificationPage />} />
                    <Route path='/verify-your-account' element={<NotVerifiedAccount />} />
                    <Route path='/wait-for-admin' element={<AuthorizeYourAccount />} />

                    {/* <Route path='/pending-outpasses' element={ auth && student? <NotVerifiedAccount /> : <Navigate to={'/'} />} /> */}
                </Routes>
            </BackgroundGrid>
        </Router>
    );
}

export default AppRoutes;